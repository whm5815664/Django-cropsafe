# -*- coding: utf-8 -*-
import argparse
import http.server
import os
import socketserver
import ssl
import subprocess
import sys
from pathlib import Path


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


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--bind", default="0.0.0.0")
    parser.add_argument("--directory", required=True)
    parser.add_argument("--cert-dir", required=True)
    args = parser.parse_args()

    cert_file, key_file = ensure_certificate(Path(args.cert_dir))

    handler = http.server.SimpleHTTPRequestHandler
    httpd = ThreadingHTTPServer((args.bind, args.port), handler)
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.load_cert_chain(certfile=str(cert_file), keyfile=str(key_file))
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

    os.chdir(args.directory)
    print(f"Serving HTTPS on https://{args.bind}:{args.port}", flush=True)
    httpd.serve_forever()


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(error, file=sys.stderr)
        sys.exit(1)
