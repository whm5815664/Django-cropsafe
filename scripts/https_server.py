# -*- coding: utf-8 -*-
import argparse
import http.server
import json
import os
import socketserver
import ssl
import subprocess
import sys
import threading
from pathlib import Path
from urllib.parse import urlparse


_REFRESH_LOCK = threading.Lock()


def write_openssl_config(cert_dir: Path):
    config_file = cert_dir / "openssl.cnf"
    if not config_file.exists():
        config_file.write_text(
            "\n".join(
                [
                    "[ req ]",
                    "distinguished_name = req_distinguished_name",
                    "[ req_distinguished_name ]",
                    "",
                ]
            ),
            encoding="utf-8",
        )
    return config_file


def ensure_certificate(cert_dir: Path):
    cert_file = cert_dir / "localhost.crt"
    key_file = cert_dir / "localhost.key"
    if cert_file.exists() and key_file.exists():
        return cert_file, key_file

    cert_dir.mkdir(parents=True, exist_ok=True)
    config_file = write_openssl_config(cert_dir)
    openssl = "openssl"
    command = [
        openssl,
        "req",
        "-x509",
        "-newkey",
        "rsa:2048",
        "-keyout",
        str(key_file),
        "-out",
        str(cert_file),
        "-days",
        "3650",
        "-nodes",
        "-subj",
        "/CN=localhost",
        "-config",
        str(config_file),
    ]

    try:
        subprocess.run(command, check=True, capture_output=True, text=True)
    except FileNotFoundError as exc:
        raise RuntimeError(
            "未找到 openssl，无法生成 HTTPS 证书。请安装 OpenSSL 或 Git for Windows。"
        ) from exc
    except subprocess.CalledProcessError as exc:
        detail = (exc.stderr or exc.stdout or "").strip()
        raise RuntimeError(f"生成 HTTPS 证书失败：{detail}") from exc

    if not cert_file.exists() or not key_file.exists():
        raise RuntimeError("HTTPS 证书生成后文件不存在。")

    return cert_file, key_file


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


def make_handler(directory: Path):
    project_dir = directory.resolve()

    class CropSafeHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(project_dir), **kwargs)

        def end_headers(self):
            path = urlparse(self.path).path
            if path == "/scripts/data.js":
                self.send_header("Cache-Control", "no-store, must-revalidate")
            super().end_headers()

        def do_POST(self):
            path = urlparse(self.path).path
            if path == "/api/refresh-data":
                self._handle_refresh_data()
                return
            self.send_error(404, "Not Found")

        def _json_response(self, status: int, payload: dict):
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)

        def _handle_refresh_data(self):
            length = int(self.headers.get("Content-Length", "0") or "0")
            if length > 0:
                self.rfile.read(length)

            if not _REFRESH_LOCK.acquire(blocking=False):
                self._json_response(
                    409,
                    {"ok": False, "error": "数据正在更新中，请稍候再试。"},
                )
                return

            try:
                data_root = Path(
                    os.environ.get("CROPSAFE_DATA_ROOT", str(project_dir / "data"))
                )
                env = os.environ.copy()
                env["CROPSAFE_DATA_ROOT"] = str(data_root)
                env["CROPSAFE_WORKSPACE"] = str(project_dir)
                env["PYTHONIOENCODING"] = "utf-8"
                env["PYTHONUTF8"] = "1"

                result = subprocess.run(
                    [sys.executable, "-m", "scripts.build_data"],
                    cwd=str(project_dir),
                    env=env,
                    capture_output=True,
                    text=True,
                    encoding="utf-8",
                    errors="replace",
                )
                output = (result.stdout or "").strip()
                detail = (result.stderr or result.stdout or "").strip()

                if result.returncode != 0:
                    self._json_response(
                        500,
                        {
                            "ok": False,
                            "error": detail or "数据更新失败。",
                        },
                    )
                    return

                self._json_response(
                    200,
                    {
                        "ok": True,
                        "message": "数据更新成功。",
                        "detail": output,
                    },
                )
            except Exception as exc:
                self._json_response(
                    500,
                    {"ok": False, "error": f"数据更新失败：{exc}"},
                )
            finally:
                _REFRESH_LOCK.release()

        def log_message(self, format, *args):
            sys.stderr.write(
                "%s - - [%s] %s\n"
                % (self.address_string(), self.log_date_time_string(), format % args)
            )

    return CropSafeHandler


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--bind", default="0.0.0.0")
    parser.add_argument("--directory", required=True)
    parser.add_argument("--cert-dir", required=True)
    args = parser.parse_args()

    project_dir = Path(args.directory).resolve()

    cert_file, key_file = ensure_certificate(Path(args.cert_dir))

    handler = make_handler(project_dir)
    httpd = ThreadingHTTPServer((args.bind, args.port), handler)
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile=str(cert_file), keyfile=str(key_file))
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

    os.chdir(project_dir)
    print(f"Serving HTTPS on https://{args.bind}:{args.port}", flush=True)
    httpd.serve_forever()


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(error, file=sys.stderr)
        sys.exit(1)
