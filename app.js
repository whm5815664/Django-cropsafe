(function () {
  const appData = window.GRAIN_APP_DATA;

  const PRODUCT_META = {
    soybean: {
      name: "大豆",
      subtitle: "油脂与蛋白进口依赖",
      accent: "#5a8f54",
      glow: "rgba(90, 143, 84, 0.20)",
      description: "聚焦南北美供给格局与进口集中度变化。",
    },
    corn: {
      name: "玉米",
      subtitle: "饲料与工业双重需求",
      accent: "#d6a332",
      glow: "rgba(214, 163, 50, 0.22)",
      description: "关注黑海、美洲与东南亚通道切换能力。",
    },
    wheat: {
      name: "小麦",
      subtitle: "口粮安全关键品种",
      accent: "#c78e57",
      glow: "rgba(199, 142, 87, 0.18)",
      description: "追踪澳洲、北美、黑海区域供给安全性。",
    },
    barley: {
      name: "大麦",
      subtitle: "啤饲兼用与进口替代",
      accent: "#7d9a59",
      glow: "rgba(125, 154, 89, 0.20)",
      description: "评估澳大利亚、欧洲与北美替代关系。",
    },
    sorghum: {
      name: "高粱",
      subtitle: "单一来源脆弱性突出",
      accent: "#a85d43",
      glow: "rgba(168, 93, 67, 0.20)",
      description: "重点识别单一链路与替代补位空间。",
    },
  };

  const COUNTRY_LABELS = {
    USA: "美国",
    "United States": "美国",
    "United States of America": "美国",
    Brazil: "巴西",
    Argentina: "阿根廷",
    Uruguay: "乌拉圭",
    Canada: "加拿大",
    Paraguay: "巴拉圭",
    Russia: "俄罗斯",
    "Russian Federation": "俄罗斯",
    Ukraine: "乌克兰",
    Australia: "澳大利亚",
    France: "法国",
    Germany: "德国",
    India: "印度",
    China: "中国",
    Myanmar: "缅甸",
    Mexico: "墨西哥",
    Nigeria: "尼日利亚",
    Ethiopia: "埃塞俄比亚",
    Sudan: "苏丹",
    Kazakhstan: "哈萨克斯坦",
    "South Africa": "南非",
    Romania: "罗马尼亚",
    Bulgaria: "保加利亚",
    Turkey: "土耳其",
    Poland: "波兰",
    Spain: "西班牙",
    Hungary: "匈牙利",
    Serbia: "塞尔维亚",
    Austria: "奥地利",
    Somalia: "索马里",
  };

  const COUNTRY_ALIASES = {
    usa: ["USA", "United States", "United States of America"],
    unitedstates: ["USA", "United States", "United States of America"],
    unitedstatesofamerica: ["USA", "United States", "United States of America"],
    russia: ["Russia", "Russian Federation"],
    russianfederation: ["Russia", "Russian Federation"],
    turkey: ["Turkey"],
    china: ["China"],
  };

  const MODULES = [
    { id: "overview", label: "总览" },
    { id: "risk", label: "风险" },
    { id: "alternative", label: "替代" },
  ];

  const state = {
    view: "landing",
    productId: Object.keys(PRODUCT_META)[0],
    module: "overview",
    selectedCountry: null,
    selectedOverviewYear: null,
    alternativeFlowMode: false,
    geoJson: null,
  };

  const palette = {
    primary: "#1f6b45",
    veryHigh: "#9f1f1f",
    high: "#d6453d",
    medium: "#f0b429",
    low: "#3f8f5c",
    tier1: "#1f6b45",
    tier2: "#5f8b65",
    tier3: "#91a062",
    nodata: "#dde6de",
    border: "rgba(31,107,69,0.22)",
  };

  const els = {
    appShell: document.getElementById("appShell"),
    landingView: document.getElementById("landingView"),
    dashboardView: document.getElementById("dashboardView"),
    cropGallery: document.getElementById("cropGallery"),
    backHome: document.getElementById("backHome"),
    dashboardTitle: document.getElementById("dashboardTitle"),
    productSwitcher: document.getElementById("productSwitcher"),
    moduleSwitcher: document.getElementById("moduleSwitcher"),
    heroMetrics: document.getElementById("heroMetrics"),
    mapKicker: document.getElementById("mapKicker"),
    mapTitle: document.getElementById("mapTitle"),
    yearSwitcher: document.getElementById("yearSwitcher"),
    mapCaption: document.getElementById("mapCaption"),
    legend: document.getElementById("legend"),
    worldMap: document.getElementById("worldMap"),
    mapTooltip: document.getElementById("mapTooltip"),
    detailTitle: document.getElementById("detailTitle"),
    detailBadge: document.getElementById("detailBadge"),
    detailHighlights: document.getElementById("detailHighlights"),
    chartStack: document.getElementById("chartStack"),
  };

  function normalizeCountryName(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z]/g, "");
  }

  function getProduct() {
    return appData.products.find((item) => item.id === state.productId);
  }

  function getProductMeta(productId) {
    return PRODUCT_META[productId] || PRODUCT_META.soybean;
  }

  function labelCountry(name) {
    return COUNTRY_LABELS[name] || name;
  }

  function getRecentOverviewYears(product) {
    return (product?.years || []).slice(-3);
  }

  function ensureOverviewYear(product) {
    const recentYears = getRecentOverviewYears(product);
    const fallbackYear = recentYears.at(-1) || product?.years?.at(-1) || null;
    const currentYear = String(state.selectedOverviewYear || "");

    if (!fallbackYear) {
      state.selectedOverviewYear = null;
      return;
    }

    state.selectedOverviewYear = recentYears.includes(currentYear) ? currentYear : String(fallbackYear);
  }

  function getOverviewYearIndex(product) {
    ensureOverviewYear(product);
    return Math.max(0, product.years.indexOf(String(state.selectedOverviewYear)));
  }

  function getSeriesValue(series, index) {
    if (!Array.isArray(series) || !series.length) return null;
    const safeIndex = Math.min(Math.max(index, 0), series.length - 1);
    return series[safeIndex];
  }

  function getAliasCandidates(name) {
    const normalized = normalizeCountryName(name);
    return [name, ...(COUNTRY_ALIASES[normalized] || [])];
  }

  function resolveCountryKey(name, availableKeys) {
    const keys = Array.isArray(availableKeys) ? availableKeys : Object.keys(availableKeys || {});
    const candidates = getAliasCandidates(name);

    for (const candidate of candidates) {
      if (keys.includes(candidate)) return candidate;
    }

    const normalizedCandidates = candidates.map(normalizeCountryName);
    return keys.find((key) => normalizedCandidates.includes(normalizeCountryName(key))) || null;
  }

  function formatMt(value) {
    return `${Number(value).toFixed(Number(value) >= 100 ? 0 : 2)} 百万吨`;
  }

  function formatPct(value) {
    return `${(value * 100).toFixed(1)}%`;
  }

  function formatChartValue(value, format) {
    const num = Number(value);
    if (Number.isNaN(num)) return "--";
    if (format === "mt") return formatMt(num);
    if (format === "area") return `${num.toFixed(2)} 万公顷`;
    if (format === "yield") return `${num.toFixed(2)} 吨/公顷`;
    if (format === "price") return `${num.toFixed(0)} 美元/吨`;
    if (format === "percent") return `${num.toFixed(1)}%`;
    if (format === "ci") return num.toFixed(4);
    return num.toFixed(2);
  }

  function formatChartAxisValue(value, format) {
    const num = Number(value);
    if (Number.isNaN(num)) return "--";
    if (format === "mt") return num >= 100 ? num.toFixed(0) : num.toFixed(1);
    if (format === "area") return num.toFixed(1);
    if (format === "yield") return num.toFixed(1);
    if (format === "price") return num.toFixed(0);
    if (format === "percent") return `${num.toFixed(1)}%`;
    if (format === "ci") return num.toFixed(2);
    return num.toFixed(1);
  }

  function ensureChartTooltip() {
    if (!document.getElementById("chartTooltip")) {
      const node = document.createElement("div");
      node.id = "chartTooltip";
      node.className = "chart-tooltip hidden";
      document.body.appendChild(node);
    }
    return document.getElementById("chartTooltip");
  }

  function hideChartTooltip() {
    ensureChartTooltip().classList.add("hidden");
    els.chartStack.querySelectorAll(".chart-point.is-active").forEach((node) => {
      node.classList.remove("is-active");
      if (node.dataset.baseR) node.setAttribute("r", node.dataset.baseR);
    });
    els.chartStack.querySelectorAll(".chart-point-halo").forEach((node) => node.setAttribute("opacity", "0"));
    els.chartStack.querySelectorAll(".chart-hover-line").forEach((line) => line.setAttribute("opacity", "0"));
  }

  function showChartTooltip(event, point) {
    const tooltip = ensureChartTooltip();
    const year = point.dataset.year;
    const label = point.dataset.label || "数值";
    const value = point.dataset.value || "--";
    const wrap = point.closest(".line-chart-wrap");
    const svg = wrap?.querySelector("svg");
    const index = point.dataset.index;

    svg?.querySelectorAll(".chart-point").forEach((node) => {
      node.classList.remove("is-active");
      if (node.dataset.baseR) node.setAttribute("r", node.dataset.baseR);
    });
    const activePoint = svg?.querySelector(`.chart-point[data-index="${index}"]`);
    activePoint?.classList.add("is-active");
    if (activePoint && !activePoint.dataset.baseR) {
      activePoint.dataset.baseR = activePoint.getAttribute("r") || "3";
    }
    activePoint?.setAttribute("r", String(Number(activePoint?.dataset.baseR || activePoint?.getAttribute("r") || 3) + 1.2));
    svg?.querySelectorAll(".chart-point-halo").forEach((node) => node.setAttribute("opacity", "0"));
    svg?.querySelector(`.chart-point-halo[data-index="${index}"]`)?.setAttribute("opacity", "0.16");

    const hoverLine = svg?.querySelector(".chart-hover-line");
    if (hoverLine) {
      hoverLine.setAttribute("x1", point.getAttribute("cx"));
      hoverLine.setAttribute("x2", point.getAttribute("cx"));
      hoverLine.setAttribute("opacity", "0.35");
    }

    tooltip.innerHTML = `
      <div class="chart-tooltip-year">${year}</div>
      <div class="chart-tooltip-row"><span>${label}</span><strong>${value}</strong></div>
    `;
    tooltip.classList.remove("hidden");

    const offsetX = 16;
    const offsetY = 16;
    const rect = tooltip.getBoundingClientRect();
    const left = Math.min(event.clientX + offsetX, window.innerWidth - rect.width - 12);
    const top = Math.min(event.clientY + offsetY, window.innerHeight - rect.height - 12);
    tooltip.style.left = `${Math.max(12, left)}px`;
    tooltip.style.top = `${Math.max(12, top)}px`;
  }

  function initChartInteractions() {
    if (els.chartStack.dataset.bound === "1") return;
    els.chartStack.dataset.bound = "1";

    els.chartStack.addEventListener("mousemove", (event) => {
      const point = event.target.closest(".chart-hit-point");
      if (point) {
        showChartTooltip(event, point);
        return;
      }
      hideChartTooltip();
    });

    els.chartStack.addEventListener("mouseleave", hideChartTooltip);
  }

  function riskMeta(level) {
    if (level === "very_high") return { label: "极高风险", color: palette.veryHigh };
    if (level === "high") return { label: "高风险", color: palette.high };
    if (level === "medium") return { label: "中风险", color: palette.medium };
    return { label: "低风险", color: palette.low };
  }

  function tierMeta(tier) {
    const map = {
      1: { label: "第一梯队", color: palette.tier1 },
      2: { label: "第二梯队", color: palette.tier2 },
      3: { label: "第三梯队", color: palette.tier3 },
    };
    return map[tier];
  }

  function cropIllustration(productId, accent) {
    if (productId === "soybean") {
      return `
        <svg viewBox="0 0 220 220" aria-hidden="true">
          <ellipse cx="72" cy="118" rx="28" ry="44" fill="#86b46f"/>
          <ellipse cx="115" cy="98" rx="30" ry="46" fill="#9fc27a"/>
          <ellipse cx="151" cy="128" rx="28" ry="42" fill="#719c59"/>
          <path d="M44 150C78 108 111 82 176 70" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
          <circle cx="68" cy="120" r="6" fill="#ecf3e7"/>
          <circle cx="113" cy="101" r="6" fill="#ecf3e7"/>
          <circle cx="148" cy="129" r="6" fill="#ecf3e7"/>
        </svg>
      `;
    }
    if (productId === "corn") {
      return `
        <svg viewBox="0 0 220 220" aria-hidden="true">
          <path d="M110 38C148 56 162 98 158 146C154 184 132 196 110 196C88 196 66 183 62 146C58 98 72 56 110 38Z" fill="#f0c142"/>
          ${Array.from({ length: 7 }).map((_, row) =>
            Array.from({ length: 4 }).map((__, col) => {
              const x = 86 + col * 16 + (row % 2 ? 8 : 0);
              const y = 68 + row * 16;
              return `<circle cx="${x}" cy="${y}" r="5.4" fill="#ffd96a"/>`;
            }).join("")
          ).join("")}
          <path d="M74 170C72 126 78 89 108 52" fill="none" stroke="#5d9d58" stroke-width="10" stroke-linecap="round"/>
          <path d="M146 170C148 126 142 89 112 52" fill="none" stroke="#6cab62" stroke-width="10" stroke-linecap="round"/>
        </svg>
      `;
    }
    if (productId === "wheat") {
      return `
        <svg viewBox="0 0 220 220" aria-hidden="true">
          <path d="M110 38V186" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
          ${[60, 82, 104, 126, 148].map((y, idx) => `
            <path d="M110 ${y}C92 ${y-8} 84 ${y-18} 80 ${y-28}" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
            <path d="M110 ${y}C128 ${y-8} 136 ${y-18} 140 ${y-28}" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
            <ellipse cx="76" cy="${y-32}" rx="10" ry="14" fill="#d4ae61" transform="rotate(-24 76 ${y-32})"/>
            <ellipse cx="144" cy="${y-32}" rx="10" ry="14" fill="#e0bc6d" transform="rotate(24 144 ${y-32})"/>
          `).join("")}
        </svg>
      `;
    }
    if (productId === "barley") {
      return `
        <svg viewBox="0 0 220 220" aria-hidden="true">
          <path d="M104 38V188" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
          <path d="M126 50V180" stroke="#708f54" stroke-width="7" stroke-linecap="round"/>
          ${[58, 80, 102, 124, 146].map((y) => `
            <path d="M104 ${y}C88 ${y-4} 78 ${y-14} 72 ${y-28}" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <path d="M126 ${y}C142 ${y-4} 152 ${y-14} 158 ${y-28}" stroke="#708f54" stroke-width="4" stroke-linecap="round"/>
            <line x1="72" y1="${y-28}" x2="64" y2="${y-42}" stroke="#c6b057" stroke-width="2"/>
            <line x1="158" y1="${y-28}" x2="166" y2="${y-42}" stroke="#c6b057" stroke-width="2"/>
            <ellipse cx="72" cy="${y-28}" rx="7" ry="12" fill="#d7c271"/>
            <ellipse cx="158" cy="${y-28}" rx="7" ry="12" fill="#d7c271"/>
          `).join("")}
        </svg>
      `;
    }
    return `
      <svg viewBox="0 0 220 220" aria-hidden="true">
        <path d="M110 40C140 40 164 60 164 88C164 108 153 124 136 134C151 142 162 156 162 176C162 198 140 214 110 214C80 214 58 198 58 176C58 156 69 142 84 134C67 124 56 108 56 88C56 60 80 40 110 40Z" fill="#8b4f43"/>
        <path d="M110 48C132 48 148 63 148 83C148 103 132 118 110 118C88 118 72 103 72 83C72 63 88 48 110 48Z" fill="#ba6b56"/>
        <path d="M96 132H124V212H96Z" fill="#d18d70"/>
        ${[78, 94, 110, 126, 142].map((x) => `<circle cx="${x}" cy="84" r="5" fill="#f3d6c4"/>`).join("")}
        ${[78, 94, 110, 126, 142].map((x) => `<circle cx="${x}" cy="100" r="5" fill="#f3d6c4"/>`).join("")}
      </svg>
    `;
  }

  function createLanding() {
    els.cropGallery.innerHTML = appData.products
      .map((product) => {
        const meta = getProductMeta(product.id);
        return `
          <article class="crop-card" data-crop="${product.id}" style="box-shadow: 0 16px 40px rgba(61, 66, 44, 0.12), 0 0 0 1px rgba(255,255,255,0.4), 0 0 0 8px ${meta.glow};">
            <div class="crop-card-top">
              <h3>${meta.name}</h3>
            </div>
            <div class="crop-figure">${cropIllustration(product.id, meta.accent)}</div>
          </article>
        `;
      })
      .join("");

    els.cropGallery.querySelectorAll("[data-crop]").forEach((card) => {
      card.addEventListener("click", () => {
        state.productId = card.dataset.crop;
        state.module = "overview";
        state.selectedCountry = null;
        state.view = "dashboard";
        updateView();
        render();
      });
    });
  }

  function updateView() {
    els.landingView.classList.toggle("hidden", state.view !== "landing");
    els.dashboardView.classList.toggle("hidden", state.view !== "dashboard");
  }

  function createTopbar(product) {
    const meta = getProductMeta(product.id);
    els.dashboardTitle.textContent = `${meta.name}国际供给总览`;

    els.productSwitcher.innerHTML = appData.products
      .map((item) => {
        const itemMeta = getProductMeta(item.id);
        return `<button class="switch-btn ${item.id === state.productId ? "active" : ""}" data-product="${item.id}">${itemMeta.name}</button>`;
      })
      .join("");

    els.moduleSwitcher.innerHTML = MODULES
      .map((item) => `<button class="switch-btn ${item.id === state.module ? "active" : ""}" data-module="${item.id}">${item.label}</button>`)
      .join("");

    els.productSwitcher.querySelectorAll("[data-product]").forEach((button) => {
      button.addEventListener("click", () => {
        state.productId = button.dataset.product;
        state.selectedCountry = null;
        state.selectedOverviewYear = null;
        state.alternativeFlowMode = false;
        render();
      });
    });

    els.moduleSwitcher.querySelectorAll("[data-module]").forEach((button) => {
      button.addEventListener("click", () => {
        state.module = button.dataset.module;
        state.selectedCountry = null;
        state.alternativeFlowMode = false;
        render();
      });
    });
  }

  function getOverviewCountries(product) {
    const yearIndex = getOverviewYearIndex(product);
    return Object.entries(product.imports)
      .sort((a, b) => Number(getSeriesValue(b[1].volume, yearIndex) || 0) - Number(getSeriesValue(a[1].volume, yearIndex) || 0))
      .slice(0, 5)
      .map(([country]) => country);
  }

  function getRiskCountries(product) {
    return Object.entries(product.risk)
      .sort((a, b) => b[1].score - a[1].score)
      .map(([country]) => country);
  }

  function getAlternativeCountries(product) {
    return (product.alternatives.shortTerm || []).slice(0, 8);
  }

  function getSelectedCountry(product) {
    if (state.module === "overview") {
      const overviewCountries = getOverviewCountries(product);
      if (state.selectedCountry && overviewCountries.includes(state.selectedCountry)) return state.selectedCountry;
      return overviewCountries[0] || null;
    }
    if (state.selectedCountry) return state.selectedCountry;
    if (state.module === "risk") return getRiskCountries(product)[0];
    return getAlternativeCountries(product)[0]?.country || null;
  }

  function renderLegend(items) {
    els.legend.innerHTML = items
      .map(
        (item) => `
          <div class="legend-item">
            <span class="legend-dot" style="background:${item.color}"></span>
            <span>${item.label}</span>
          </div>
        `,
      )
      .join("");
  }

  function renderYearSwitcher(product) {
    if (state.module !== "overview") {
      els.yearSwitcher.innerHTML = "";
      els.yearSwitcher.classList.add("hidden");
      return;
    }

    const years = getRecentOverviewYears(product);
    ensureOverviewYear(product);
    els.yearSwitcher.classList.remove("hidden");
    els.yearSwitcher.innerHTML = years
      .map(
        (year) => `
          <button class="year-btn ${String(year) === String(state.selectedOverviewYear) ? "active" : ""}" type="button" data-year="${year}">
            ${year}年
          </button>
        `,
      )
      .join("");

    els.yearSwitcher.querySelectorAll("[data-year]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedOverviewYear = button.dataset.year;
        state.selectedCountry = null;
        render();
      });
    });
  }

  function buildHeroMetrics(product) {
    const cards = [
      {
        label: "最新前十主产国产量",
        value: formatMt(product.overview.latestProduction),
        note: "主产国汇总结果的最新年度合计值。",
      },
      {
        label: "中国进口总量",
        value: formatMt(product.overview.chinaImportTotal),
        note: "进口来源分析结果的最新年度汇总。",
      },
      {
        label: "第一来源集中度",
        value: formatPct(product.overview.importConcentration),
        note: `当前第一来源国：${labelCountry(product.overview.topSupplier)}`,
      },
      {
        label: "当前风险提示",
        value: product.overview.riskHeadline,
        note: "来自实验室 CI 风险分级结果。",
      },
    ];

    els.heroMetrics.innerHTML = cards
      .map(
        (card) => `
          <article class="metric-card">
            <div class="metric-label">${card.label}</div>
            <div class="metric-value">${card.value}</div>
            <div class="metric-note">${card.note}</div>
          </article>
        `,
      )
      .join("");
  }

  function buildHeroMetrics(product) {
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || product.years.at(yearIndex));
    const importEntries = Object.entries(product.imports || {});
    const producerEntries = Object.entries(product.producers || {});
    const chinaImportTotal = importEntries.reduce((sum, [, info]) => sum + Number(getSeriesValue(info.volume, yearIndex) || 0), 0);
    const sortedImports = [...importEntries].sort(
      (a, b) => Number(getSeriesValue(b[1].volume, yearIndex) || 0) - Number(getSeriesValue(a[1].volume, yearIndex) || 0),
    );
    const topSupplier = sortedImports[0]?.[0] || product.overview.topSupplier;
    const topSupplierVolume = Number(getSeriesValue(sortedImports[0]?.[1]?.volume, yearIndex) || 0);
    const importConcentration = chinaImportTotal ? topSupplierVolume / chinaImportTotal : 0;
    const totalProduction = producerEntries.reduce((sum, [, info]) => sum + Number(getSeriesValue(info.output, yearIndex) || 0), 0);

    const cards = [
      {
        label: `${selectedYear}主产国产量`,
        value: formatMt(totalProduction),
        note: "按当前选中年份汇总主要生产国的产量。",
      },
      {
        label: `${selectedYear}中国进口总量`,
        value: formatMt(chinaImportTotal),
        note: "按当前选中年份统计中国进口来源总量。",
      },
      {
        label: `${selectedYear}第一来源集中度`,
        value: formatPct(importConcentration),
        note: `当前第一来源国：${labelCountry(topSupplier)}`,
      },
      {
        label: "当前风险提示",
        value: product.overview.riskHeadline,
        note: "保持使用实验室当前的综合风险结论。",
      },
    ];

    els.heroMetrics.innerHTML = cards
      .map(
        (card) => `
          <article class="metric-card">
            <div class="metric-label">${card.label}</div>
            <div class="metric-value">${card.value}</div>
            <div class="metric-note">${card.note}</div>
          </article>
        `,
      )
      .join("");
  }

  function getModuleCountryStyles(product) {
    const styleMap = {};
    let legend = [];
    let title = "";
    let kicker = "";
    let caption = "";

    if (state.module === "overview") {
      getOverviewCountries(product).forEach((country, index) => {
        const colors = ["#1f6b45", "#2f7b53", "#4d986a", "#76ac84", "#a0c1a3"];
        styleMap[country] = { fill: colors[index] };
      });
      legend = [
        { label: "中国前五大进口来源国", color: palette.primary },
        { label: "其他国家", color: palette.nodata },
      ];
      title = `${getProductMeta(product.id).name}进口来源高亮图`;
      kicker = "自动高亮";
      caption = "点击高亮国家后，右侧会展示该国生产数据、中国自该国的进口量及价格走势，以及中国对该国进口依赖度近十年变化。";
    } else if (state.module === "risk") {
      Object.entries(product.risk).forEach(([country, info]) => {
        styleMap[country] = { fill: riskMeta(info.level).color };
      });
      legend = [
        { label: "极高风险", color: palette.veryHigh },
        { label: "高风险", color: palette.high },
        { label: "中风险", color: palette.medium },
        { label: "低风险", color: palette.low },
      ];
      title = `${getProductMeta(product.id).name}CI 风险地图`;
      kicker = "风险视图";
      caption = "展示 2022-2024 年 CI 风险分级结果，可快速识别高风险供应节点。";
    } else {
      getAlternativeCountries(product).forEach((item) => {
        styleMap[item.country] = { fill: tierMeta(item.tier).color };
      });
      legend = [
        { label: "第一梯队", color: palette.tier1 },
        { label: "第二梯队", color: palette.tier2 },
        { label: "第三梯队", color: palette.tier3 },
      ];
      title = `${getProductMeta(product.id).name}替代产能布局`;
      kicker = "替代视图";
      caption = "展示短期替代潜能较高的国家分布，并联动查看长期替代空间。";
    }

    return { styleMap, legend, title, kicker, caption };
  }

  function getModuleCountryStyles(product) {
    const styleMap = {};
    let legend = [];
    let title = "";
    let kicker = "";
    let caption = "";

    if (state.module === "overview") {
      const selectedYear = String(state.selectedOverviewYear || product.years.at(getOverviewYearIndex(product)));
      getOverviewCountries(product).forEach((country, index) => {
        const colors = ["#1f6b45", "#2f7b53", "#4d986a", "#76ac84", "#a0c1a3"];
        styleMap[country] = { fill: colors[index] };
      });
      legend = [
        { label: `${selectedYear}年中国前五大进口来源国`, color: palette.primary },
        { label: "其他国家", color: palette.nodata },
      ];
      title = `${selectedYear}年${getProductMeta(product.id).name}进口来源高亮地图`;
      kicker = "最近三年切换";
      caption = `点击高亮国家后，右侧会展示该国生产数据、中国自该国进口量与价格走势，以及中国对该国进口依赖度变化。当前查看：${selectedYear} 年。`;
    } else if (state.module === "risk") {
      Object.entries(product.risk).forEach(([country, info]) => {
        styleMap[country] = { fill: riskMeta(info.level).color };
      });
      legend = [
        { label: "极高风险", color: palette.veryHigh },
        { label: "高风险", color: palette.high },
        { label: "中风险", color: palette.medium },
        { label: "低风险", color: palette.low },
      ];
      title = `${getProductMeta(product.id).name}CI 风险地图`;
      kicker = "风险视图";
      caption = "展示 2022-2024 年 CI 风险分级结果，可快速识别高风险供应节点。";
    } else {
      getAlternativeCountries(product).forEach((item) => {
        styleMap[item.country] = { fill: tierMeta(item.tier).color };
      });
      legend = [
        { label: "第一梯队", color: palette.tier1 },
        { label: "第二梯队", color: palette.tier2 },
        { label: "第三梯队", color: palette.tier3 },
      ];
      title = `${getProductMeta(product.id).name}替代产能布局`;
      kicker = "替代视图";
      caption = "展示短期替代潜能较高的国家分布，并联动查看长期替代空间。";
    }

    return { styleMap, legend, title, kicker, caption };
  }

  function projectPoint(lon, lat) {
    const x = ((lon + 180) / 360) * 1000;
    const y = ((90 - lat) / 180) * 520;
    return [x, y];
  }

  function ringToPath(ring) {
    return (
      ring
        .map((point, index) => {
          const [x, y] = projectPoint(point[0], point[1]);
          return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(" ") + " Z"
    );
  }

  function geometryToPath(geometry) {
    if (!geometry) return "";
    if (geometry.type === "Polygon") return geometry.coordinates.map(ringToPath).join(" ");
    if (geometry.type === "MultiPolygon") return geometry.coordinates.map((polygon) => polygon.map(ringToPath).join(" ")).join(" ");
    return "";
  }

  function getTooltipRows(product, mapCountryName) {
    const importsKey = resolveCountryKey(mapCountryName, product.imports);
    const producersKey = resolveCountryKey(mapCountryName, product.producers);
    const riskKey = resolveCountryKey(mapCountryName, product.risk);
    const shortKey = resolveCountryKey(mapCountryName, (product.alternatives.shortTerm || []).map((item) => item.country));
    const longKey = resolveCountryKey(mapCountryName, (product.alternatives.longTerm || []).map((item) => item.country));

    const rows = [];
    let meta = "暂无监测数据";
    if (state.module === "overview") {
      const importInfo = importsKey ? product.imports[importsKey] : null;
      const producerInfo = producersKey ? product.producers[producersKey] : null;
      if (importInfo) {
        meta = "进口来源国";
        rows.push(["最新进口量", formatMt(importInfo.volume.at(-1))]);
        rows.push(["贸易价格", `${importInfo.price.at(-1)} 美元/吨`]);
        rows.push(["进口集中度", formatPct(importInfo.dependency.at(-1))]);
      }
      if (producerInfo) rows.push(["最新产量", formatMt(producerInfo.output.at(-1))]);
    } else if (state.module === "risk") {
      const risk = riskKey ? product.risk[riskKey] : null;
      if (risk) {
        meta = riskMeta(risk.level).label;
        rows.push(["CI 2022", risk.ci2022.toFixed(4)]);
        rows.push(["CI 2023", risk.ci2023.toFixed(4)]);
        rows.push(["CI 2024", risk.ci2024.toFixed(4)]);
      }
    } else {
      const shortItem = (product.alternatives.shortTerm || []).find((item) => item.country === shortKey);
      const longItem = (product.alternatives.longTerm || []).find((item) => item.country === longKey);
      if (shortItem) {
        meta = tierMeta(shortItem.tier).label;
        rows.push(["短期潜能", shortItem.potential.toFixed(4)]);
      }
      if (longItem) rows.push(["长期潜能", longItem.potential.toFixed(4)]);
    }
    return {
      title: labelCountry(importsKey || producersKey || riskKey || shortKey || longKey || mapCountryName),
      meta,
      rows: rows.length ? rows : [["状态", "当前模块无可展示数据"]],
    };
  }

  function setTooltipPosition(event) {
    const box = els.worldMap.getBoundingClientRect();
    const offsetX = event.clientX - box.left + 18;
    const offsetY = event.clientY - box.top + 18;
    els.mapTooltip.style.left = `${Math.min(offsetX, box.width - 280)}px`;
    els.mapTooltip.style.top = `${Math.min(offsetY, box.height - 160)}px`;
  }

  function getTooltipRows(product, mapCountryName) {
    const importsKey = resolveCountryKey(mapCountryName, product.imports);
    const producersKey = resolveCountryKey(mapCountryName, product.producers);
    const riskKey = resolveCountryKey(mapCountryName, product.risk);
    const shortKey = resolveCountryKey(mapCountryName, (product.alternatives.shortTerm || []).map((item) => item.country));
    const longKey = resolveCountryKey(mapCountryName, (product.alternatives.longTerm || []).map((item) => item.country));

    const rows = [];
    let meta = "暂无监测数据";

    if (state.module === "overview") {
      const yearIndex = getOverviewYearIndex(product);
      const selectedYear = String(state.selectedOverviewYear || product.years.at(yearIndex));
      const importInfo = importsKey ? product.imports[importsKey] : null;
      const producerInfo = producersKey ? product.producers[producersKey] : null;

      if (importInfo) {
        meta = `${selectedYear}年进口来源国`;
        rows.push([`${selectedYear}进口量`, formatMt(getSeriesValue(importInfo.volume, yearIndex) || 0)]);
        rows.push([`${selectedYear}价格`, `${getSeriesValue(importInfo.price, yearIndex) || "--"} 美元/吨`]);
        rows.push([`${selectedYear}依赖度`, formatPct(getSeriesValue(importInfo.dependency, yearIndex) || 0)]);
      }
      if (producerInfo) rows.push([`${selectedYear}产量`, formatMt(getSeriesValue(producerInfo.output, yearIndex) || 0)]);
    } else if (state.module === "risk") {
      const risk = riskKey ? product.risk[riskKey] : null;
      if (risk) {
        meta = riskMeta(risk.level).label;
        rows.push(["CI 2022", risk.ci2022.toFixed(4)]);
        rows.push(["CI 2023", risk.ci2023.toFixed(4)]);
        rows.push(["CI 2024", risk.ci2024.toFixed(4)]);
      }
    } else {
      const shortItem = (product.alternatives.shortTerm || []).find((item) => item.country === shortKey);
      const longItem = (product.alternatives.longTerm || []).find((item) => item.country === longKey);
      if (shortItem) {
        meta = tierMeta(shortItem.tier).label;
        rows.push(["短期潜能", shortItem.potential.toFixed(4)]);
      }
      if (longItem) rows.push(["长期潜能", longItem.potential.toFixed(4)]);
    }

    return {
      title: labelCountry(importsKey || producersKey || riskKey || shortKey || longKey || mapCountryName),
      meta,
      rows: rows.length ? rows : [["状态", "当前模块无可展示数据"]],
    };
  }

  function showTooltip(event, product, mapCountryName) {
    const { title, meta, rows } = getTooltipRows(product, mapCountryName);
    els.mapTooltip.innerHTML = `
      <div class="tooltip-title">${title}</div>
      <div class="tooltip-meta">${meta}</div>
      ${rows
        .map(
          ([key, value]) => `
            <div class="tooltip-row">
              <span>${key}</span>
              <strong>${value}</strong>
            </div>
          `,
        )
        .join("")}
    `;
    els.mapTooltip.classList.remove("hidden");
    setTooltipPosition(event);
  }

  function hideTooltip() {
    els.mapTooltip.classList.add("hidden");
  }

  function drawMap(product) {
    const { styleMap, legend, title, kicker, caption } = getModuleCountryStyles(product);
    renderYearSwitcher(product);
    renderLegend(legend);
    els.mapKicker.textContent = kicker;
    els.mapTitle.textContent = title;
    els.mapCaption.textContent = caption;
    els.worldMap.innerHTML = "";

    if (!state.geoJson) {
      els.worldMap.innerHTML = '<text x="500" y="260" text-anchor="middle" fill="#627061" font-size="18">地图数据加载中...</text>';
      return;
    }

    state.selectedCountry = getSelectedCountry(product);

    state.geoJson.features.forEach((feature) => {
      const mapName = feature.properties?.name;
      const matchedKey = resolveCountryKey(mapName, Object.keys(styleMap));
      const pathData = geometryToPath(feature.geometry);
      if (!pathData) return;

      const node = document.createElementNS("http://www.w3.org/2000/svg", "path");
      node.setAttribute("d", pathData);
      node.setAttribute("fill", matchedKey ? styleMap[matchedKey].fill : palette.nodata);
      node.setAttribute("stroke", palette.border);
      node.setAttribute("stroke-width", "0.8");
      node.setAttribute("class", "country-shape");
      node.setAttribute("data-country", matchedKey || mapName);
      node.setAttribute("opacity", matchedKey ? "0.96" : "0.72");

      if (matchedKey && normalizeCountryName(matchedKey) === normalizeCountryName(state.selectedCountry)) {
        node.classList.add("is-active");
      }

      node.addEventListener("mouseenter", (event) => showTooltip(event, product, mapName));
      node.addEventListener("mousemove", setTooltipPosition);
      node.addEventListener("mouseleave", hideTooltip);
      node.addEventListener("click", () => {
        const next = resolveCountryKey(mapName, [
          ...Object.keys(product.imports),
          ...Object.keys(product.producers),
          ...Object.keys(product.risk),
          ...(product.alternatives.shortTerm || []).map((item) => item.country),
          ...(product.alternatives.longTerm || []).map((item) => item.country),
        ]);
        if (next) {
          state.selectedCountry = next;
          render();
        }
      });

      els.worldMap.appendChild(node);
    });
  }

  let chartInstanceId = 0;

  function colorWithAlpha(hex, alpha) {
    const normalized = String(hex || "#1f6b45").replace("#", "");
    if (normalized.length !== 6) return `rgba(31, 107, 69, ${alpha})`;
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function buildSmoothLinePath(points) {
    if (!points.length) return "";
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
    if (points.length === 2) {
      return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
    }

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let index = 0; index < points.length - 1; index += 1) {
      const previous = points[index - 1] || points[index];
      const current = points[index];
      const next = points[index + 1];
      const after = points[index + 2] || next;
      const cp1x = current.x + (next.x - previous.x) / 6;
      const cp1y = current.y + (next.y - previous.y) / 6;
      const cp2x = next.x - (after.x - current.x) / 6;
      const cp2y = next.y - (after.y - current.y) / 6;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    return path;
  }

  function estimateLabelWidth(text, fontSize) {
    return String(text).length * fontSize * 0.58;
  }

  function niceAxisStep(rawStep, format) {
    if (!Number.isFinite(rawStep) || rawStep <= 0) return 1;
    const exponent = Math.floor(Math.log10(rawStep));
    const fraction = rawStep / 10 ** exponent;
    let niceFraction = 10;
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 2.5) niceFraction = 2.5;
    else if (fraction <= 5) niceFraction = 5;

    let step = niceFraction * 10 ** exponent;
    if (format === "percent" && step < 1) step = 1;
    if ((format === "price" || format === "mt") && step < 1) step = 1;
    if (format === "ci" && step < 0.001) step = 0.001;
    return step;
  }

  function buildChartYAxis(values, format) {
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);
    let range = dataMax - dataMin;
    if (range === 0) {
      range = Math.abs(dataMax) * 0.12 || (format === "percent" ? 10 : format === "ci" ? 0.02 : 1);
    }

    const zeroFloorFormats = new Set(["mt", "percent", "price", "area", "yield"]);
    const useZeroFloor = dataMin >= 0 && zeroFloorFormats.has(format);
    const lower = useZeroFloor ? Math.max(0, dataMin - range * 0.03) : dataMin - range * 0.05;
    const upper = dataMax + range * 0.06;
    const span = upper - lower;
    const candidates = [];

    for (let tickCount = 5; tickCount >= 3; tickCount -= 1) {
      const step = niceAxisStep(span / (tickCount - 1), format);
      let axisMin = Math.floor(lower / step) * step;
      let axisMax = Math.ceil(upper / step) * step;
      const precision = step < 1 ? Math.min(6, Math.ceil(-Math.log10(step)) + 1) : step < 10 ? 1 : 0;
      const round = (value) => Number(value.toFixed(precision));

      axisMin = round(axisMin);
      axisMax = round(axisMax);
      const ticks = [];
      for (let value = axisMin; value <= axisMax + step * 0.0001; value += step) {
        ticks.push(round(value));
        if (ticks.length > 6) break;
      }

      if (ticks.length >= 3 && ticks.length <= 5) {
        const wasteTop = Math.max(0, axisMax - dataMax);
        const wasteBottom = Math.max(0, dataMin - axisMin);
        candidates.push({
          min: ticks[0],
          max: ticks[ticks.length - 1],
          ticks,
          score: wasteTop + wasteBottom,
        });
      }
    }

    if (candidates.length) {
      candidates.sort((left, right) => left.score - right.score || right.ticks.length - left.ticks.length);
      return candidates[0];
    }

    const mid = (dataMin + dataMax) / 2;
    const half = range * 0.55 || 1;
    return {
      min: mid - half,
      max: mid + half,
      ticks: [mid - half, mid, mid + half],
      score: 0,
    };
  }

  function computeChartPadding({ compact, rotateXLabels, showAllYears, yAxis, format, xFontSize, yFontSize }) {
    const yLabelTexts = yAxis.ticks.map((tick) => formatChartAxisValue(tick, format));
    const maxYLabelWidth = Math.max(...yLabelTexts.map((text) => estimateLabelWidth(text, yFontSize)), 0);
    const left = Math.ceil(maxYLabelWidth + (compact ? 8 : 10));
    const top = compact ? 8 : 14;

    let bottom;
    if (rotateXLabels) {
      const anchorOffset = 3;
      const labelDepth = Math.ceil(estimateLabelWidth("2024", xFontSize) * Math.SQRT1_2) + 2;
      bottom = anchorOffset + labelDepth + 2;
    } else if (showAllYears) {
      bottom = compact ? 13 : 15;
    } else {
      bottom = compact ? 11 : 13;
    }

    return {
      top,
      right: compact ? 8 : 10,
      bottom,
      left,
      xAnchorOffset: rotateXLabels ? 3 : 0,
    };
  }

  function buildAreaPath(points, baselineY) {
    const linePath = buildSmoothLinePath(points);
    if (!linePath || points.length < 2) return "";
    const last = points[points.length - 1];
    const first = points[0];
    return `${linePath} L ${last.x} ${baselineY} L ${first.x} ${baselineY} Z`;
  }

  function makeLineChart(values, years, color, options = {}) {
    const compact = options.compact === true;
    const showAllYears = options.showAllYears === true;
    const rotateXLabels = showAllYears && years.length > 10;
    const width = options.width || (compact ? 280 : 320);
    const format = options.format || "raw";
    const label = options.label || "数值";
    const strokeWidth = compact ? 2 : 2.8;
    const dotRadius = compact ? 2.4 : 3.4;
    const hitRadius = compact ? 8 : 11;
    const yFontSize = compact ? 7 : 9;
    const xFontSize = compact ? 7 : 9.5;
    const yAxis = buildChartYAxis(values, format);
    const padding = computeChartPadding({
      compact,
      rotateXLabels,
      showAllYears,
      yAxis,
      format,
      xFontSize,
      yFontSize,
    });
    const plotHeight = compact ? (rotateXLabels ? 84 : 68) : 82;
    const height = options.height || padding.top + plotHeight + padding.bottom;
    const axisMin = yAxis.min;
    const axisMax = yAxis.max;
    const axisRange = axisMax - axisMin || 1;
    const innerWidth = width - padding.left - padding.right;
    const innerHeight = height - padding.top - padding.bottom;
    const stepX = innerWidth / Math.max(1, years.length - 1);
    const plotBottom = padding.top + innerHeight;

    const pointData = values.map((value, index) => {
      const x = padding.left + stepX * index;
      const y = plotBottom - ((value - axisMin) / axisRange) * innerHeight;
      return {
        x,
        y,
        value,
        year: years[index],
        formatted: formatChartValue(value, format),
      };
    });

    const linePath = buildSmoothLinePath(pointData);
    const areaPath = pointData.length >= 2 ? buildAreaPath(pointData, plotBottom) : "";
    const chartId = `chart-${++chartInstanceId}`;
    const densePoints = years.length > 12;
    const showPointMarkers = !densePoints || years.length <= 6;

    const visibleDots = showPointMarkers
      ? pointData
          .map(
            (point, index) =>
              `<circle class="chart-point" data-index="${index}" cx="${point.x}" cy="${point.y}" r="${dotRadius}" fill="${color}" stroke="#fff" stroke-width="${compact ? 1.2 : 1.5}"></circle>`,
          )
          .join("")
      : pointData
          .map(
            (point, index) =>
              `<circle class="chart-point chart-point--hover-only" data-index="${index}" cx="${point.x}" cy="${point.y}" r="${dotRadius}" fill="${color}" stroke="#fff" stroke-width="1.2"></circle>`,
          )
          .join("");

    const pointHalos = pointData
      .map(
        (point, index) =>
          `<circle class="chart-point-halo" data-index="${index}" cx="${point.x}" cy="${point.y}" r="${dotRadius + 5}" fill="${color}" opacity="0"></circle>`,
      )
      .join("");

    const hitDots = pointData
      .map(
        (point, index) =>
          `<circle class="chart-hit-point" data-index="${index}" data-year="${point.year}" data-label="${label}" data-value="${point.formatted}" cx="${point.x}" cy="${point.y}" r="${hitRadius}" fill="transparent"></circle>`,
      )
      .join("");

    const labels = showAllYears
      ? years
          .map((year, index) => {
            const x = padding.left + stepX * index;
            const yearLabel = String(year);
            if (rotateXLabels) {
              const labelY = plotBottom + padding.xAnchorOffset;
              return `<text class="chart-axis-label chart-axis-label--x" x="${x}" y="${labelY}" text-anchor="end" font-size="${xFontSize}" fill="#7a8778" transform="rotate(-45 ${x} ${labelY})">${yearLabel}</text>`;
            }
            let anchor = "middle";
            if (index === 0) anchor = "start";
            else if (index === years.length - 1) anchor = "end";
            return `<text class="chart-axis-label" x="${x}" y="${plotBottom + padding.bottom - 4}" text-anchor="${anchor}" font-size="${xFontSize}" fill="#7a8778">${yearLabel}</text>`;
          })
          .join("")
      : years
          .filter((_, index) => index === 0 || index === years.length - 1 || index === Math.floor(years.length / 2))
          .map((year) => {
            const index = years.indexOf(year);
            const x = padding.left + stepX * index;
            return `<text class="chart-axis-label" x="${x}" y="${height - 6}" text-anchor="middle" font-size="${xFontSize}" fill="#7a8778">${String(year).slice(2)}</text>`;
          })
          .join("");

    const guides = yAxis.ticks
      .map((tick) => {
        const y = plotBottom - ((tick - axisMin) / axisRange) * innerHeight;
        return `<line class="chart-grid-line" x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}"></line>`;
      })
      .join("");

    const yLabelX = padding.left - 4;
    const yLabels = yAxis.ticks
      .map((tick) => {
        const y = plotBottom - ((tick - axisMin) / axisRange) * innerHeight;
        const dy = tick === axisMax ? 4 : tick === axisMin ? -4 : 3;
        return `<text class="chart-axis-label" x="${yLabelX}" y="${y + dy}" text-anchor="end" font-size="${yFontSize}" fill="#8a9688">${formatChartAxisValue(tick, format)}</text>`;
      })
      .join("");

    const wrapClass = [
      "line-chart-wrap",
      compact ? "line-chart-wrap--compact" : "",
      densePoints ? "line-chart-wrap--dense" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return `
      <div class="${wrapClass}">
        <svg class="chart-svg${compact ? " chart-svg--compact" : ""}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet" overflow="visible" aria-hidden="true">
          <defs>
            <linearGradient id="${chartId}-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${color}" stop-opacity="0.22"></stop>
              <stop offset="100%" stop-color="${color}" stop-opacity="0.02"></stop>
            </linearGradient>
            <linearGradient id="${chartId}-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="${colorWithAlpha(color, 0.72)}"></stop>
              <stop offset="100%" stop-color="${color}"></stop>
            </linearGradient>
          </defs>
          <rect class="chart-plot-bg" x="${padding.left}" y="${padding.top}" width="${innerWidth}" height="${innerHeight}" rx="${compact ? 8 : 10}"></rect>
          ${guides}
          <line class="chart-axis-line" x1="${padding.left}" y1="${plotBottom}" x2="${width - padding.right}" y2="${plotBottom}"></line>
          ${yLabels}
          ${areaPath ? `<path class="chart-area" d="${areaPath}" fill="url(#${chartId}-area)"></path>` : ""}
          <line class="chart-hover-line" x1="0" y1="${padding.top}" x2="0" y2="${plotBottom}" stroke="${color}" stroke-width="1.2" stroke-dasharray="4 4" opacity="0"></line>
          <path class="chart-line" d="${linePath}" fill="none" stroke="url(#${chartId}-line)" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"></path>
          ${pointHalos}
          ${visibleDots}
          ${hitDots}
          ${labels}
        </svg>
      </div>
    `;
  }

  function renderOverviewSide(product, country) {
    const producerKey = resolveCountryKey(country, product.producers);
    const importKey = resolveCountryKey(country, product.imports);
    const producer = producerKey ? product.producers[producerKey] : null;
    const importer = importKey ? product.imports[importKey] : null;
    const years = product.years;
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || years.at(yearIndex));

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = `${selectedYear}年来源国画像`;
    els.detailBadge.style.background = "rgba(31,107,69,0.1)";

    els.detailHighlights.innerHTML = `
      <article class="detail-chip">
        <div class="detail-chip-label">${selectedYear}产量</div>
        <div class="detail-chip-value">${producer ? formatMt(getSeriesValue(producer.output, yearIndex) || 0) : "--"}</div>
      </article>
      <article class="detail-chip">
        <div class="detail-chip-label">${selectedYear}进口量</div>
        <div class="detail-chip-value">${importer ? formatMt(getSeriesValue(importer.volume, yearIndex) || 0) : "--"}</div>
      </article>
      <article class="detail-chip">
        <div class="detail-chip-label">${selectedYear}价格</div>
        <div class="detail-chip-value">${importer ? `${getSeriesValue(importer.price, yearIndex) || "--"} 美元/吨` : "--"}</div>
      </article>
      <article class="detail-chip">
        <div class="detail-chip-label">${selectedYear}依赖度</div>
        <div class="detail-chip-value">${importer ? formatPct(getSeriesValue(importer.dependency, yearIndex) || 0) : "--"}</div>
      </article>
    `;

    els.chartStack.innerHTML = `
      <article class="chart-card">
        <h4>该国生产数据</h4>
        <div class="chart-subgrid">
          <div class="mini-chart">
            <div class="mini-chart-title">产量</div>
            ${producer ? makeLineChart(producer.output, years, "#1f6b45", { format: "mt", label: "产量" }) : '<div class="chart-caption">暂无数据</div>'}
          </div>
          <div class="mini-chart">
            <div class="mini-chart-title">面积</div>
            ${producer ? makeLineChart(producer.area, years, "#4f8e60", { format: "area", label: "面积" }) : '<div class="chart-caption">暂无数据</div>'}
          </div>
          <div class="mini-chart">
            <div class="mini-chart-title">单产</div>
            ${producer ? makeLineChart(producer.yield, years, "#d2a543", { format: "yield", label: "单产" }) : '<div class="chart-caption">暂无数据</div>'}
          </div>
        </div>
      </article>
      <article class="chart-card chart-card--trend">
        <h4>中国自该国进口量走势</h4>
        <div class="single-chart single-chart--compact">
          ${importer ? makeLineChart(importer.volume, years, "#1f6b45", { compact: true, showAllYears: true, format: "mt", label: "进口量" }) : '<div class="chart-caption">暂无数据</div>'}
        </div>
      </article>
      <article class="chart-card chart-card--trend">
        <h4>中国自该国进口价格走势</h4>
        <div class="single-chart single-chart--compact">
          ${importer ? makeLineChart(importer.price, years, "#d2a543", { compact: true, showAllYears: true, format: "price", label: "价格" }) : '<div class="chart-caption">暂无数据</div>'}
        </div>
      </article>
      <article class="chart-card chart-card--trend">
        <h4>中国对该国进口依赖度变化</h4>
        <div class="single-chart single-chart--compact">
          ${importer ? makeLineChart(importer.dependency.map((v) => v * 100), years, "#b93e34", { compact: true, showAllYears: true, format: "percent", label: "依赖度" }) : '<div class="chart-caption">暂无数据</div>'}
        </div>
      </article>
    `;
  }

  function renderRiskSide(product, country) {
    const riskKey = resolveCountryKey(country, product.risk);
    const risk = riskKey ? product.risk[riskKey] : null;

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = risk ? riskMeta(risk.level).label : "无数据";
    els.detailBadge.style.background = risk ? `${riskMeta(risk.level).color}22` : "rgba(0,0,0,0.06)";

    els.detailHighlights.innerHTML = risk
      ? `
        <article class="detail-chip"><div class="detail-chip-label">CI 2022</div><div class="detail-chip-value">${risk.ci2022.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">CI 2023</div><div class="detail-chip-value">${risk.ci2023.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">CI 2024</div><div class="detail-chip-value">${risk.ci2024.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">三年均值</div><div class="detail-chip-value">${risk.score.toFixed(4)}</div></article>
      `
      : "";

    els.chartStack.innerHTML = risk
      ? `
        <article class="chart-card chart-card--trend">
          <h4>CI 三年变化</h4>
          <div class="single-chart single-chart--compact">
            ${makeLineChart([risk.ci2022, risk.ci2023, risk.ci2024], ["2022", "2023", "2024"], riskMeta(risk.level).color, { compact: true, showAllYears: true, format: "ci", label: "CI" })}
          </div>
        </article>
        <article class="chart-card">
          <h4>风险解读</h4>
          <div class="single-chart risk-level-card">
            <div class="risk-level-value" style="color:${riskMeta(risk.level).color};">${riskMeta(risk.level).label}</div>
          </div>
        </article>
      `
      : `<article class="chart-card"><h4>暂无风险数据</h4><p class="chart-caption">请在地图上选择有风险分级结果的国家。</p></article>`;
  }

  function renderAlternativeSide(product, country) {
    const shortKey = resolveCountryKey(country, (product.alternatives.shortTerm || []).map((item) => item.country));
    const longKey = resolveCountryKey(country, (product.alternatives.longTerm || []).map((item) => item.country));
    const shortItem = (product.alternatives.shortTerm || []).find((item) => item.country === shortKey);
    const longItem = (product.alternatives.longTerm || []).find((item) => item.country === longKey);

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = shortItem ? tierMeta(shortItem.tier).label : "候选国";
    els.detailBadge.style.background = shortItem ? `${tierMeta(shortItem.tier).color}22` : "rgba(0,0,0,0.06)";

    els.detailHighlights.innerHTML = `
      <article class="detail-chip"><div class="detail-chip-label">短期潜能</div><div class="detail-chip-value">${shortItem ? shortItem.potential.toFixed(4) : "--"}</div></article>
      <article class="detail-chip"><div class="detail-chip-label">长期潜能</div><div class="detail-chip-value">${longItem ? longItem.potential.toFixed(4) : "--"}</div></article>
      <article class="detail-chip"><div class="detail-chip-label">平均出口</div><div class="detail-chip-value">${shortItem ? `${shortItem.exportAvg.toFixed(2)} 百万吨` : "--"}</div></article>
      <article class="detail-chip"><div class="detail-chip-label">理论上限</div><div class="detail-chip-value">${longItem ? formatMt(longItem.potentialProduction) : "--"}</div></article>
    `;

    const altRows = product.alternatives.shortTerm
      .slice(0, 8)
      .map((item) => {
        const max = Math.max(...product.alternatives.shortTerm.slice(0, 8).map((entry) => entry.potential));
        const width = Math.max(8, (item.potential / max) * 100);
        return `
          <div style="display:grid;grid-template-columns:88px 1fr 56px;gap:8px;align-items:center;font-size:12px;">
            <strong>${labelCountry(item.country)}</strong>
            <div style="position:relative;height:8px;border-radius:999px;background:rgba(31,107,69,0.12);overflow:hidden;">
              <span style="position:absolute;inset:0 auto 0 0;width:${width}%;background:${tierMeta(item.tier).color};border-radius:999px;"></span>
            </div>
            <span>${item.potential.toFixed(3)}</span>
          </div>
        `;
      })
      .join("");

    els.chartStack.innerHTML = `
      <article class="chart-card">
        <h4>短期替代潜能对比</h4>
        <div class="single-chart">
          <div class="single-chart-title">前八候选国</div>
          <div style="display:grid;gap:8px;padding:2px 8px 8px;">${altRows}</div>
        </div>
      </article>
      <article class="chart-card">
        <h4>长期替代空间</h4>
        <div class="single-chart">
          <div class="single-chart-title">当前选中国家</div>
          <p class="chart-caption" style="padding:4px 8px 10px;">
            ${longItem ? `${labelCountry(country)} 的长期潜能为 ${longItem.potential.toFixed(4)}，理论产能上限 ${formatMt(longItem.potentialProduction)}，当前产能 ${formatMt(longItem.actualProduction)}。` : "当前没有匹配到长期替代结果。"}
          </p>
        </div>
      </article>
      <article class="chart-card">
        <h4>布局建议</h4>
        <div class="single-chart">
          <div class="single-chart-title">策略提示</div>
          <p class="chart-caption" style="padding:4px 8px 10px;">短期优先配置第一梯队国家用于快速补量，中长期结合长期替代潜能结果规划更稳的进口多元化结构。</p>
        </div>
      </article>
    `;
  }

  function renderSidePanel(product) {
    const country = getSelectedCountry(product);
    if (!country) {
      els.detailTitle.textContent = "请选择国家";
      els.detailBadge.textContent = "待选择";
      els.detailHighlights.innerHTML = "";
      els.chartStack.innerHTML = "";
      return;
    }
    state.selectedCountry = country;

    if (state.module === "overview") {
      renderOverviewSide(product, country);
    } else if (state.module === "risk") {
      renderRiskSide(product, country);
    } else {
      renderAlternativeSide(product, country);
    }

    initChartInteractions();
    hideChartTooltip();
  }

  function isHighRiskLevel(level) {
    return level === "high" || level === "very_high";
  }

  function getAlternativeReplacementCandidates(product, sourceCountry) {
    const shortTerm = product.alternatives.shortTerm || [];
    const sourceKey = resolveCountryKey(sourceCountry, shortTerm.map((item) => item.country)) || sourceCountry;

    return shortTerm
      .filter((item) => normalizeCountryName(item.country) !== normalizeCountryName(sourceKey))
      .filter((item) => {
        const riskKey = resolveCountryKey(item.country, product.risk);
        const risk = riskKey ? product.risk[riskKey] : null;
        return !risk || !isHighRiskLevel(risk.level);
      })
      .slice(0, 6);
  }

  function getCountryAnchor(countryName) {
    const feature = state.geoJson?.features?.find((item) => {
      const mapName = item.properties?.name;
      const matched = resolveCountryKey(mapName, [countryName]);
      return matched && normalizeCountryName(matched) === normalizeCountryName(countryName);
    });

    if (feature?.geometry) {
      const polygons = feature.geometry.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry.coordinates || [];
      let bestPolygon = null;
      let bestArea = -1;

      polygons.forEach((polygon) => {
        const outerRing = polygon?.[0];
        if (!outerRing?.length) return;

        const projected = outerRing.map((point) => projectPoint(point[0], point[1]));
        let twiceArea = 0;

        for (let index = 0; index < projected.length; index += 1) {
          const [x1, y1] = projected[index];
          const [x2, y2] = projected[(index + 1) % projected.length];
          twiceArea += x1 * y2 - x2 * y1;
        }

        const area = Math.abs(twiceArea) / 2;
        if (area > bestArea) {
          bestArea = area;
          bestPolygon = projected;
        }
      });

      if (bestPolygon?.length) {
        let twiceArea = 0;
        let centroidX = 0;
        let centroidY = 0;

        for (let index = 0; index < bestPolygon.length; index += 1) {
          const [x1, y1] = bestPolygon[index];
          const [x2, y2] = bestPolygon[(index + 1) % bestPolygon.length];
          const cross = x1 * y2 - x2 * y1;
          twiceArea += cross;
          centroidX += (x1 + x2) * cross;
          centroidY += (y1 + y2) * cross;
        }

        if (Math.abs(twiceArea) > 1e-6) {
          return [centroidX / (3 * twiceArea), centroidY / (3 * twiceArea)];
        }

        const sum = bestPolygon.reduce(
          (accumulator, [x, y]) => [accumulator[0] + x, accumulator[1] + y],
          [0, 0],
        );
        return [sum[0] / bestPolygon.length, sum[1] / bestPolygon.length];
      }
    }

    const coordinateKey = resolveCountryKey(countryName, appData.countryCoordinates || {});
    if (coordinateKey && Array.isArray(appData.countryCoordinates?.[coordinateKey])) {
      return appData.countryCoordinates[coordinateKey];
    }

    return null;
  }

  function buildArrowPath(fromPoint, toPoint, index, total) {
    const [x1, y1] = fromPoint;
    const [x2, y2] = toPoint;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.hypot(dx, dy) || 1;
    const normalX = -dy / distance;
    const normalY = dx / distance;
    const offset = ((index - (total - 1) / 2) || 0) * 18;
    const curveLift = Math.min(56, Math.max(20, distance * 0.14));
    const cx = x1 + dx * 0.5 + normalX * offset;
    const cy = y1 + dy * 0.5 + normalY * offset - curveLift;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} Q ${cx.toFixed(2)} ${cy.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }

  function getRenderedCountryAnchor(countryName) {
    const shapes = Array.from(els.worldMap.querySelectorAll(".country-shape"));
    const targetShape = shapes.find((shape) => {
      const dataCountry = shape.getAttribute("data-country");
      return normalizeCountryName(dataCountry) === normalizeCountryName(countryName);
    });

    if (!targetShape) return null;

    try {
      const svgRect = els.worldMap.getBoundingClientRect();
      const shapeRect = targetShape.getBoundingClientRect();
      const viewBox = (els.worldMap.getAttribute("viewBox") || "0 0 1000 520")
        .split(/\s+/)
        .map((value) => Number(value));

      if (svgRect.width > 0 && svgRect.height > 0 && viewBox.length === 4) {
        const [, , viewBoxWidth, viewBoxHeight] = viewBox;
        const centerX = shapeRect.left - svgRect.left + shapeRect.width / 2;
        const centerY = shapeRect.top - svgRect.top + shapeRect.height / 2;
        return [
          (centerX / svgRect.width) * viewBoxWidth,
          (centerY / svgRect.height) * viewBoxHeight,
        ];
      }
    } catch (error) {
      // Ignore DOM measurement failures and fall back to geometry-derived anchors.
    }

    return null;
  }

  function renderYearSwitcher(product) {
    if (state.module === "overview") {
      const years = getRecentOverviewYears(product);
      ensureOverviewYear(product);
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = years
        .map(
          (year) => `
            <button class="year-btn ${String(year) === String(state.selectedOverviewYear) ? "active" : ""}" type="button" data-year="${year}">
              ${year}年
            </button>
          `,
        )
        .join("");

      els.yearSwitcher.querySelectorAll("[data-year]").forEach((button) => {
        button.addEventListener("click", () => {
          state.selectedOverviewYear = button.dataset.year;
          state.selectedCountry = null;
          render();
        });
      });
      return;
    }

    if (state.module === "alternative") {
      const selectedCountry = getSelectedCountry(product);
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = `
        <button class="year-btn ${state.alternativeFlowMode ? "active" : ""}" type="button" data-alt-flow="toggle">
          ${state.alternativeFlowMode ? "恢复原布局" : "显示替代流向"}
        </button>
      `;

      const toggleButton = els.yearSwitcher.querySelector("[data-alt-flow='toggle']");
      if (toggleButton) {
        toggleButton.addEventListener("click", () => {
          if (!selectedCountry) return;
          state.alternativeFlowMode = !state.alternativeFlowMode;
          render();
        });
      }
      return;
    }

    els.yearSwitcher.innerHTML = "";
    els.yearSwitcher.classList.add("hidden");
  }

  function getModuleCountryStyles(product) {
    const styleMap = {};
    let legend = [];
    let title = "";
    let kicker = "";
    let caption = "";
    let hiddenCountries = [];
    let replacementArrows = [];

    if (state.module === "overview") {
      const selectedYear = String(state.selectedOverviewYear || product.years.at(getOverviewYearIndex(product)));
      getOverviewCountries(product).forEach((country, index) => {
        const colors = ["#1f6b45", "#2f7b53", "#4d986a", "#76ac84", "#a0c1a3"];
        styleMap[country] = { fill: colors[index] };
      });
      legend = [
        { label: `${selectedYear}年中国前五大进口来源国`, color: palette.primary },
        { label: "其他国家", color: palette.nodata },
      ];
      title = `${selectedYear}年${getProductMeta(product.id).name}进口来源高亮地图`;
      kicker = "最近三年切换";
      caption = `点击高亮国家后，右侧会展示该国生产数据、中国自该国进口量与价格走势，以及中国对该国进口依赖度变化。当前查看：${selectedYear} 年。`;
    } else if (state.module === "risk") {
      Object.entries(product.risk).forEach(([country, info]) => {
        styleMap[country] = { fill: riskMeta(info.level).color };
      });
      legend = [
        { label: "极高风险", color: palette.veryHigh },
        { label: "高风险", color: palette.high },
        { label: "中风险", color: palette.medium },
        { label: "低风险", color: palette.low },
      ];
      title = `${getProductMeta(product.id).name}CI 风险地图`;
      kicker = "风险视图";
      caption = "展示 2022-2024 年 CI 风险分级结果，可快速识别高风险供应节点。";
    } else {
      const sourceCountry = getSelectedCountry(product);

      if (state.alternativeFlowMode && sourceCountry) {
        const candidates = getAlternativeReplacementCandidates(product, sourceCountry);
        candidates.forEach((item, index) => {
          const colors = ["#1f6b45", "#3c8b57", "#5e9e63", "#83b475", "#a7c78f", "#cad9af"];
          styleMap[item.country] = { fill: colors[index] || tierMeta(item.tier).color };
        });
        hiddenCountries = [sourceCountry];
        replacementArrows = candidates.map((item) => ({
          from: sourceCountry,
          to: item.country,
          color: tierMeta(item.tier).color,
        }));
        legend = [
          { label: "已移除原来源国", color: "#d5ddd6" },
          { label: "可替代且非高风险国家", color: palette.tier1 },
        ];
        title = `${labelCountry(sourceCountry)}替代流向模拟`;
        kicker = "替代演示";
        caption = `当前已隐藏 ${labelCountry(sourceCountry)}，并高亮 ${candidates.length} 个可承接替代需求且不属于高风险的候选国家。`;
      } else {
        getAlternativeCountries(product).forEach((item) => {
          styleMap[item.country] = { fill: tierMeta(item.tier).color };
        });
        legend = [
          { label: "第一梯队", color: palette.tier1 },
          { label: "第二梯队", color: palette.tier2 },
          { label: "第三梯队", color: palette.tier3 },
        ];
        title = `${getProductMeta(product.id).name}替代产能布局`;
        kicker = "替代视图";
        caption = "展示短期替代潜能较高的国家分布，并联动查看长期替代空间。";
      }
    }

    return { styleMap, legend, title, kicker, caption, hiddenCountries, replacementArrows };
  }

  function drawReplacementArrows(replacementArrows) {
    if (!replacementArrows.length) return;

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", "replacementArrowHead");
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "10");
    marker.setAttribute("refX", "8");
    marker.setAttribute("refY", "3");
    marker.setAttribute("orient", "auto");
    const arrowHead = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrowHead.setAttribute("d", "M0,0 L0,6 L9,3 z");
    arrowHead.setAttribute("fill", "#1f6b45");
    marker.appendChild(arrowHead);
    defs.appendChild(marker);
    els.worldMap.appendChild(defs);

    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("class", "replacement-arrow-layer");

    replacementArrows.forEach((item, index) => {
      const fromPoint = getRenderedCountryAnchor(item.from) || getCountryAnchor(item.from);
      const toPoint = getRenderedCountryAnchor(item.to) || getCountryAnchor(item.to);
      if (!fromPoint || !toPoint) return;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", buildArrowPath(fromPoint, toPoint, index, replacementArrows.length));
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", item.color || "#1f6b45");
      path.setAttribute("stroke-width", "2.4");
      path.setAttribute("stroke-linecap", "round");
      path.setAttribute("stroke-dasharray", "9 7");
      path.setAttribute("marker-end", "url(#replacementArrowHead)");
      path.setAttribute("class", "replacement-arrow");
      group.appendChild(path);

      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", String(toPoint[0]));
      dot.setAttribute("cy", String(toPoint[1]));
      dot.setAttribute("r", "4.8");
      dot.setAttribute("fill", item.color || "#1f6b45");
      dot.setAttribute("class", "replacement-node");
      group.appendChild(dot);
    });

    els.worldMap.appendChild(group);
  }

  function drawMap(product) {
    const { styleMap, legend, title, kicker, caption, hiddenCountries = [], replacementArrows = [] } = getModuleCountryStyles(product);
    renderYearSwitcher(product);
    renderLegend(legend);
    els.mapKicker.textContent = kicker;
    els.mapTitle.textContent = title;
    els.mapCaption.textContent = caption;
    els.worldMap.innerHTML = "";

    if (!state.geoJson) {
      els.worldMap.innerHTML = '<text x="500" y="260" text-anchor="middle" fill="#627061" font-size="18">地图数据加载中...</text>';
      return;
    }

    state.selectedCountry = getSelectedCountry(product);

    state.geoJson.features.forEach((feature) => {
      const mapName = feature.properties?.name;
      const matchedKey = resolveCountryKey(mapName, Object.keys(styleMap));
      const hiddenKey = resolveCountryKey(mapName, hiddenCountries);
      const pathData = geometryToPath(feature.geometry);
      if (!pathData) return;

      const node = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const isHiddenCountry = Boolean(hiddenKey);

      node.setAttribute("d", pathData);
      node.setAttribute("fill", isHiddenCountry ? "rgba(255,255,255,0)" : matchedKey ? styleMap[matchedKey].fill : palette.nodata);
      node.setAttribute("stroke", isHiddenCountry ? "rgba(0,0,0,0)" : palette.border);
      node.setAttribute("stroke-width", isHiddenCountry ? "0" : "0.8");
      node.setAttribute("class", `country-shape${isHiddenCountry ? " is-hidden" : ""}`);
      node.setAttribute("data-country", matchedKey || mapName);
      node.setAttribute("opacity", isHiddenCountry ? "0" : matchedKey ? "0.96" : "0.72");

      if (!isHiddenCountry && matchedKey && normalizeCountryName(matchedKey) === normalizeCountryName(state.selectedCountry)) {
        node.classList.add("is-active");
      }

      node.addEventListener("mouseenter", (event) => showTooltip(event, product, mapName));
      node.addEventListener("mousemove", setTooltipPosition);
      node.addEventListener("mouseleave", hideTooltip);
      node.addEventListener("click", () => {
        const next = resolveCountryKey(mapName, [
          ...Object.keys(product.imports),
          ...Object.keys(product.producers),
          ...Object.keys(product.risk),
          ...(product.alternatives.shortTerm || []).map((item) => item.country),
          ...(product.alternatives.longTerm || []).map((item) => item.country),
        ]);
        if (next) {
          state.selectedCountry = next;
          render();
        }
      });

      els.worldMap.appendChild(node);
    });

    drawReplacementArrows(replacementArrows);
  }

  function render() {
    const product = getProduct();
    ensureOverviewYear(product);
    updateView();
    createLanding();
    createTopbar(product);
    buildHeroMetrics(product);
    drawMap(product);
    renderSidePanel(product);
  }

  async function loadWorldMap() {
    try {
      const response = await fetch("./world.json");
      state.geoJson = await response.json();
    } catch (error) {
      console.error("加载世界地图失败", error);
    }
    render();
  }

  els.backHome.addEventListener("click", () => {
    state.view = "landing";
    state.alternativeFlowMode = false;
    updateView();
  });

  render();
  loadWorldMap();
})();
