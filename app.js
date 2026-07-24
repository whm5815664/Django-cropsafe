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
    "Türkiye": "土耳其",
    "Bolivia (Plurinational State of)": "玻利维亚",
    "United Rep. of Tanzania": "坦桑尼亚",
    "United Republic of Tanzania": "坦桑尼亚",
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
    turkey: ["Turkey", "Türkiye"],
    trkiye: ["Turkey", "Türkiye"],
    bolivia: ["Bolivia", "Bolivia (Plurinational State of)"],
    boliviaplurinationalstateof: ["Bolivia", "Bolivia (Plurinational State of)"],
    tanzania: ["Tanzania", "United Rep. of Tanzania", "United Republic of Tanzania"],
    unitedrepoftanzania: ["Tanzania", "United Rep. of Tanzania", "United Republic of Tanzania"],
    unitedrepublicoftanzania: ["Tanzania", "United Rep. of Tanzania", "United Republic of Tanzania"],
    china: ["China"],
  };

  const WORLD_COUNTRY_LABELS = {
    Afghanistan: "阿富汗",
    Aland: "奥兰群岛",
    Albania: "阿尔巴尼亚",
    Algeria: "阿尔及利亚",
    "American Samoa": "美属萨摩亚",
    Andorra: "安道尔",
    Angola: "安哥拉",
    "Antigua and Barb.": "安提瓜和巴布达",
    Armenia: "亚美尼亚",
    Azerbaijan: "阿塞拜疆",
    Bahamas: "巴哈马",
    Bahrain: "巴林",
    Bangladesh: "孟加拉国",
    Barbados: "巴巴多斯",
    Belarus: "白俄罗斯",
    Belgium: "比利时",
    Belize: "伯利兹",
    Benin: "贝宁",
    Bermuda: "百慕大",
    Bhutan: "不丹",
    Bolivia: "玻利维亚",
    "Bosnia and Herz.": "波黑",
    Botswana: "博茨瓦纳",
    "Br. Indian Ocean Ter.": "英属印度洋领地",
    Brunei: "文莱",
    "Burkina Faso": "布基纳法索",
    Burundi: "布隆迪",
    Cambodia: "柬埔寨",
    Cameroon: "喀麦隆",
    "Cape Verde": "佛得角",
    "Cayman Is.": "开曼群岛",
    "Central African Rep.": "中非",
    Chad: "乍得",
    Chile: "智利",
    Colombia: "哥伦比亚",
    Comoros: "科摩罗",
    Congo: "刚果",
    "Costa Rica": "哥斯达黎加",
    Croatia: "克罗地亚",
    Cuba: "古巴",
    "Curaçao": "库拉索",
    Cyprus: "塞浦路斯",
    "Czech Rep.": "捷克",
    "Côte d'Ivoire": "科特迪瓦",
    "Dem. Rep. Congo": "刚果（金）",
    "Dem. Rep. Korea": "朝鲜",
    Denmark: "丹麦",
    Djibouti: "吉布提",
    Dominica: "多米尼克",
    "Dominican Rep.": "多米尼加",
    Ecuador: "厄瓜多尔",
    Egypt: "埃及",
    "El Salvador": "萨尔瓦多",
    "Eq. Guinea": "赤道几内亚",
    Eritrea: "厄立特里亚",
    Estonia: "爱沙尼亚",
    "Faeroe Is.": "法罗群岛",
    "Falkland Is.": "福克兰群岛",
    Fiji: "斐济",
    Finland: "芬兰",
    "Fr. Polynesia": "法属波利尼西亚",
    "Fr. S. Antarctic Lands": "法属南部和南极领地",
    Gabon: "加蓬",
    Gambia: "冈比亚",
    Georgia: "格鲁吉亚",
    Ghana: "加纳",
    Greece: "希腊",
    Greenland: "格陵兰",
    Grenada: "格林纳达",
    Guam: "关岛",
    Guatemala: "危地马拉",
    Guinea: "几内亚",
    "Guinea-Bissau": "几内亚比绍",
    Guyana: "圭亚那",
    Haiti: "海地",
    "Heard I. and McDonald Is.": "赫德岛和麦克唐纳群岛",
    Honduras: "洪都拉斯",
    Iceland: "冰岛",
    Indonesia: "印度尼西亚",
    Iran: "伊朗",
    Iraq: "伊拉克",
    Ireland: "爱尔兰",
    "Isle of Man": "马恩岛",
    Israel: "以色列",
    Italy: "意大利",
    Jamaica: "牙买加",
    Japan: "日本",
    Jersey: "泽西岛",
    Jordan: "约旦",
    Kenya: "肯尼亚",
    Kiribati: "基里巴斯",
    Korea: "韩国",
    Kuwait: "科威特",
    Kyrgyzstan: "吉尔吉斯斯坦",
    "Lao PDR": "老挝",
    Latvia: "拉脱维亚",
    Lebanon: "黎巴嫩",
    Lesotho: "莱索托",
    Liberia: "利比里亚",
    Libya: "利比亚",
    Liechtenstein: "列支敦士登",
    Lithuania: "立陶宛",
    Luxembourg: "卢森堡",
    Macedonia: "北马其顿",
    Madagascar: "马达加斯加",
    Malawi: "马拉维",
    Malaysia: "马来西亚",
    Mali: "马里",
    Malta: "马耳他",
    Mauritania: "毛里塔尼亚",
    Mauritius: "毛里求斯",
    Micronesia: "密克罗尼西亚",
    Moldova: "摩尔多瓦",
    Mongolia: "蒙古",
    Montenegro: "黑山",
    Montserrat: "蒙特塞拉特",
    Morocco: "摩洛哥",
    Mozambique: "莫桑比克",
    "N. Cyprus": "北塞浦路斯",
    "N. Mariana Is.": "北马里亚纳群岛",
    Namibia: "纳米比亚",
    Nepal: "尼泊尔",
    Netherlands: "荷兰",
    "New Caledonia": "新喀里多尼亚",
    "New Zealand": "新西兰",
    Nicaragua: "尼加拉瓜",
    Niger: "尼日尔",
    Niue: "纽埃",
    Norway: "挪威",
    Oman: "阿曼",
    Pakistan: "巴基斯坦",
    Palau: "帕劳",
    Palestine: "巴勒斯坦",
    Panama: "巴拿马",
    "Papua New Guinea": "巴布亚新几内亚",
    Peru: "秘鲁",
    Philippines: "菲律宾",
    Portugal: "葡萄牙",
    "Puerto Rico": "波多黎各",
    Qatar: "卡塔尔",
    Rwanda: "卢旺达",
    "S. Geo. and S. Sandw. Is.": "南乔治亚和南桑威奇群岛",
    "S. Sudan": "南苏丹",
    "Saint Helena": "圣赫勒拿",
    "Saint Lucia": "圣卢西亚",
    Samoa: "萨摩亚",
    "Saudi Arabia": "沙特阿拉伯",
    Senegal: "塞内加尔",
    Seychelles: "塞舌尔",
    "Siachen Glacier": "锡亚琴冰川",
    "Sierra Leone": "塞拉利昂",
    Singapore: "新加坡",
    Slovakia: "斯洛伐克",
    Slovenia: "斯洛文尼亚",
    "Solomon Is.": "所罗门群岛",
    "Sri Lanka": "斯里兰卡",
    "St. Pierre and Miquelon": "圣皮埃尔和密克隆",
    "St. Vin. and Gren.": "圣文森特和格林纳丁斯",
    Suriname: "苏里南",
    Swaziland: "斯威士兰",
    Sweden: "瑞典",
    Switzerland: "瑞士",
    Syria: "叙利亚",
    "São Tomé and Principe": "圣多美和普林西比",
    Tajikistan: "塔吉克斯坦",
    Tanzania: "坦桑尼亚",
    Thailand: "泰国",
    "Timor-Leste": "东帝汶",
    Togo: "多哥",
    Tonga: "汤加",
    "Trinidad and Tobago": "特立尼达和多巴哥",
    Tunisia: "突尼斯",
    Turkmenistan: "土库曼斯坦",
    "Turks and Caicos Is.": "特克斯和凯科斯群岛",
    "U.S. Virgin Is.": "美属维尔京群岛",
    Uganda: "乌干达",
    "United Arab Emirates": "阿联酋",
    "United Kingdom": "英国",
    Uzbekistan: "乌兹别克斯坦",
    Vanuatu: "瓦努阿图",
    Venezuela: "委内瑞拉",
    Vietnam: "越南",
    "W. Sahara": "西撒哈拉",
    Yemen: "也门",
    Zambia: "赞比亚",
    Zimbabwe: "津巴布韦",
  };

  const ENGLISH_COUNTRY_NAMES = {
    usa: "United States",
    unitedstates: "United States",
    unitedstatesofamerica: "United States",
    brazil: "Brazil",
    argentina: "Argentina",
    uruguay: "Uruguay",
    canada: "Canada",
    paraguay: "Paraguay",
    russia: "Russia",
    russianfederation: "Russia",
    ukraine: "Ukraine",
    australia: "Australia",
    france: "France",
    germany: "Germany",
    india: "India",
    china: "China",
    myanmar: "Myanmar",
    mexico: "Mexico",
    nigeria: "Nigeria",
    ethiopia: "Ethiopia",
    sudan: "Sudan",
    kazakhstan: "Kazakhstan",
    southafrica: "South Africa",
    romania: "Romania",
    bulgaria: "Bulgaria",
    turkey: "Turkey",
    poland: "Poland",
    spain: "Spain",
    hungary: "Hungary",
    serbia: "Serbia",
    austria: "Austria",
    somalia: "Somalia",
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
    selectedRiskRadarYear: "2024",
    riskRadarScale: 1,
    riskRadarOffset: { x: 0, y: 0 },
    riskRadarDrag: null,
    alternativeFlowMode: false,
    alternativeHorizon: "short",
    alternativeDisruptionCountry: null,
    geoJson: null,
    mapViewport: { x: 0, y: 0, width: 1000, height: 520 },
    mapTargetViewport: { x: 0, y: 0, width: 1000, height: 520 },
    mapZoomAnimationFrame: null,
    mapDrag: null,
    suppressMapClickUntil: 0,
  };

  const palette = {
    primary: "#1f6b45",
    veryHigh: "#9f1f1f",
    high: "#d6453d",
    medium: "#f0b429",
    low: "#3f8f5c",
    negligible: "#a8cbb2",
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
    mapPanel: document.getElementById("mapPanel"),
    mapStage: document.getElementById("mapStage"),
    mapFooter: document.getElementById("mapFooter"),
    worldMap: document.getElementById("worldMap"),
    mapZoomIn: document.getElementById("mapZoomIn"),
    mapZoomOut: document.getElementById("mapZoomOut"),
    mapResetView: document.getElementById("mapResetView"),
    mapDefinition: document.getElementById("mapDefinition"),
    mapFocus: document.getElementById("mapFocus"),
    mapTooltip: document.getElementById("mapTooltip"),
    detailModal: document.getElementById("detailModal"),
    detailModalBody: document.getElementById("detailModalBody"),
    detailModalClose: document.getElementById("detailModalClose"),
    detailTitle: document.getElementById("detailTitle"),
    detailBadge: document.getElementById("detailBadge"),
    detailHighlights: document.getElementById("detailHighlights"),
    chartStack: document.getElementById("chartStack"),
    sidePanel: document.querySelector(".side-panel"),
  };

  const modalTransitionState = {
    sourceEl: null,
    panelAnimation: null,
    bodyAnimation: null,
    backdropAnimation: null,
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
    return WORLD_COUNTRY_LABELS[name] || COUNTRY_LABELS[name] || name;
  }

  function getRecentOverviewYears(product) {
    return product?.years || [];
  }

  function ensureOverviewYear(product) {
    const years = getRecentOverviewYears(product);
    const fallbackYear = years.at(-1) || product?.years?.at(-1) || null;
    const currentYear = String(state.selectedOverviewYear || "");

    if (!fallbackYear) {
      state.selectedOverviewYear = null;
      return;
    }

    state.selectedOverviewYear = years.includes(currentYear) ? currentYear : String(fallbackYear);
  }

  function getRiskYears() {
    return ["2022", "2023", "2024", "avg"];
  }

  function isRiskAverageYear(year) {
    return String(year) === "avg";
  }

  function getRiskYearLabel(year, options = {}) {
    const withUnit = options.withUnit !== false;
    if (isRiskAverageYear(year)) return "平均值";
    return withUnit ? `${year}年` : String(year);
  }

  function ensureRiskYear() {
    const years = getRiskYears();
    const currentYear = String(state.selectedRiskRadarYear || "");
    state.selectedRiskRadarYear = years.includes(currentYear) ? currentYear : "2024";
    return state.selectedRiskRadarYear;
  }

  function getRiskCiByYear(risk, year) {
    if (!risk) return null;
    if (isRiskAverageYear(year)) {
      const numeric = Number(risk.score);
      return Number.isFinite(numeric) ? numeric : null;
    }
    const value = risk[`ci${year}`];
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
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

  function formatOptionalSeriesValue(series, index, formatter) {
    const value = getSeriesValue(series, index);
    return value === null || value === undefined || !Number.isFinite(Number(value))
      ? "暂无数据"
      : formatter(value);
  }

  function getAvailableSeriesValues(series) {
    return (series || []).filter((value) => value !== null && value !== undefined && Number.isFinite(Number(value))).map(Number);
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

  function getChartInteractionRoots() {
    return [els.chartStack, els.detailModalBody].filter(Boolean);
  }

  function hideChartTooltip() {
    ensureChartTooltip().classList.add("hidden");
    getChartInteractionRoots().forEach((root) => {
      root.querySelectorAll(".chart-point.is-active").forEach((node) => {
        node.classList.remove("is-active");
        if (node.dataset.baseR) node.setAttribute("r", node.dataset.baseR);
      });
      root.querySelectorAll(".chart-point-halo").forEach((node) => node.setAttribute("opacity", "0"));
      root.querySelectorAll(".chart-hover-line").forEach((line) => line.setAttribute("opacity", "0"));
    });
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
    getChartInteractionRoots().forEach((root) => {
      if (root.dataset.bound === "1") return;
      root.dataset.bound = "1";

      root.addEventListener("mousemove", (event) => {
        const point = event.target.closest(".chart-hit-point");
        if (point) {
          showChartTooltip(event, point);
          return;
        }
        hideChartTooltip();
      });

      root.addEventListener("mouseleave", hideChartTooltip);
    });
  }

  function riskMeta(level) {
    if (level === "very_high") return { label: "极高风险", color: palette.veryHigh };
    if (level === "high") return { label: "高风险", color: palette.high };
    if (level === "medium") return { label: "中风险", color: palette.medium };
    if (level === "low") return { label: "低风险", color: palette.low };
    return { label: "风险可忽略", color: palette.negligible };
  }

  function formatRiskMetric(value) {
    if (value === null || value === undefined || value === "") return "--";
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric.toFixed(4) : "--";
  }

  function getRiskDtvByYear(risk, year) {
    if (!risk) {
      return { d: null, t: null, v: null };
    }

    if (isRiskAverageYear(year)) {
      const years = ["2022", "2023", "2024"];
      const averageMetric = (key) => {
        const values = years
          .map((item) => Number(risk.dtv?.[item]?.[key]))
          .filter((value) => Number.isFinite(value));
        if (!values.length) return null;
        return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(4));
      };
      return {
        d: averageMetric("d"),
        t: averageMetric("t"),
        v: averageMetric("v"),
      };
    }

    return (
      risk.dtv?.[String(year)] || {
        d: null,
        t: null,
        v: null,
      }
    );
  }

  function tierMeta(tier) {
    const map = {
      1: { label: "第一梯队", color: palette.tier1 },
      2: { label: "第二梯队", color: palette.tier2 },
      3: { label: "第三梯队", color: palette.tier3 },
    };
    return map[tier];
  }

  function getAlternativeModeLabel() {
    return state.alternativeHorizon === "long" ? "长期替代" : "短期替代";
  }

  function getAlternativeDataset(product) {
    return state.alternativeHorizon === "long" ? product.alternatives.longTerm || [] : product.alternatives.shortTerm || [];
  }

  function getAlternativeTopCountries(product) {
    return getAlternativeDataset(product).slice(0, 10);
  }

  function getAlternativeTierColor(tierLabel) {
    const label = String(tierLabel || "").trim();
    const map = {
      "极高": "#1f6b45",
      "高": "#2f7b53",
      "较高": "#5e9e63",
      "中": "#9ab66e",
      "较低": "#d2c36e",
      "低": "#b89a63",
    };
    return map[label] || palette.tier2;
  }

  function getAlternativeRiskLabel(product, country) {
    const riskKey = resolveCountryKey(country, product.risk);
    const risk = riskKey ? product.risk[riskKey] : null;
    return risk ? riskMeta(risk.level).label : "暂无风险分级";
  }

  function getAlternativeSuggestion(product, item) {
    if (!item) {
      return {
        title: "待评估",
        text: "当前国家暂无替代结果，建议补充实验室替代潜能与风险分级后再评估。",
      };
    }

    const riskKey = resolveCountryKey(item.country, product.risk);
    const risk = riskKey ? product.risk[riskKey] : null;
    const riskLevel = risk?.level || "medium";
    const importKey = resolveCountryKey(item.country, product.imports);
    const importInfo = importKey ? product.imports[importKey] : null;
    const latestImport = importInfo ? Number(importInfo.volume?.at?.(-1) || 0) : 0;
    const hasImportBase = latestImport > 0.1;
    const tierLabel = String(item.tierLabel || "");

    if (state.alternativeHorizon === "short") {
      if ((tierLabel === "高" || tierLabel === "较高") && (riskLevel === "low" || riskLevel === "medium")) {
        return {
          title: hasImportBase ? "优先短期承接" : "优先短期补位",
          text: hasImportBase
            ? "该国已有对华进口基础，且短期替代能力较强、风险水平可控，适合作为短期增量承接国。"
            : "该国短期替代能力较强且风险水平可控，可优先作为短期补位候选国。 ",
        };
      }
      if (riskLevel === "high" || riskLevel === "very_high") {
        return {
          title: "谨慎短期使用",
          text: "该国虽具备一定短期替代潜能，但 CI 风险等级偏高，建议仅作为应急补充，不宜过度集中。 ",
        };
      }
      return {
        title: "储备观察",
        text: "该国短期替代能力或现有进口基础有限，建议保留为备选来源并持续跟踪。 ",
      };
    }

    if ((tierLabel === "极高" || tierLabel === "高" || tierLabel === "较高" || tierLabel === "中") && (riskLevel === "low" || riskLevel === "medium")) {
      return {
        title: "优先纳入长期培育",
        text: "该国长期替代潜能处于中高水平，且风险等级较低，适合纳入长期进口多元化与产能合作布局。 ",
      };
    }
    if (riskLevel === "high" || riskLevel === "very_high") {
      return {
        title: "谨慎长期培育",
        text: "该国长期扩张空间存在，但风险等级偏高，建议控制配置比例，避免形成新的集中暴露。 ",
      };
    }
    return {
      title: "中长期跟踪",
      text: "该国具备一定长期替代潜能，但综合优势尚不突出，建议作为观察型候选国持续评估。 ",
    };
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
        state.alternativeDisruptionCountry = null;
        render();
      });
    });

    els.moduleSwitcher.querySelectorAll("[data-module]").forEach((button) => {
      button.addEventListener("click", () => {
        state.module = button.dataset.module;
        state.selectedCountry = null;
        state.alternativeFlowMode = false;
        state.alternativeDisruptionCountry = null;
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
    return getAlternativeTopCountries(product);
  }

  function getSelectedCountry(product) {
    if (state.module === "overview") {
      const overviewCountries = getOverviewCountries(product);
      if (state.selectedCountry && overviewCountries.includes(state.selectedCountry)) return state.selectedCountry;
      return overviewCountries[0] || null;
    }
    if (state.module === "risk") return getRiskCountries(product)[0];
    if (state.module === "alternative") {
      const alternativeCountries = getAlternativeCountries(product).map((item) => item.country);
      if (state.selectedCountry && resolveCountryKey(state.selectedCountry, alternativeCountries)) {
        return resolveCountryKey(state.selectedCountry, alternativeCountries);
      }
      return alternativeCountries[0] || null;
    }
    if (state.selectedCountry) return state.selectedCountry;
    return null;
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
        note: "按当前选中年份汇总前十大主产国的产量。",
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

  function buildHeroMetrics(product) {
    if (state.module === "risk") {
      const country = getSelectedCountry(product);
      const riskKey = resolveCountryKey(country, product.risk);
      const risk = riskKey ? product.risk[riskKey] : null;
      const countryLabel = labelCountry(riskKey || country || "该国");

      els.heroMetrics.className = "metric-strip metric-strip--triple";
      els.heroMetrics.innerHTML = ["2022", "2023", "2024"]
        .map((year) => {
          const metrics = getRiskDtvByYear(risk, year);
          return `
            <article class="metric-card metric-card--risk-year">
              <div class="metric-label">${countryLabel} ${year}</div>
              <div class="risk-year-grid">
                <div class="risk-year-item">
                  <span>D</span>
                  <strong>${formatRiskMetric(metrics.d)}</strong>
                </div>
                <div class="risk-year-item">
                  <span>T</span>
                  <strong>${formatRiskMetric(metrics.t)}</strong>
                </div>
                <div class="risk-year-item">
                  <span>V</span>
                  <strong>${formatRiskMetric(metrics.v)}</strong>
                </div>
              </div>
              <div class="metric-note">D 破坏性 / T 传播性 / V 脆弱性</div>
            </article>
          `;
        })
        .join("");
      return;
    }

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
        note: "按当前选中年份汇总前十大主产国的产量。",
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

    els.heroMetrics.className = "metric-strip";
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

  function renderRiskSide(product, country) {
    const riskKey = resolveCountryKey(country, product.risk);
    const risk = riskKey ? product.risk[riskKey] : null;
    const riskYears = ["2022", "2023", "2024"];
    const radarSeries = risk
      ? [
          { label: "2022", color: "#1f6b45", values: ["2022", "2022", "2022"].map((year, index) => {
            const metrics = getRiskDtvByYear(risk, year);
            return [metrics.d, metrics.t, metrics.v][index];
          }) },
          { label: "2023", color: "#d2a543", values: ["2023", "2023", "2023"].map((year, index) => {
            const metrics = getRiskDtvByYear(risk, year);
            return [metrics.d, metrics.t, metrics.v][index];
          }) },
          { label: "2024", color: "#b93e34", values: ["2024", "2024", "2024"].map((year, index) => {
            const metrics = getRiskDtvByYear(risk, year);
            return [metrics.d, metrics.t, metrics.v][index];
          }) },
        ]
      : [];

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = risk ? riskMeta(risk.level).label : "暂无数据";
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
        <article class="chart-card">
          <h4>D / T / V 三维雷达图</h4>
          <div class="single-chart">
            <div class="single-chart-title">2022-2024 三年对比</div>
            ${makeRadarChart(radarSeries, { size: 308, radius: 96, maxValue: 3 })}
          </div>
        </article>
        <article class="chart-card">
          <h4>风险解读</h4>
          <div class="single-chart risk-level-card risk-level-card--stacked">
            <div class="risk-level-value" style="color:${riskMeta(risk.level).color};">${riskMeta(risk.level).label}</div>
            <p class="chart-caption">右侧雷达图展示该国 2022-2024 年的 D 破坏性、T 传播性与 V 脆弱性变化，用于辅助识别风险结构变化。</p>
            <p class="chart-caption">CI 2022-2024：${risk.ci2022.toFixed(4)} / ${risk.ci2023.toFixed(4)} / ${risk.ci2024.toFixed(4)}</p>
          </div>
        </article>
      `
      : `<article class="chart-card"><h4>暂无风险数据</h4><p class="chart-caption">请在地图中选择具有风险分级结果的国家。</p></article>`;
  }

  function renderRiskSide(product, country) {
    const riskKey = resolveCountryKey(country, product.risk);
    const risk = riskKey ? product.risk[riskKey] : null;
    const riskYears = ["2022", "2023", "2024"];

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = risk ? riskMeta(risk.level).label : "暂无数据";
    els.detailBadge.style.background = risk ? `${riskMeta(risk.level).color}22` : "rgba(0,0,0,0.06)";

    els.detailHighlights.innerHTML = risk
      ? `
        <article class="detail-chip"><div class="detail-chip-label">CI 2022</div><div class="detail-chip-value">${risk.ci2022.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">CI 2023</div><div class="detail-chip-value">${risk.ci2023.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">CI 2024</div><div class="detail-chip-value">${risk.ci2024.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">三年均值</div><div class="detail-chip-value">${risk.score.toFixed(4)}</div></article>
      `
      : "";

    const radarSeries = risk
      ? riskYears.map((year, index) => {
          const metrics = getRiskDtvByYear(risk, year);
          const colors = ["#1f6b45", "#d2a543", "#b93e34"];
          return {
            label: year,
            color: colors[index],
            values: [metrics.d, metrics.t, metrics.v],
          };
        })
      : [];

    els.chartStack.innerHTML = risk
      ? `
        <article class="chart-card">
          <h4>D / T / V 三维雷达图</h4>
          <div class="single-chart">
            <div class="single-chart-title">2022-2024 三年结构对比</div>
            ${makeRadarChart(radarSeries, { size: 308, radius: 96, maxValue: 3 })}
          </div>
        </article>
        <article class="chart-card">
          <h4>CI 风险解读</h4>
          <div class="single-chart risk-level-card risk-level-card--stacked">
            <div class="risk-level-value" style="color:${riskMeta(risk.level).color};">${riskMeta(risk.level).label}</div>
            <p class="chart-caption">雷达图展示该国 2022-2024 年 D 破坏性、T 传播性、V 脆弱性的结构变化，便于对比不同年份的风险构成。</p>
            <p class="chart-caption">CI 2022-2024：${risk.ci2022.toFixed(4)} / ${risk.ci2023.toFixed(4)} / ${risk.ci2024.toFixed(4)}</p>
          </div>
        </article>
      `
      : `<article class="chart-card"><h4>暂无风险数据</h4><p class="chart-caption">请在地图中选择具有风险分级结果的国家。</p></article>`;
  }

  function buildHeroMetrics(product) {
    if (state.module === "risk" || state.module === "alternative") {
      els.heroMetrics.innerHTML = "";
      els.heroMetrics.className = "metric-strip hidden";
      return;
    }

    els.heroMetrics.classList.remove("hidden");

    if (state.module === "risk") {
      const country = getSelectedCountry(product);
      const riskKey = resolveCountryKey(country, product.risk);
      const risk = riskKey ? product.risk[riskKey] : null;
      const countryLabel = labelCountry(riskKey || country || "该国");
      const years = ["2022", "2023", "2024"];

      els.heroMetrics.className = "metric-strip metric-strip--triple";
      els.heroMetrics.innerHTML = years
        .map((year) => {
          const metrics = getRiskDtvByYear(risk, year);
          return `
            <article class="metric-card metric-card--risk-year">
              <div class="metric-label">${countryLabel} ${year}</div>
              <div class="risk-year-grid">
                <div class="risk-year-item">
                  <span>D</span>
                  <strong>${formatRiskMetric(metrics.d)}</strong>
                </div>
                <div class="risk-year-item">
                  <span>T</span>
                  <strong>${formatRiskMetric(metrics.t)}</strong>
                </div>
                <div class="risk-year-item">
                  <span>V</span>
                  <strong>${formatRiskMetric(metrics.v)}</strong>
                </div>
              </div>
              <div class="metric-note">D 破坏性 / T 传播性 / V 脆弱性</div>
            </article>
          `;
        })
        .join("");
      return;
    }

    if (state.module === "alternative") {
      const country = getSelectedCountry(product);
      const item = getAlternativeSelectedItem(product, country);
      const topCountries = getAlternativeTopCountries(product);
      const suggestion = getAlternativeSuggestion(product, item);

      els.heroMetrics.className = "metric-strip";
      els.heroMetrics.innerHTML = [
        {
          label: `${getAlternativeModeLabel()}覆盖国家`,
          value: `${topCountries.length} 个`,
          note: `当前界面展示 ${getAlternativeModeLabel()}潜能排名前 10 的国家。`,
        },
        {
          label: `${labelCountry(country || "当前国家")}潜能`,
          value: item ? item.potential.toFixed(4) : "--",
          note: item ? `能力分级：${item.tierLabel}` : "当前国家暂无匹配的替代潜能结果。",
        },
        {
          label: "风险等级",
          value: item ? getAlternativeRiskLabel(product, item.country) : "--",
          note: "结合前述 CI 风险分级结果进行替代可行性判断。",
        },
        {
          label: "替代建议",
          value: suggestion.title,
          note: "当前建议为临时规则版，后续可按你提供的正式分级表替换。",
        },
      ]
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
      return;
    }

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
        note: "按当前选中年份汇总前十大主产国的产量。",
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

    els.heroMetrics.className = "metric-strip";
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

  function getSelectedCountry(product) {
    if (state.module === "overview") {
      const overviewCountries = getOverviewCountries(product);
      if (state.selectedCountry && resolveCountryKey(state.selectedCountry, overviewCountries)) {
        return resolveCountryKey(state.selectedCountry, overviewCountries);
      }
      return overviewCountries[0] || null;
    }

    if (state.module === "risk") {
      const riskCountries = getRiskCountries(product);
      if (state.selectedCountry && resolveCountryKey(state.selectedCountry, riskCountries)) {
        return resolveCountryKey(state.selectedCountry, riskCountries);
      }
      return riskCountries[0] || null;
    }

    if (state.module === "alternative") {
      const alternativeCountries = getAlternativeCountries(product).map((item) => item.country);
      if (state.selectedCountry && resolveCountryKey(state.selectedCountry, alternativeCountries)) {
        return resolveCountryKey(state.selectedCountry, alternativeCountries);
      }
      return alternativeCountries[0] || null;
    }

    return state.selectedCountry || null;
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

  function clampMapViewport(viewport) {
    const minWidth = 220;
    const maxWidth = 1000;
    const nextWidth = Math.min(maxWidth, Math.max(minWidth, viewport.width));
    const nextHeight = nextWidth * 0.52;
    const maxX = 1000 - nextWidth;
    const maxY = 520 - nextHeight;

    return {
      x: Math.min(Math.max(0, viewport.x), Math.max(0, maxX)),
      y: Math.min(Math.max(0, viewport.y), Math.max(0, maxY)),
      width: nextWidth,
      height: nextHeight,
    };
  }

  function applyMapViewport() {
    const viewport = clampMapViewport(state.mapViewport);
    state.mapViewport = viewport;
    els.worldMap.setAttribute("viewBox", `${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}`);
    updateMapZoomUI();
  }

  function stopMapZoomAnimation() {
    if (state.mapZoomAnimationFrame) {
      cancelAnimationFrame(state.mapZoomAnimationFrame);
      state.mapZoomAnimationFrame = null;
    }
  }

  function animateMapViewportTo(targetViewport) {
    state.mapTargetViewport = clampMapViewport(targetViewport);
    stopMapZoomAnimation();

    const tick = () => {
      const current = state.mapViewport;
      const target = state.mapTargetViewport;
      const ease = 0.36;
      const next = {
        x: current.x + (target.x - current.x) * ease,
        y: current.y + (target.y - current.y) * ease,
        width: current.width + (target.width - current.width) * ease,
        height: current.height + (target.height - current.height) * ease,
      };

      const done =
        Math.abs(target.x - next.x) < 0.2 &&
        Math.abs(target.y - next.y) < 0.2 &&
        Math.abs(target.width - next.width) < 0.2 &&
        Math.abs(target.height - next.height) < 0.2;

      state.mapViewport = done ? { ...target } : next;
      applyMapViewport();

      if (done) {
        state.mapZoomAnimationFrame = null;
        return;
      }

      state.mapZoomAnimationFrame = requestAnimationFrame(tick);
    };

    tick();
  }

  function resetMapViewport() {
    state.mapViewport = { x: 0, y: 0, width: 1000, height: 520 };
    state.mapTargetViewport = { ...state.mapViewport };
    applyMapViewport();
  }

  function updateMapZoomUI() {
    const isZoomed = state.mapViewport.width < 999.5;
    els.mapPanel?.classList.toggle("is-map-zoomed", isZoomed);
  }

  function zoomMapAt(scaleFactor, originRatioX = 0.5, originRatioY = 0.5, smooth = false) {
    const current = clampMapViewport(smooth ? state.mapTargetViewport : state.mapViewport);
    const nextWidth = current.width / scaleFactor;
    const nextHeight = nextWidth * 0.52;
    const originX = current.x + current.width * originRatioX;
    const originY = current.y + current.height * originRatioY;

    const nextViewport = clampMapViewport({
      x: originX - nextWidth * originRatioX,
      y: originY - nextHeight * originRatioY,
      width: nextWidth,
      height: nextHeight,
    });

    if (smooth) {
      animateMapViewportTo(nextViewport);
      return;
    }

    state.mapViewport = nextViewport;
    state.mapTargetViewport = { ...nextViewport };
    applyMapViewport();
  }

  function initMapInteractions() {
    if (els.worldMap.dataset.bound === "1") return;
    els.worldMap.dataset.bound = "1";

    els.mapZoomIn?.addEventListener("click", () => zoomMapAt(1.22, 0.5, 0.5, true));
    els.mapZoomOut?.addEventListener("click", () => zoomMapAt(1 / 1.22, 0.5, 0.5, true));
    els.mapResetView?.addEventListener("click", resetMapViewport);

    els.worldMap.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        stopMapZoomAnimation();
        state.mapTargetViewport = { ...state.mapViewport };
        const rect = els.worldMap.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const originRatioX = (event.clientX - rect.left) / rect.width;
        const originRatioY = (event.clientY - rect.top) / rect.height;
        zoomMapAt(event.deltaY < 0 ? 1.1 : 1 / 1.1, originRatioX, originRatioY, false);
      },
      { passive: false },
    );

    els.worldMap.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      stopMapZoomAnimation();
      state.mapTargetViewport = { ...state.mapViewport };
      els.mapTooltip.classList.add("hidden");
      state.mapDrag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        viewport: { ...state.mapViewport },
        moved: false,
      };
    });

    els.worldMap.addEventListener("pointermove", (event) => {
      if (!state.mapDrag || state.mapDrag.pointerId !== event.pointerId) return;

      const rect = els.worldMap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dx = event.clientX - state.mapDrag.startX;
      const dy = event.clientY - state.mapDrag.startY;
      if (!state.mapDrag.moved && Math.hypot(dx, dy) > 4) {
        state.mapDrag.moved = true;
        els.worldMap.setPointerCapture?.(event.pointerId);
        els.mapStage?.classList.add("is-dragging");
      }

      if (!state.mapDrag.moved) return;

      state.mapViewport = clampMapViewport({
        x: state.mapDrag.viewport.x - (dx / rect.width) * state.mapDrag.viewport.width,
        y: state.mapDrag.viewport.y - (dy / rect.height) * state.mapDrag.viewport.height,
        width: state.mapDrag.viewport.width,
        height: state.mapDrag.viewport.height,
      });
      state.mapTargetViewport = { ...state.mapViewport };
      applyMapViewport();
    });

    const finishMapDrag = (event) => {
      if (!state.mapDrag || (event?.pointerId && state.mapDrag.pointerId !== event.pointerId)) return;
      if (state.mapDrag.moved) {
        state.suppressMapClickUntil = Date.now() + 220;
      }
      els.mapStage?.classList.remove("is-dragging");
      state.mapDrag = null;
    };

    els.worldMap.addEventListener("pointerup", finishMapDrag);
    els.worldMap.addEventListener("pointercancel", finishMapDrag);
    els.worldMap.addEventListener("pointerleave", (event) => {
      if (state.mapDrag?.pointerId === event.pointerId) finishMapDrag(event);
    });
  }

  function renderMapDefinition() {
    if (state.module === "risk") {
      els.mapDefinition.textContent = "";
      els.mapDefinition.classList.add("hidden");
      return;
    }

    els.mapDefinition.textContent = "";
    els.mapDefinition.classList.add("hidden");
  }

  function drawMap(product) {
    const { styleMap, legend, title, kicker, caption } = getModuleCountryStyles(product);
    renderYearSwitcher(product);
    renderLegend(legend);
    els.mapKicker.textContent = kicker;
    els.mapTitle.textContent = title;
    renderMapDefinition();
    els.mapCaption.textContent = caption;
    els.worldMap.innerHTML = "";

    if (!state.geoJson) {
      els.worldMap.innerHTML = '<text x="500" y="260" text-anchor="middle" fill="#627061" font-size="18">地图数据加载中...</text>';
      els.mapFocus.innerHTML = "";
      return;
    }

    state.selectedCountry = getSelectedCountry(product);
    drawMapBackdrop();

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
        if (Date.now() < state.suppressMapClickUntil) return;
        const next = resolveCountryKey(mapName, [
          ...Object.keys(product.imports),
          ...Object.keys(product.producers),
          ...Object.keys(product.risk),
          ...(product.alternatives.shortTerm || []).map((item) => item.country),
          ...(product.alternatives.longTerm || []).map((item) => item.country),
        ]);
        if (next) {
          state.selectedCountry = next;
          if (state.module === "alternative" && state.alternativeFlowMode) {
            render();
            return;
          }
          updateMapSelection(product);
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
    const validEntries = values
      .map((value, index) => ({ value, year: years[index] }))
      .filter((entry) => entry.value !== null && entry.value !== undefined && Number.isFinite(Number(entry.value)));
    if (!validEntries.length) return '<div class="chart-caption">暂无数据</div>';

    const chartValues = validEntries.map((entry) => Number(entry.value));
    const chartYears = validEntries.map((entry) => entry.year);
    const compact = options.compact === true;
    const showAllYears = options.showAllYears === true;
    const rotateXLabels = showAllYears && chartYears.length > 10;
    const width = options.width || (compact ? 280 : 320);
    const format = options.format || "raw";
    const label = options.label || "数值";
    const strokeWidth = compact ? 2 : 2.8;
    const dotRadius = compact ? 2.4 : 3.4;
    const hitRadius = compact ? 8 : 11;
    const yFontSize = compact ? 7 : 9;
    const xFontSize = compact ? 7 : 9.5;
    const yAxis = buildChartYAxis(chartValues, format);
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
    const stepX = innerWidth / Math.max(1, chartYears.length - 1);
    const plotBottom = padding.top + innerHeight;

    const pointData = chartValues.map((value, index) => {
      const x = padding.left + stepX * index;
      const y = plotBottom - ((value - axisMin) / axisRange) * innerHeight;
      return {
        x,
        y,
        value,
        year: chartYears[index],
        formatted: formatChartValue(value, format),
      };
    });

    const linePath = buildSmoothLinePath(pointData);
    const areaPath = pointData.length >= 2 ? buildAreaPath(pointData, plotBottom) : "";
    const chartId = `chart-${++chartInstanceId}`;
    const densePoints = chartYears.length > 12;
    const showPointMarkers = !densePoints || chartYears.length <= 6;

    const visibleDots = showPointMarkers
      ? pointData
          .map(
            (point, index) =>
              `<circle class="chart-point" data-index="${index}" cx="${point.x}" cy="${point.y}" r="${dotRadius}" fill="${color}" stroke="#fff" stroke-width="${compact ? 1.2 : 1.5}" style="--point-index:${index}; --point-count:${pointData.length};"></circle>`,
          )
          .join("")
      : pointData
          .map(
            (point, index) =>
              `<circle class="chart-point chart-point--hover-only" data-index="${index}" cx="${point.x}" cy="${point.y}" r="${dotRadius}" fill="${color}" stroke="#fff" stroke-width="1.2" style="--point-index:${index}; --point-count:${pointData.length};"></circle>`,
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
      ? chartYears
          .map((year, index) => {
            const x = padding.left + stepX * index;
            const yearLabel = String(year);
            if (rotateXLabels) {
              const labelY = plotBottom + padding.xAnchorOffset;
              return `<text class="chart-axis-label chart-axis-label--x" x="${x}" y="${labelY}" text-anchor="end" font-size="${xFontSize}" fill="#7a8778" transform="rotate(-45 ${x} ${labelY})">${yearLabel}</text>`;
            }
            let anchor = "middle";
            if (index === 0) anchor = "start";
            else if (index === chartYears.length - 1) anchor = "end";
            return `<text class="chart-axis-label" x="${x}" y="${plotBottom + padding.bottom - 4}" text-anchor="${anchor}" font-size="${xFontSize}" fill="#7a8778">${yearLabel}</text>`;
          })
          .join("")
      : chartYears
          .filter((_, index) => index === 0 || index === chartYears.length - 1 || index === Math.floor(chartYears.length / 2))
          .map((year) => {
            const index = chartYears.indexOf(year);
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
            <clipPath id="${chartId}-reveal">
              <rect class="chart-reveal-window" x="${padding.left}" y="${padding.top}" width="${innerWidth}" height="${innerHeight}"></rect>
            </clipPath>
          </defs>
          <rect class="chart-plot-bg" x="${padding.left}" y="${padding.top}" width="${innerWidth}" height="${innerHeight}" rx="${compact ? 8 : 10}"></rect>
          ${guides}
          <line class="chart-axis-line" x1="${padding.left}" y1="${plotBottom}" x2="${width - padding.right}" y2="${plotBottom}"></line>
          ${yLabels}
          <line class="chart-hover-line" x1="0" y1="${padding.top}" x2="0" y2="${plotBottom}" stroke="${color}" stroke-width="1.2" stroke-dasharray="4 4" opacity="0"></line>
          <g class="chart-series" clip-path="url(#${chartId}-reveal)">
            ${areaPath ? `<path class="chart-area" d="${areaPath}" fill="url(#${chartId}-area)" pathLength="1"></path>` : ""}
            <path class="chart-line" d="${linePath}" fill="none" stroke="url(#${chartId}-line)" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" pathLength="1"></path>
            ${pointHalos}
            ${visibleDots}
            ${hitDots}
          </g>
          ${labels}
        </svg>
      </div>
    `;
  }

  function makeRadarChart(seriesList, options = {}) {
    const size = options.size || 320;
    const center = size / 2;
    const outerRadius = options.radius || 104;
    const axes = options.axes || ["D 破坏性", "T 传播性", "V 脆弱性"];
    const levels = options.levels || 4;
    const maxValue = options.maxValue || Math.max(
      3,
      ...seriesList.flatMap((series) => series.values.map((value) => Number(value) || 0)),
    );
    const angleStep = (Math.PI * 2) / axes.length;

    const axisPoints = axes.map((_, index) => {
      const angle = -Math.PI / 2 + angleStep * index;
      return {
        x: center + Math.cos(angle) * outerRadius,
        y: center + Math.sin(angle) * outerRadius,
        angle,
      };
    });

    const gridPolygons = Array.from({ length: levels }, (_, levelIndex) => {
      const ratio = (levelIndex + 1) / levels;
      const points = axisPoints
        .map((point) => `${(center + Math.cos(point.angle) * outerRadius * ratio).toFixed(2)},${(center + Math.sin(point.angle) * outerRadius * ratio).toFixed(2)}`)
        .join(" ");
      return `<polygon class="radar-grid" points="${points}"></polygon>`;
    }).join("");

    const axisLines = axisPoints
      .map((point) => `<line class="radar-axis" x1="${center}" y1="${center}" x2="${point.x}" y2="${point.y}"></line>`)
      .join("");

    const axisLabels = axisPoints
      .map((point, index) => {
        const labelX = center + Math.cos(point.angle) * (outerRadius + 28);
        const labelY = center + Math.sin(point.angle) * (outerRadius + 28);
        return `<text class="radar-label" x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle">${axes[index]}</text>`;
      })
      .join("");

    const rings = Array.from({ length: levels }, (_, levelIndex) => {
      const value = ((maxValue / levels) * (levelIndex + 1)).toFixed(2);
      return `<text class="radar-ring-label" x="${center + 8}" y="${center - (outerRadius * (levelIndex + 1)) / levels + 2}">${value}</text>`;
    }).join("");

    const seriesMarkup = seriesList
      .map((series) => {
        const points = series.values.map((value, index) => {
          const safeValue = Math.max(0, Number(value) || 0);
          const ratio = Math.min(1, safeValue / maxValue);
          const point = axisPoints[index];
          return {
            x: center + Math.cos(point.angle) * outerRadius * ratio,
            y: center + Math.sin(point.angle) * outerRadius * ratio,
            value: safeValue,
          };
        });

        const polygon = points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
        const dots = points
          .map(
            (point, index) =>
              `<circle class="radar-point" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="3.5" fill="${series.color}" data-year="${series.label}" data-label="${axes[index]}" data-value="${point.value.toFixed(4)}"></circle>`,
          )
          .join("");

        return `
          <g class="radar-series">
            <polygon class="radar-area" points="${polygon}" fill="${series.color}" fill-opacity="0.12" stroke="${series.color}" stroke-width="2"></polygon>
            ${dots}
          </g>
        `;
      })
      .join("");

    const legend = seriesList
      .map(
        (series) => `
          <div class="radar-legend-item">
            <span class="radar-legend-dot" style="background:${series.color};"></span>
            <span>${series.label}</span>
          </div>
        `,
      )
      .join("");

    return `
      <div class="radar-chart-wrap">
        <svg class="radar-svg" viewBox="0 0 ${size} ${size}" aria-hidden="true">
          ${gridPolygons}
          ${axisLines}
          ${rings}
          ${seriesMarkup}
          ${axisLabels}
        </svg>
        <div class="radar-legend">${legend}</div>
      </div>
    `;
  }

  function makeRadarChart(seriesList, options = {}) {
    const size = options.size || 320;
    const center = size / 2;
    const outerRadius = options.radius || 104;
    const axes = options.axes || ["D", "T", "V"];
    const levels = options.levels || 4;
    const showLegend = options.showLegend !== false;
    const showPoints = options.showPoints !== false;
    const showValueLabels = options.showValueLabels === true;
    const coloredPoints = options.coloredPoints === true;
    const labelOffset = options.labelOffset || 26;
    const wrapClassName = options.className ? `radar-chart-wrap ${options.className}` : "radar-chart-wrap";
    const maxValue = options.maxValue || Math.max(3, ...seriesList.flatMap((series) => series.values.map((value) => Number(value) || 0)));
    const angleStep = (Math.PI * 2) / axes.length;
    const axisColors = options.axisColors || ["#b93e34", "#d2a543", "#1f6b45"];
    const uid = `radar-${Math.random().toString(36).slice(2, 9)}`;

    const axisPoints = axes.map((_, index) => {
      const angle = -Math.PI / 2 + angleStep * index;
      return {
        x: center + Math.cos(angle) * outerRadius,
        y: center + Math.sin(angle) * outerRadius,
        angle,
      };
    });

    const gridPolygons = Array.from({ length: levels }, (_, levelIndex) => {
      const ratio = (levelIndex + 1) / levels;
      const points = axisPoints
        .map((point) => `${(center + Math.cos(point.angle) * outerRadius * ratio).toFixed(2)},${(center + Math.sin(point.angle) * outerRadius * ratio).toFixed(2)}`)
        .join(" ");
      const toneClass = levelIndex % 2 === 0 ? "radar-grid radar-grid--soft" : "radar-grid radar-grid--tone";
      return `<polygon class="${toneClass}" points="${points}"></polygon>`;
    }).join("");

    const axisLines = axisPoints
      .map((point) => `<line class="radar-axis" x1="${center}" y1="${center}" x2="${point.x}" y2="${point.y}"></line>`)
      .join("");

    const axisLabels = axisPoints
      .map((point, index) => {
        const labelX = center + Math.cos(point.angle) * (outerRadius + labelOffset);
        const labelY = center + Math.sin(point.angle) * (outerRadius + labelOffset);
        const color = axisColors[index % axisColors.length];
        return `
          <g class="radar-label-group">
            <circle class="radar-label-badge" cx="${labelX}" cy="${labelY.toFixed(2)}" r="13" fill="${color}"></circle>
            <text class="radar-label radar-label--on-badge" x="${labelX}" y="${(labelY + 0.5).toFixed(2)}" text-anchor="middle" dominant-baseline="middle">${axes[index]}</text>
          </g>
        `;
      })
      .join("");

    const rings = Array.from({ length: levels }, (_, levelIndex) => {
      const value = ((maxValue / levels) * (levelIndex + 1)).toFixed(1);
      return `<text class="radar-ring-label" x="${center + 10}" y="${center - (outerRadius * (levelIndex + 1)) / levels + 3}">${value}</text>`;
    }).join("");

    const seriesMarkup = seriesList
      .map((series, seriesIndex) => {
        const fillId = `${uid}-fill-${seriesIndex}`;
        const points = series.values.map((value, index) => {
          const safeValue = Math.max(0, Number(value) || 0);
          const ratio = Math.min(1, safeValue / maxValue);
          const point = axisPoints[index];
          return {
            x: center + Math.cos(point.angle) * outerRadius * ratio,
            y: center + Math.sin(point.angle) * outerRadius * ratio,
            value: safeValue,
            angle: point.angle,
            color: coloredPoints ? axisColors[index % axisColors.length] : series.color,
          };
        });

        const polygon = points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");
        const dots = showPoints
          ? points
              .map((point, index) => {
                const labelDistance = showValueLabels ? 16 : 0;
                const labelX = point.x + Math.cos(point.angle) * labelDistance;
                const labelY = point.y + Math.sin(point.angle) * labelDistance;
                const valueLabel = showValueLabels
                  ? `
                    <g class="radar-value-group">
                      <rect class="radar-value-chip" x="${(labelX - 16).toFixed(2)}" y="${(labelY - 8).toFixed(2)}" width="32" height="16" rx="8"></rect>
                      <text class="radar-value-label" x="${labelX.toFixed(2)}" y="${(labelY + 1).toFixed(2)}" text-anchor="middle" dominant-baseline="middle">${point.value.toFixed(2)}</text>
                    </g>
                  `
                  : "";
                return `
                  <g class="radar-point-group">
                    <circle class="radar-point-halo" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="9.5" fill="${point.color}"></circle>
                    <circle class="radar-point" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="4.6" fill="${point.color}" data-year="${series.label}" data-label="${axes[index]}" data-value="${point.value.toFixed(4)}"></circle>
                    ${valueLabel}
                  </g>
                `;
              })
              .join("")
          : "";

        return `
          <defs>
            <linearGradient id="${fillId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${series.color}" stop-opacity="0.28"></stop>
              <stop offset="100%" stop-color="${series.color}" stop-opacity="0.08"></stop>
            </linearGradient>
          </defs>
          <g class="radar-series">
            <polygon class="radar-area radar-area--glow" points="${polygon}" fill="${series.color}" fill-opacity="0.08" stroke="none"></polygon>
            <polygon class="radar-area" points="${polygon}" fill="url(#${fillId})" stroke="${series.color}" stroke-width="2.6" stroke-linejoin="round"></polygon>
            ${dots}
          </g>
        `;
      })
      .join("");

    const legend = showLegend
      ? seriesList
          .map(
            (series) => `
              <div class="radar-legend-item">
                <span class="radar-legend-dot" style="background:${series.color};"></span>
                <span>${series.label}</span>
              </div>
            `,
          )
          .join("")
      : "";

    return `
      <div class="${wrapClassName}">
        <svg class="radar-svg radar-svg--single-year" viewBox="0 0 ${size} ${size}" aria-hidden="true">
          <defs>
            <radialGradient id="${uid}-glow" cx="50%" cy="42%" r="58%">
              <stop offset="0%" stop-color="rgba(31, 107, 69, 0.14)"></stop>
              <stop offset="55%" stop-color="rgba(31, 107, 69, 0.05)"></stop>
              <stop offset="100%" stop-color="rgba(31, 107, 69, 0)"></stop>
            </radialGradient>
          </defs>
          <circle class="radar-glow" cx="${center}" cy="${center}" r="${outerRadius + 18}" fill="url(#${uid}-glow)"></circle>
          <circle class="radar-frame" cx="${center}" cy="${center}" r="${outerRadius + 10}"></circle>
          ${gridPolygons}
          ${axisLines}
          ${rings}
          ${seriesMarkup}
          ${axisLabels}
        </svg>
        ${showLegend ? `<div class="radar-legend">${legend}</div>` : ""}
      </div>
    `;
  }

  function getModalParts() {
    return {
      panel: els.detailModal.querySelector(".modal-panel"),
      body: els.detailModalBody,
      backdrop: els.detailModal.querySelector(".modal-backdrop"),
    };
  }

  function clearModalAnimations() {
    modalTransitionState.panelAnimation?.cancel();
    modalTransitionState.bodyAnimation?.cancel();
    modalTransitionState.backdropAnimation?.cancel();
    modalTransitionState.panelAnimation = null;
    modalTransitionState.bodyAnimation = null;
    modalTransitionState.backdropAnimation = null;
  }

  function openDetailModal(content, sourceEl) {
    const { panel, body, backdrop } = getModalParts();
    clearModalAnimations();
    modalTransitionState.sourceEl = sourceEl || null;

    els.detailModalBody.innerHTML = content;
    els.detailModal.classList.remove("hidden");
    els.detailModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (!panel || !body || !backdrop) return;

    panel.style.transformOrigin = "top left";
    const finalRect = panel.getBoundingClientRect();
    const sourceRect = sourceEl?.getBoundingClientRect();

    if (!sourceRect || sourceRect.width <= 0 || sourceRect.height <= 0) {
      modalTransitionState.backdropAnimation = backdrop.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 220, easing: "ease-out", fill: "both" },
      );
      modalTransitionState.bodyAnimation = body.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 260, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
      );
      return;
    }

    const translateX = sourceRect.left - finalRect.left;
    const translateY = sourceRect.top - finalRect.top;
    const scaleX = sourceRect.width / finalRect.width;
    const scaleY = sourceRect.height / finalRect.height;

    modalTransitionState.backdropAnimation = backdrop.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 360, easing: "ease-out", fill: "both" },
    );
    modalTransitionState.panelAnimation = panel.animate(
      [
        {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
          borderRadius: "18px",
          boxShadow: "0 16px 34px rgba(34, 51, 39, 0.12)",
        },
        {
          transform: "translate(0, 0) scale(1, 1)",
          borderRadius: "28px",
          boxShadow: "0 30px 80px rgba(17, 27, 20, 0.24)",
        },
      ],
      { duration: 460, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" },
    );
    modalTransitionState.bodyAnimation = body.animate(
      [
        { opacity: 0, transform: "translateY(12px) scale(0.985)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      { duration: 300, delay: 120, easing: "ease-out", fill: "both" },
    );
  }

  function closeDetailModal() {
    if (els.detailModal.classList.contains("hidden")) return;

    const { panel, body, backdrop } = getModalParts();
    const sourceEl = modalTransitionState.sourceEl;
    const sourceRect = sourceEl?.isConnected ? sourceEl.getBoundingClientRect() : null;
    const finalRect = panel?.getBoundingClientRect();

    clearModalAnimations();

    const finishClose = () => {
      els.detailModal.classList.add("hidden");
      els.detailModal.setAttribute("aria-hidden", "true");
      els.detailModalBody.innerHTML = "";
      document.body.style.overflow = "";
      modalTransitionState.sourceEl = null;
    };

    if (!panel || !body || !backdrop || !sourceRect || !finalRect || sourceRect.width <= 0 || sourceRect.height <= 0) {
      finishClose();
      return;
    }

    const translateX = sourceRect.left - finalRect.left;
    const translateY = sourceRect.top - finalRect.top;
    const scaleX = sourceRect.width / finalRect.width;
    const scaleY = sourceRect.height / finalRect.height;

    modalTransitionState.backdropAnimation = backdrop.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 300, easing: "ease-in", fill: "both" },
    );
    modalTransitionState.bodyAnimation = body.animate(
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: 0, transform: "translateY(8px) scale(0.985)" },
      ],
      { duration: 180, easing: "ease-in", fill: "both" },
    );
    modalTransitionState.panelAnimation = panel.animate(
      [
        {
          transform: "translate(0, 0) scale(1, 1)",
          borderRadius: "28px",
          boxShadow: "0 30px 80px rgba(17, 27, 20, 0.24)",
        },
        {
          transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`,
          borderRadius: "18px",
          boxShadow: "0 16px 34px rgba(34, 51, 39, 0.12)",
        },
      ],
      { duration: 380, easing: "cubic-bezier(0.55, 0, 0.45, 1)", fill: "both" },
    );
    modalTransitionState.panelAnimation.addEventListener("finish", finishClose, { once: true });
  }

  function buildProducerDetailModal(product, country) {
    const producerKey = resolveCountryKey(country, product.producers);
    const producer = producerKey ? product.producers[producerKey] : null;
    const importKey = resolveCountryKey(country, product.imports);
    const importer = importKey ? product.imports[importKey] : null;
    const years = product.years;
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || years.at(yearIndex));

    if (!producer) {
      return `
        <div class="modal-content modal-content--empty">
          <div class="modal-header">
            <div>
              <p class="panel-kicker">Production Detail</p>
              <h3 class="modal-title" id="detailModalTitle">${labelCountry(country)}生产数据</h3>
              <p class="modal-copy">当前国家暂无可展开的生产趋势数据，请切换其他国家查看。</p>
            </div>
          </div>
        </div>
      `;
    }

    const summaryCards = [
      { label: `${selectedYear}产量`, value: formatOptionalSeriesValue(producer.output, yearIndex, formatMt) },
      { label: `${selectedYear}面积`, value: formatOptionalSeriesValue(producer.area, yearIndex, (value) => formatChartValue(value, "area")) },
      { label: `${selectedYear}单产`, value: formatOptionalSeriesValue(producer.yield, yearIndex, (value) => formatChartValue(value, "yield")) },
      { label: `${selectedYear}对华进口`, value: importer ? formatOptionalSeriesValue(importer.volume, yearIndex, formatMt) : "暂无数据" },
    ];

    return `
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <p class="panel-kicker">Production Detail</p>
            <h3 class="modal-title" id="detailModalTitle">${labelCountry(country)}生产数据</h3>
            <p class="modal-copy">把关键指标和三张核心趋势图集中放在一屏里，优先保证信息密度和可读性。</p>
          </div>
          <div class="modal-badge">${selectedYear} 年重点观察</div>
        </div>
        <div class="modal-metrics">
          ${summaryCards
            .map(
              (item) => `
                <article class="metric-card">
                  <div class="metric-label">${item.label}</div>
                  <div class="metric-value">${item.value}</div>
                </article>
              `,
            )
            .join("")}
        </div>
        <div class="modal-chart-stack modal-chart-stack--triple">
          <article class="modal-chart-card">
            <h4>产量趋势</h4>
            <div class="single-chart single-chart--modal">
              ${makeLineChart(producer.output, years, "#1f6b45", { width: 332, height: 224, showAllYears: true, format: "mt", label: "产量" })}
            </div>
            <p class="modal-chart-note">反映供给体量与波动。</p>
          </article>
          <article class="modal-chart-card">
            <h4>种植面积趋势</h4>
            <div class="single-chart single-chart--modal">
              ${makeLineChart(producer.area, years, "#4f8e60", { width: 332, height: 224, showAllYears: true, format: "area", label: "面积" })}
            </div>
            <p class="modal-chart-note">用于判断扩种空间。</p>
          </article>
          <article class="modal-chart-card">
            <h4>单产趋势</h4>
            <div class="single-chart single-chart--modal">
              ${makeLineChart(producer.yield, years, "#d2a543", { width: 332, height: 224, showAllYears: true, format: "yield", label: "单产" })}
            </div>
            <p class="modal-chart-note">反映效率与气候影响。</p>
          </article>
        </div>
      </div>
    `;
  }

  function buildImportDetailModal(product, country, modalKind) {
    const importKey = resolveCountryKey(country, product.imports);
    const importer = importKey ? product.imports[importKey] : null;
    const years = product.years;
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || years.at(yearIndex));
    const volumeValues = getAvailableSeriesValues(importer?.volume);
    const priceValues = getAvailableSeriesValues(importer?.price);
    const dependencyValues = getAvailableSeriesValues(importer?.dependency);

    const configMap = {
      import_volume: {
        title: "中国自该国进口量走势",
        color: "#1f6b45",
        format: "mt",
        label: "进口量",
        series: importer?.volume || [],
        note: "用于观察中国自该来源国进口规模的长期变化。",
        stats: importer
          ? [
              { label: `${selectedYear}进口量`, value: formatOptionalSeriesValue(importer.volume, yearIndex, formatMt) },
              { label: "近年峰值", value: volumeValues.length ? formatMt(Math.max(...volumeValues)) : "暂无数据" },
              { label: "近年均值", value: volumeValues.length ? formatMt(volumeValues.reduce((sum, value) => sum + value, 0) / volumeValues.length) : "暂无数据" },
            ]
          : [],
      },
      import_price: {
        title: "中国自该国进口价格走势",
        color: "#d2a543",
        format: "price",
        label: "价格",
        series: importer?.price || [],
        note: "用于观察该来源国对华进口价格的波动与抬升区间。",
        stats: importer
          ? [
              { label: `${selectedYear}价格`, value: formatOptionalSeriesValue(importer.price, yearIndex, (value) => `${Number(value).toFixed(0)} 美元/吨`) },
              { label: "近年峰值", value: priceValues.length ? `${Math.max(...priceValues).toFixed(0)} 美元/吨` : "暂无数据" },
              { label: "近年均值", value: priceValues.length ? `${(priceValues.reduce((sum, value) => sum + value, 0) / priceValues.length).toFixed(0)} 美元/吨` : "暂无数据" },
            ]
          : [],
      },
      import_dependency: {
        title: "中国对该国进口依赖度变化",
        color: "#b93e34",
        format: "percent",
        label: "依赖度",
        series: importer ? importer.dependency.map((value) => value === null ? null : value * 100) : [],
        note: "用于判断中国对该来源国进口依赖是否在持续升高或回落。",
        stats: importer
          ? [
              { label: `${selectedYear}依赖度`, value: formatOptionalSeriesValue(importer.dependency, yearIndex, formatPct) },
              { label: "近年峰值", value: dependencyValues.length ? `${(Math.max(...dependencyValues) * 100).toFixed(1)}%` : "暂无数据" },
              { label: "近年均值", value: dependencyValues.length ? `${(dependencyValues.reduce((sum, value) => sum + value, 0) * 100 / dependencyValues.length).toFixed(1)}%` : "暂无数据" },
            ]
          : [],
      },
    };

    const config = configMap[modalKind];
    if (!importer || !config) {
      return `
        <div class="modal-content modal-content--empty">
          <div class="modal-header">
            <div>
              <p class="panel-kicker">Trade Detail</p>
              <h3 class="modal-title" id="detailModalTitle">${labelCountry(country)}进口趋势</h3>
              <p class="modal-copy">当前国家暂无可展开的进口趋势数据，请切换其他国家查看。</p>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="modal-content modal-content--single-chart">
        <div class="modal-header">
          <div>
            <p class="panel-kicker">Trade Detail</p>
            <h3 class="modal-title" id="detailModalTitle">${config.title}</h3>
            <p class="modal-copy">${labelCountry(country)} 的这项进口指标已展开为大图，便于更清楚地观察年度变化过程。</p>
          </div>
          <div class="modal-badge">${selectedYear} 年重点观察</div>
        </div>
        <div class="modal-metrics modal-metrics--triple">
          ${config.stats
            .map(
              (item) => `
                <article class="metric-card">
                  <div class="metric-label">${item.label}</div>
                  <div class="metric-value">${item.value}</div>
                </article>
              `,
            )
            .join("")}
        </div>
        <div class="modal-chart-stack">
          <article class="modal-chart-card modal-chart-card--wide">
            <h4>${config.title}</h4>
            <div class="single-chart single-chart--modal">
              ${makeLineChart(config.series, years, config.color, { width: 980, height: 360, showAllYears: true, format: config.format, label: config.label })}
            </div>
            <p class="modal-chart-note">${config.note}</p>
          </article>
        </div>
      </div>
    `;
  }

  function initModalInteractions() {
    if (els.detailModal.dataset.bound === "1") return;
    els.detailModal.dataset.bound = "1";

    els.detailModal.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-modal='true']") || event.target === els.detailModalClose) {
        closeDetailModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !els.detailModal.classList.contains("hidden")) {
        closeDetailModal();
      }
    });

    els.chartStack.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-open-detail-modal]");
      if (!trigger) return;

      const product = getProduct();
      const country = getSelectedCountry(product);
      if (!country) return;

      const modalKind = trigger.getAttribute("data-open-detail-modal");
      const modalContent =
        modalKind === "producer"
          ? buildProducerDetailModal(product, country)
          : buildImportDetailModal(product, country, modalKind);
      openDetailModal(modalContent, trigger);
    });

    els.chartStack.addEventListener("keydown", (event) => {
      const trigger = event.target.closest("[data-open-detail-modal]");
      if (!trigger || (event.key !== "Enter" && event.key !== " ")) return;

      event.preventDefault();
      const product = getProduct();
      const country = getSelectedCountry(product);
      if (!country) return;

      const modalKind = trigger.getAttribute("data-open-detail-modal");
      const modalContent =
        modalKind === "producer"
          ? buildProducerDetailModal(product, country)
          : buildImportDetailModal(product, country, modalKind);
      openDetailModal(modalContent, trigger);
    });
  }

  function enhanceOverviewProducerCard() {
    const overviewCard = els.chartStack.querySelector(".chart-card");
    if (!overviewCard) return;

    overviewCard.classList.add("chart-card--interactive");
    overviewCard.setAttribute("data-open-detail-modal", "producer");
    overviewCard.setAttribute("role", "button");
    overviewCard.setAttribute("tabindex", "0");
    overviewCard.setAttribute("aria-label", "查看该国生产数据大图");

    const title = overviewCard.querySelector("h4");
    if (title && !overviewCard.querySelector(".chart-expand-hint")) {
      const header = document.createElement("div");
      header.className = "chart-card-head";
      title.parentNode.insertBefore(header, title);
      header.appendChild(title);

      const hint = document.createElement("span");
      hint.className = "chart-expand-hint";
      hint.textContent = "点击查看大图";
      header.appendChild(hint);
    }
  }

  function enhanceOverviewTrendCards() {
    const trendCards = Array.from(els.chartStack.querySelectorAll(".chart-card--trend"));
    const modalKinds = ["import_volume", "import_price", "import_dependency"];

    trendCards.forEach((card, index) => {
      const modalKind = modalKinds[index];
      if (!modalKind) return;

      card.classList.add("chart-card--interactive", "chart-card--trend-mini");
      card.setAttribute("data-open-detail-modal", modalKind);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "查看该进口趋势大图");

      const title = card.querySelector("h4");
      if (title && !card.querySelector(".chart-expand-hint")) {
        const header = document.createElement("div");
        header.className = "chart-card-head";
        title.parentNode.insertBefore(header, title);
        header.appendChild(title);

        const hint = document.createElement("span");
        hint.className = "chart-expand-hint";
        hint.textContent = "点击查看大图";
        header.appendChild(hint);
      }
    });
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
        <div class="detail-chip-value">${producer ? formatOptionalSeriesValue(producer.output, yearIndex, formatMt) : "暂无数据"}</div>
      </article>
      <article class="detail-chip">
        <div class="detail-chip-label">${selectedYear}进口量</div>
        <div class="detail-chip-value">${importer ? formatOptionalSeriesValue(importer.volume, yearIndex, formatMt) : "暂无数据"}</div>
      </article>
      <article class="detail-chip">
        <div class="detail-chip-label">${selectedYear}价格</div>
        <div class="detail-chip-value">${importer ? formatOptionalSeriesValue(importer.price, yearIndex, (value) => `${Number(value).toFixed(0)} 美元/吨`) : "暂无数据"}</div>
      </article>
      <article class="detail-chip">
        <div class="detail-chip-label">${selectedYear}依赖度</div>
        <div class="detail-chip-value">${importer ? formatOptionalSeriesValue(importer.dependency, yearIndex, formatPct) : "暂无数据"}</div>
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
      <article class="chart-card chart-card--trend chart-card--trend-mini">
        <h4>中国自该国进口量走势</h4>
        <div class="single-chart single-chart--compact">
          ${importer ? makeLineChart(importer.volume, years, "#1f6b45", { compact: true, showAllYears: true, format: "mt", label: "进口量" }) : '<div class="chart-caption">暂无数据</div>'}
        </div>
      </article>
      <article class="chart-card chart-card--trend chart-card--trend-mini">
        <h4>中国自该国进口价格走势</h4>
        <div class="single-chart single-chart--compact">
          ${importer ? makeLineChart(importer.price, years, "#d2a543", { compact: true, showAllYears: true, format: "price", label: "价格" }) : '<div class="chart-caption">暂无数据</div>'}
        </div>
      </article>
      <article class="chart-card chart-card--trend chart-card--trend-mini">
        <h4>中国对该国进口依赖度变化</h4>
        <div class="single-chart single-chart--compact">
          ${importer ? makeLineChart(importer.dependency.map((value) => value === null ? null : value * 100), years, "#b93e34", { compact: true, showAllYears: true, format: "percent", label: "依赖度" }) : '<div class="chart-caption">暂无数据</div>'}
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

  function renderRiskSide(product, country) {
    const riskKey = resolveCountryKey(country, product.risk);
    const risk = riskKey ? product.risk[riskKey] : null;
    const riskYears = ["2022", "2023", "2024"];

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = risk ? riskMeta(risk.level).label : "无数据";
    els.detailBadge.style.background = risk ? `${riskMeta(risk.level).color}22` : "rgba(0,0,0,0.06)";

    els.detailHighlights.innerHTML = risk
      ? `
        ${riskYears
          .map((year) => {
            const metrics = getRiskDtvByYear(risk, year);
            return `
              <article class="detail-chip detail-chip--risk-year">
                <div class="detail-chip-label">${year}</div>
                <div class="detail-chip-metrics">
                  <span>D ${formatRiskMetric(metrics.d)}</span>
                  <span>T ${formatRiskMetric(metrics.t)}</span>
                  <span>V ${formatRiskMetric(metrics.v)}</span>
                </div>
              </article>
            `;
          })
          .join("")}
        <article class="detail-chip">
          <div class="detail-chip-label">CI 三年均值</div>
          <div class="detail-chip-value">${risk.score.toFixed(4)}</div>
        </article>
      `
      : "";

    els.chartStack.innerHTML = risk
      ? `
        <article class="chart-card chart-card--trend">
          <h4>D / T / V 三年变化</h4>
          <div class="chart-subgrid">
            <div class="mini-chart">
              <div class="mini-chart-title">D 破坏性</div>
              ${makeLineChart(riskYears.map((year) => getRiskDtvByYear(risk, year).d), riskYears, "#1f6b45", { compact: true, showAllYears: true, format: "ci", label: "D" })}
            </div>
            <div class="mini-chart">
              <div class="mini-chart-title">T 传播性</div>
              ${makeLineChart(riskYears.map((year) => getRiskDtvByYear(risk, year).t), riskYears, "#d2a543", { compact: true, showAllYears: true, format: "ci", label: "T" })}
            </div>
            <div class="mini-chart">
              <div class="mini-chart-title">V 脆弱性</div>
              ${makeLineChart(riskYears.map((year) => getRiskDtvByYear(risk, year).v), riskYears, "#b93e34", { compact: true, showAllYears: true, format: "ci", label: "V" })}
            </div>
          </div>
        </article>
        <article class="chart-card">
          <h4>CI 风险解读</h4>
          <div class="single-chart risk-level-card">
            <div class="risk-level-value" style="color:${riskMeta(risk.level).color};">${riskMeta(risk.level).label}</div>
            <p class="chart-caption">CI 2022-2024: ${risk.ci2022.toFixed(4)} / ${risk.ci2023.toFixed(4)} / ${risk.ci2024.toFixed(4)}</p>
          </div>
        </article>
      `
      : `<article class="chart-card"><h4>暂无风险数据</h4><p class="chart-caption">请在地图中选择具有风险分级结果的国家。</p></article>`;
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
        <article class="detail-chip"><div class="detail-chip-label">CI 三年均值</div><div class="detail-chip-value">${risk.score.toFixed(4)}</div></article>
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
          <h4>CI 风险解读</h4>
          <div class="single-chart risk-level-card">
            <div class="risk-level-value" style="color:${riskMeta(risk.level).color};">${riskMeta(risk.level).label}</div>
            <p class="chart-caption">CI 2022-2024: ${risk.ci2022.toFixed(4)} / ${risk.ci2023.toFixed(4)} / ${risk.ci2024.toFixed(4)}</p>
          </div>
        </article>
      `
      : `<article class="chart-card"><h4>暂无风险数据</h4><p class="chart-caption">请在地图中选择具有风险分级结果的国家。</p></article>`;
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
      caption = "展示该国 2022-2024 年的 D 破坏性、T 传播性和 V 脆弱性三者数值，分年展示。";
    } else {
      const sourceCountry = getSelectedCountry(product);

      if (state.alternativeFlowMode && sourceCountry) {
        const candidates = getAlternativeReplacementCandidates(product, sourceCountry);
        candidates.forEach((item, index) => {
          const colors = ["#1f6b45", "#3c8b57", "#5e9e63", "#83b475", "#a7c78f", "#cad9af"];
          styleMap[item.country] = { fill: colors[index] || getAlternativeTierColor(item.tierLabel) };
        });
        hiddenCountries = [sourceCountry];
        replacementArrows = candidates.map((item) => ({
          from: sourceCountry,
          to: item.country,
          color: getAlternativeTierColor(item.tierLabel),
        }));
        legend = [
          { label: "替代起点国家", color: "#d8dfd8" },
          { label: "可替代且非高风险国家", color: palette.tier1 },
        ];
        title = `${labelCountry(sourceCountry)}替代流向模拟`;
        kicker = "替代演示";
        caption = `当前已隐藏 ${labelCountry(sourceCountry)}，并高亮 ${candidates.length} 个可承接替代需求且不属于高风险的候选国家。`;
      } else {
        const topCountries = getAlternativeTopCountries(product);
        topCountries.forEach((item) => {
          styleMap[item.country] = { fill: getAlternativeTierColor(item.tierLabel) };
        });
        const legendLabels = [...new Set(topCountries.map((item) => item.tierLabel).filter(Boolean))];
        legend = legendLabels.map((label) => ({ label, color: getAlternativeTierColor(label) }));
        title = `${getProductMeta(product.id).name}${getAlternativeModeLabel()}国家布局`;
        kicker = "替代视图";
        caption =
          state.alternativeHorizon === "long"
            ? "展示长期替代潜能前 10 个国家。鼠标悬停可查看长期替代潜能、风险等级与建议。"
            : "展示短期替代潜能前 10 个国家。鼠标悬停可查看短期替代潜能、风险等级与建议。";
      }
    }

    return { styleMap, legend, title, kicker, caption, hiddenCountries, replacementArrows };
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
    els.chartStack.className = "chart-stack";
    els.detailHighlights.className = "detail-highlights";
    els.sidePanel?.classList.toggle("side-panel--risk", state.module === "risk");
    els.detailBadge.style.color = "";
    els.detailBadge.style.borderColor = "";
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
      enhanceOverviewProducerCard();
      enhanceOverviewTrendCards();
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
      return Boolean(resolveCountryKey(dataCountry, [countryName]));
    });

    if (!targetShape) return null;

    try {
      const shapeRect = targetShape.getBoundingClientRect();
      const screenMatrix = els.worldMap.getScreenCTM();

      if (screenMatrix && shapeRect.width >= 0 && shapeRect.height >= 0) {
        const point = els.worldMap.createSVGPoint();
        point.x = shapeRect.left + shapeRect.width / 2;
        point.y = shapeRect.top + shapeRect.height / 2;
        const svgPoint = point.matrixTransform(screenMatrix.inverse());
        return [svgPoint.x, svgPoint.y];
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

  function drawMapBackdrop() {
    const gridLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gridLayer.setAttribute("class", "map-grid-layer");

    [120, 60, 0, -60, -120].forEach((lon, index) => {
      const [x] = projectPoint(lon, 0);
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(x));
      line.setAttribute("y1", "26");
      line.setAttribute("x2", String(x));
      line.setAttribute("y2", "494");
      line.setAttribute("class", `map-grid-line${lon === 0 ? " is-major" : ""}`);
      line.style.setProperty("--grid-index", String(index));
      gridLayer.appendChild(line);

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", String(x + 8));
      label.setAttribute("y", "42");
      label.setAttribute("class", "map-grid-label");
      label.style.setProperty("--grid-index", String(index));
      label.textContent = `${Math.abs(lon)}°${lon > 0 ? "E" : lon < 0 ? "W" : ""}`;
      gridLayer.appendChild(label);
    });

    [60, 30, 0, -30, -60].forEach((lat, index) => {
      const [, y] = projectPoint(0, lat);
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", "26");
      line.setAttribute("y1", String(y));
      line.setAttribute("x2", "974");
      line.setAttribute("y2", String(y));
      line.setAttribute("class", `map-grid-line${lat === 0 ? " is-major" : ""}`);
      line.style.setProperty("--grid-index", String(index + 5));
      gridLayer.appendChild(line);

      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", "34");
      label.setAttribute("y", String(y - 8));
      label.setAttribute("class", "map-grid-label");
      label.style.setProperty("--grid-index", String(index + 5));
      label.textContent = `${Math.abs(lat)}°${lat > 0 ? "N" : lat < 0 ? "S" : ""}`;
      gridLayer.appendChild(label);
    });

    els.worldMap.appendChild(gridLayer);
  }

  function drawMapFocusHalo(countries, styleMap) {
    const haloLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    haloLayer.setAttribute("class", "map-halo-layer");

    countries.forEach((country, index) => {
      const point = getCountryAnchor(country);
      if (!point) return;

      const baseColor = styleMap[country]?.fill || palette.primary;
      const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      halo.setAttribute("cx", String(point[0]));
      halo.setAttribute("cy", String(point[1]));
      halo.setAttribute("r", String(18 + index * 4));
      halo.setAttribute("fill", colorWithAlpha(baseColor, Math.max(0.08, 0.16 - index * 0.02)));
      halo.setAttribute("class", "map-halo");
      halo.style.setProperty("--halo-index", String(index));
      haloLayer.appendChild(halo);
    });

    els.worldMap.appendChild(haloLayer);
  }

  function renderMapFocus(product, styleMap) {
    els.mapFocus.innerHTML = "";
    return;

    if (state.module === "alternative") {
      els.mapFocus.innerHTML = "";
      return;
    }

    const country = getSelectedCountry(product);
    if (!country) {
      els.mapFocus.innerHTML = "";
      return;
    }

    const importInfo = product.imports?.[resolveCountryKey(country, product.imports)];
    const riskInfo = product.risk?.[resolveCountryKey(country, product.risk)];
    const shortItem = (product.alternatives.shortTerm || []).find(
      (item) => normalizeCountryName(item.country) === normalizeCountryName(country),
    );
    const longItem = (product.alternatives.longTerm || []).find(
      (item) => normalizeCountryName(item.country) === normalizeCountryName(country),
    );
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || product.years.at(yearIndex));
    const focusColor = styleMap[country]?.fill || palette.primary;

    let kicker = "Current Focus";
    let note = "";
    let stats = [];

    if (state.module === "overview") {
      kicker = `${selectedYear} Supply Snapshot`;
      stats = [
        { label: "进口量", value: importInfo ? formatMt(getSeriesValue(importInfo.volume, yearIndex) || 0) : "--" },
        { label: "依赖度", value: importInfo ? formatPct(getSeriesValue(importInfo.dependency, yearIndex) || 0) : "--" },
        { label: "价格", value: importInfo ? `${getSeriesValue(importInfo.price, yearIndex) || "--"} 美元/吨` : "--" },
        { label: "角色", value: "重点来源国" },
      ];
      note = `当前地图优先强调中国在 ${selectedYear} 年的主要进口来源和集中度变化。`;
    } else if (state.module === "risk") {
      kicker = "Risk Lens";
      stats = [
        { label: "风险级别", value: riskInfo ? riskMeta(riskInfo.level).label : "--" },
        { label: "CI 2024", value: riskInfo ? riskInfo.ci2024.toFixed(4) : "--" },
        { label: "CI 2023", value: riskInfo ? riskInfo.ci2023.toFixed(4) : "--" },
        { label: "CI 2022", value: riskInfo ? riskInfo.ci2022.toFixed(4) : "--" },
      ];
      note = "风险模块会把全球供应节点按实验室风险等级重新着色，方便快速扫描脆弱区域。";
    } else {
      kicker = state.alternativeFlowMode ? "Replacement Flow" : "Alternative Capacity";
      stats = [
        { label: "短期潜能", value: shortItem ? shortItem.potential.toFixed(4) : "--" },
        { label: "长期潜能", value: longItem ? longItem.potential.toFixed(4) : "--" },
        { label: "梯队", value: shortItem ? tierMeta(shortItem.tier).label : state.alternativeFlowMode ? "替代起点" : "--" },
        { label: "出口均值", value: shortItem ? `${shortItem.exportAvg.toFixed(2)} 百万吨` : "--" },
      ];
      note = state.alternativeFlowMode
        ? "当前视图模拟移除原来源国后的替代承接方向，优先保留非高风险候选国。"
        : "替代模块会突出短期承接能力更强的国家，并联动右侧查看长期扩张空间。";
    }

    els.mapFocus.innerHTML = `
      <div class="map-focus-kicker">${kicker}</div>
      <div class="map-focus-title" style="color:${focusColor}">${labelCountry(country)}</div>
      <div class="map-focus-grid">
        ${stats
          .map(
            (item) => `
              <article class="map-focus-stat">
                <div class="map-focus-label">${item.label}</div>
                <div class="map-focus-value">${item.value}</div>
              </article>
            `,
          )
          .join("")}
      </div>
      <div class="map-focus-note">${note}</div>
    `;
  }

  function updateMapSelection(product) {
    if (state.module === "alternative" && state.alternativeFlowMode) {
      syncAlternativeFlowMode(product);
      return;
    }

    const { styleMap } = getModuleCountryStyles(product);
    const selectedCountry = getSelectedCountry(product);

    els.worldMap.querySelectorAll(".country-shape").forEach((node) => {
      const dataCountry = node.getAttribute("data-country");
      const isActive =
        selectedCountry && normalizeCountryName(dataCountry) === normalizeCountryName(selectedCountry);
      node.classList.toggle("is-active", Boolean(isActive));
    });

    hideTooltip();
    renderMapFocus(product, styleMap);
    buildHeroMetrics(product);
    renderSidePanel(product);
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
      // Geometry anchors share the exact coordinate system used to draw the map.
      const fromPoint = getCountryAnchor(item.from) || getRenderedCountryAnchor(item.from);
      const toPoint = getCountryAnchor(item.to) || getRenderedCountryAnchor(item.to);
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
      path.style.setProperty("--arrow-index", String(index));
      group.appendChild(path);

      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", String(toPoint[0]));
      dot.setAttribute("cy", String(toPoint[1]));
      dot.setAttribute("r", "4.8");
      dot.setAttribute("fill", item.color || "#1f6b45");
      dot.setAttribute("class", "replacement-node");
      dot.style.setProperty("--arrow-index", String(index));
      group.appendChild(dot);
    });

    els.worldMap.appendChild(group);
  }

  function getAlternativeSelectedItem(product, country) {
    const dataset = getAlternativeDataset(product);
    const key = resolveCountryKey(country, dataset.map((item) => item.country));
    return dataset.find((item) => item.country === key) || null;
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
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = `
        <button class="year-btn ${state.alternativeHorizon === "short" ? "active" : ""}" type="button" data-alt-horizon="short">短期替代</button>
        <button class="year-btn ${state.alternativeHorizon === "long" ? "active" : ""}" type="button" data-alt-horizon="long">长期替代</button>
      `;

      els.yearSwitcher.querySelectorAll("[data-alt-horizon]").forEach((button) => {
        button.addEventListener("click", () => {
          state.alternativeHorizon = button.dataset.altHorizon;
          state.alternativeFlowMode = false;
          state.selectedCountry = null;
          render();
        });
      });
      return;
    }

    els.yearSwitcher.innerHTML = "";
    els.yearSwitcher.classList.add("hidden");
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
        const selectedYear = ensureRiskYear();
        const yearLabel = getRiskYearLabel(selectedYear);
        const metrics = getRiskDtvByYear(risk, selectedYear);
        meta = `${yearLabel} · ${riskMeta(risk.level).label}`;
        rows.push([`CI ${yearLabel}`, formatRiskMetric(getRiskCiByYear(risk, selectedYear))]);
        rows.push(["D 破坏性", formatRiskMetric(metrics.d)]);
        rows.push(["T 传播性", formatRiskMetric(metrics.t)]);
        rows.push(["V 脆弱性", formatRiskMetric(metrics.v)]);
      }
    } else {
      const item = state.alternativeHorizon === "long"
        ? (product.alternatives.longTerm || []).find((entry) => entry.country === longKey)
        : (product.alternatives.shortTerm || []).find((entry) => entry.country === shortKey);
      if (item) {
        const suggestion = getAlternativeSuggestion(product, item);
        meta = `${getAlternativeModeLabel()} | ${item.tierLabel}`;
        rows.push([`${getAlternativeModeLabel()}潜能`, item.potential.toFixed(4)]);
        rows.push(["风险等级", getAlternativeRiskLabel(product, item.country)]);
        rows.push(["替代建议", suggestion.title]);
      }
    }

    return {
      title: labelCountry(importsKey || producersKey || riskKey || shortKey || longKey || mapCountryName),
      meta,
      rows: rows.length ? rows : [["状态", "当前模块暂无可展示数据"]],
    };
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
      caption = "展示该国 2022-2024 年的 D 破坏性、T 传播性和 V 脆弱性三者数值，分年展示。";
    } else {
      const topCountries = getAlternativeTopCountries(product);
      topCountries.forEach((item) => {
        styleMap[item.country] = { fill: getAlternativeTierColor(item.tierLabel) };
      });
      const legendLabels = [...new Set(topCountries.map((item) => item.tierLabel).filter(Boolean))];
      legend = legendLabels.map((label) => ({ label, color: getAlternativeTierColor(label) }));
      title = `${getProductMeta(product.id).name}${getAlternativeModeLabel()}国家布局`;
      kicker = "替代视图";
      caption =
        state.alternativeHorizon === "long"
          ? "展示长期替代潜能前 10 个国家。鼠标悬停可查看长期替代潜能、风险等级与建议。"
          : "展示短期替代潜能前 10 个国家。鼠标悬停可查看短期替代潜能、风险等级与建议。";
    }

    return { styleMap, legend, title, kicker, caption, hiddenCountries, replacementArrows };
  }

  function renderAlternativeSide(product, country) {
    const flowScenario = getSelectedReplacementFlow(product);
    if (flowScenario) {
      renderReplacementFlowSide(flowScenario);
      return;
    }

    renderReplacementFlowEmptyState();
    return;

    const item = getAlternativeSelectedItem(product, country);
    const riskLabel = item ? getAlternativeRiskLabel(product, item.country) : "暂无风险分级";
    const suggestion = getAlternativeSuggestion(product, item);
    const topCountries = getAlternativeTopCountries(product);
    const maxPotential = Math.max(...topCountries.map((entry) => Number(entry.potential || 0)), 0.0001);
    const title = state.alternativeHorizon === "long" ? "长期替代建议" : "短期替代建议";
    const note =
      state.alternativeHorizon === "long"
        ? "当前长期建议基于：长期替代潜能分级、CI 风险等级、对华现有进口基础进行综合判断。后续可按你提供的正式分级表替换。"
        : "当前短期建议基于：短期替代潜能分级、CI 风险等级、对华现有进口基础进行综合判断。后续可按你提供的正式分级表替换。";

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = item ? item.tierLabel : "待评估";
    els.detailBadge.style.background = item ? `${getAlternativeTierColor(item.tierLabel)}22` : "rgba(0,0,0,0.06)";

    els.detailHighlights.innerHTML = item
      ? `
        <article class="detail-chip"><div class="detail-chip-label">${getAlternativeModeLabel()}潜能</div><div class="detail-chip-value">${item.potential.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">风险等级</div><div class="detail-chip-value">${riskLabel}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">能力分级</div><div class="detail-chip-value">${item.tierLabel}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">建议类型</div><div class="detail-chip-value">${suggestion.title}</div></article>
      `
      : "";

    const rankingRows = topCountries
      .map((entry, index) => {
        const width = Math.max(8, (Number(entry.potential || 0) / maxPotential) * 100);
        const active = normalizeCountryName(entry.country) === normalizeCountryName(country) ? " is-active" : "";
        return `
          <div class="alt-rank-row${active}">
            <div class="alt-rank-order">${index + 1}</div>
            <div class="alt-rank-main">
              <div class="alt-rank-head">
                <strong>${labelCountry(entry.country)}</strong>
                <span class="alt-rank-tag" style="background:${getAlternativeTierColor(entry.tierLabel)}18;color:${getAlternativeTierColor(entry.tierLabel)};">${entry.tierLabel}</span>
              </div>
              <div class="alt-rank-bar">
                <span style="width:${width}%;background:${getAlternativeTierColor(entry.tierLabel)};"></span>
              </div>
            </div>
            <div class="alt-rank-value">${Number(entry.potential || 0).toFixed(4)}</div>
          </div>
        `;
      })
      .join("");

    els.chartStack.innerHTML = `
      <article class="chart-card">
        <h4>${getAlternativeModeLabel()}前 10 国家</h4>
        <div class="single-chart">
          <div class="single-chart-title">按替代潜能排序</div>
          <div class="alt-rank-list">${rankingRows}</div>
        </div>
      </article>
      <article class="chart-card">
        <h4>${title}</h4>
        <div class="single-chart">
          <div class="single-chart-title">${labelCountry(country)}</div>
          <p class="chart-caption alt-advice-copy">${suggestion.text}</p>
        </div>
      </article>
    `;
  }

  function renderReplacementFlowEmptyState() {
    els.detailTitle.textContent = "替代流向";
    els.detailBadge.textContent = "等待选择";
    els.detailBadge.style.background = "rgba(31, 107, 69, 0.08)";
    els.detailHighlights.className = "detail-highlights";
    els.detailHighlights.innerHTML = "";
    els.chartStack.className = "chart-stack";
    els.chartStack.innerHTML = `
      <article class="chart-card alternative-flow-empty">
        <div class="alternative-flow-empty-content">
          <div class="alternative-flow-empty-title">请选择断供国</div>
          <p>选择后将展示对应的${getAlternativeModeLabel()}前 10 国家和替代结论。</p>
        </div>
      </article>
    `;
  }

  function getFlowRiskColor(riskLabel) {
    if (riskLabel === "高风险") return palette.high;
    if (riskLabel === "中风险") return palette.medium;
    if (riskLabel === "低风险") return palette.low;
    return palette.negligible;
  }

  function renderReplacementFlowSide(flowScenario) {
    const modeLabel = getAlternativeModeLabel();
    const replacements = flowScenario.replacements.slice(0, 10);

    els.detailTitle.textContent = labelCountry(flowScenario.country);
    els.detailBadge.textContent = flowScenario.conclusion || "待评估";
    els.detailBadge.style.background = "rgba(31, 107, 69, 0.1)";
    els.detailHighlights.className = "detail-highlights detail-highlights--flow";
    els.detailHighlights.innerHTML = `
      <article class="detail-chip"><div class="detail-chip-label">当前场景</div><div class="detail-chip-value">${modeLabel}</div></article>
      <article class="detail-chip"><div class="detail-chip-label">断供国</div><div class="detail-chip-value">${labelCountry(flowScenario.country)}</div></article>
    `;

    const rankingRows = replacements
      .map((replacement, index) => {
        const riskColor = getFlowRiskColor(replacement.risk);
        return `
          <div class="alt-rank-row alt-rank-row--flow">
            <div class="alt-rank-order">${index + 1}</div>
            <div class="alt-rank-main">
              <div class="alt-rank-head">
                <strong>${labelCountry(replacement.country)}</strong>
                <span class="alt-rank-tag" style="background:${riskColor}18;color:${riskColor};">${replacement.risk || "暂无分级"}</span>
              </div>
              ${replacement.relationship ? `<div class="alt-rank-meta">${replacement.relationship}</div>` : ""}
            </div>
          </div>
        `;
      })
      .join("");

    els.chartStack.className = "chart-stack chart-stack--flow";
    els.chartStack.innerHTML = `
      <article class="chart-card chart-card--flow-ranking">
        <h4>${modeLabel}前 10 国家</h4>
        <div class="single-chart">
          <div class="single-chart-title">${labelCountry(flowScenario.country)}断供场景 · 按表格顺序</div>
          <div class="alt-rank-list alt-rank-list--flow">${rankingRows}</div>
        </div>
      </article>
      <article class="chart-card chart-card--flow-conclusion">
        <h4>替代结论</h4>
        <div class="single-chart flow-conclusion-panel">
          <p class="flow-conclusion-copy">${flowScenario.conclusion || "当前表格暂无替代结论。"}</p>
        </div>
      </article>
    `;
  }

  function clearReplacementArrows() {
    els.worldMap.querySelector(".replacement-arrow-layer")?.remove();
    els.worldMap.querySelector("#replacementArrowHead")?.closest("defs")?.remove();
  }

  function syncAlternativeFlowMode(product) {
    if (state.module !== "alternative") return;

    const {
      styleMap,
      legend,
      title,
      kicker,
      caption,
      hiddenCountries = [],
      replacementArrows = [],
    } = getModuleCountryStyles(product);
    const styleKeys = Object.keys(styleMap);
    const selectedCountry = getSelectedCountry(product);

    renderLegend(legend);
    els.mapKicker.textContent = kicker;
    els.mapTitle.textContent = title;
    els.mapCaption.textContent = caption || "";
    els.mapCaption.classList.toggle("hidden", !caption);

    els.worldMap.querySelectorAll(".country-shape").forEach((node) => {
      const dataCountry = node.getAttribute("data-country");
      const matchedKey = resolveCountryKey(dataCountry, styleKeys);
      const hiddenKey = resolveCountryKey(dataCountry, hiddenCountries);
      const isHiddenCountry = Boolean(hiddenKey);
      const finalOpacity = isHiddenCountry ? "0" : matchedKey ? "0.96" : "0.72";

      node.setAttribute(
        "fill",
        isHiddenCountry ? "rgba(255,255,255,0)" : matchedKey ? styleMap[matchedKey].fill : palette.nodata,
      );
      node.setAttribute("stroke", isHiddenCountry ? "rgba(0,0,0,0)" : palette.border);
      node.setAttribute("stroke-width", isHiddenCountry ? "0" : "0.8");
      node.setAttribute("opacity", finalOpacity);
      node.style.setProperty("--map-final-opacity", finalOpacity);
      node.classList.toggle("is-hidden", isHiddenCountry);
      node.classList.toggle(
        "is-active",
        !isHiddenCountry && selectedCountry && normalizeCountryName(dataCountry) === normalizeCountryName(selectedCountry),
      );
    });

    clearReplacementArrows();
    drawReplacementArrows(replacementArrows);
    hideTooltip();
    renderMapFocus(product, styleMap);
    buildHeroMetrics(product);
    renderSidePanel(product);
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
        <button class="year-btn ${state.alternativeHorizon === "short" ? "active" : ""}" type="button" data-alt-horizon="short">短期替代</button>
        <button class="year-btn ${state.alternativeHorizon === "long" ? "active" : ""}" type="button" data-alt-horizon="long">长期替代</button>
        <button class="year-btn ${state.alternativeFlowMode ? "active" : ""}" type="button" data-alt-flow="toggle">
          ${state.alternativeFlowMode ? "恢复原布局" : "显示替代流向"}
        </button>
      `;

      els.yearSwitcher.querySelectorAll("[data-alt-horizon]").forEach((button) => {
        button.addEventListener("click", () => {
          state.alternativeHorizon = button.dataset.altHorizon;
          state.alternativeFlowMode = false;
          state.selectedCountry = null;
          render();
        });
      });

      const toggleButton = els.yearSwitcher.querySelector("[data-alt-flow='toggle']");
      if (toggleButton) {
        toggleButton.addEventListener("click", () => {
          if (!selectedCountry) return;
          state.alternativeFlowMode = !state.alternativeFlowMode;
          renderYearSwitcher(product);
          syncAlternativeFlowMode(product);
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
      caption = "展示该国 2022-2024 年的 D 破坏性、T 传播性和 V 脆弱性三者数值，分年展示。";
    } else {
      const sourceCountry = getSelectedCountry(product);

      if (state.alternativeFlowMode && sourceCountry) {
        const candidates = getAlternativeReplacementCandidates(product, sourceCountry);
        const flowColors = ["#1f6b45", "#2f7b53", "#4d986a", "#76ac84", "#a0c1a3", "#c3d6ba"];
        candidates.forEach((item, index) => {
          styleMap[item.country] = {
            fill: flowColors[index] || getAlternativeTierColor(item.tierLabel),
          };
        });
        hiddenCountries = [sourceCountry];
        replacementArrows = candidates.map((item) => ({
          from: sourceCountry,
          to: item.country,
          color: getAlternativeTierColor(item.tierLabel),
        }));
        legend = [
          { label: "替代起点国家", color: "#d8dfd8" },
          { label: "可替代且非高风险国家", color: palette.tier1 },
        ];
        title = `${labelCountry(sourceCountry)}替代流向模拟`;
        kicker = "替代演示";
        caption = `当前已隐藏 ${labelCountry(sourceCountry)}，并高亮 ${candidates.length} 个可承接替代需求且不属于高风险的候选国家。`;
      } else {
        const topCountries = getAlternativeTopCountries(product);
        topCountries.forEach((item) => {
          styleMap[item.country] = { fill: getAlternativeTierColor(item.tierLabel) };
        });
        const legendLabels = [...new Set(topCountries.map((item) => item.tierLabel).filter(Boolean))];
        legend = legendLabels.map((label) => ({ label, color: getAlternativeTierColor(label) }));
        title = `${getProductMeta(product.id).name}${getAlternativeModeLabel()}国家布局`;
        kicker = "替代视图";
        caption =
          state.alternativeHorizon === "long"
            ? "展示长期替代潜能前 10 个国家。鼠标悬停可查看长期替代潜能、风险等级与建议。"
            : "展示短期替代潜能前 10 个国家。鼠标悬停可查看短期替代潜能、风险等级与建议。";
      }
    }

    return { styleMap, legend, title, kicker, caption, hiddenCountries, replacementArrows };
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
              ${year}骞?            </button>
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
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = `
        <button class="year-btn ${state.alternativeHorizon === "short" ? "active" : ""}" type="button" data-alt-horizon="short">鐭湡鏇夸唬</button>
        <button class="year-btn ${state.alternativeHorizon === "long" ? "active" : ""}" type="button" data-alt-horizon="long">闀挎湡鏇夸唬</button>
      `;

      els.yearSwitcher.querySelectorAll("[data-alt-horizon]").forEach((button) => {
        button.addEventListener("click", () => {
          state.alternativeHorizon = button.dataset.altHorizon;
          state.alternativeFlowMode = false;
          state.selectedCountry = null;
          render();
        });
      });
      return;
    }

    els.yearSwitcher.innerHTML = "";
    els.yearSwitcher.classList.add("hidden");
  }

  function renderYearSwitcher(product) {
    if (state.module === "overview") {
      const years = getRecentOverviewYears(product);
      ensureOverviewYear(product);
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = `
        <label class="year-select-wrap" for="overviewYearSelect">
          <span class="year-select-label">年份</span>
          <select class="year-select" id="overviewYearSelect" aria-label="选择年份">
            ${years
              .map(
                (year) =>
                  `<option value="${year}" ${String(year) === String(state.selectedOverviewYear) ? "selected" : ""}>${year}年</option>`,
              )
              .join("")}
          </select>
        </label>
      `;

      els.yearSwitcher.querySelector("#overviewYearSelect")?.addEventListener("change", (event) => {
        state.selectedOverviewYear = event.target.value;
        state.selectedCountry = null;
        render();
      });
      return;
    }

    if (state.module === "alternative") {
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = `
        <button class="year-btn ${state.alternativeHorizon === "short" ? "active" : ""}" type="button" data-alt-horizon="short">短期替代</button>
        <button class="year-btn ${state.alternativeHorizon === "long" ? "active" : ""}" type="button" data-alt-horizon="long">长期替代</button>
      `;

      els.yearSwitcher.querySelectorAll("[data-alt-horizon]").forEach((button) => {
        button.addEventListener("click", () => {
          state.alternativeHorizon = button.dataset.altHorizon;
          state.alternativeFlowMode = false;
          state.selectedCountry = null;
          render();
        });
      });
      return;
    }

    els.yearSwitcher.innerHTML = "";
    els.yearSwitcher.classList.add("hidden");
  }

  function renderYearSwitcher(product) {
    if (state.module === "overview") {
      const years = getRecentOverviewYears(product);
      ensureOverviewYear(product);
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = `
        <label class="year-select-wrap" for="overviewYearSelect">
          <span class="year-select-label">年份</span>
          <select class="year-select" id="overviewYearSelect" aria-label="选择年份">
            ${years
              .map(
                (year) =>
                  `<option value="${year}" ${String(year) === String(state.selectedOverviewYear) ? "selected" : ""}>${year}年</option>`,
              )
              .join("")}
          </select>
        </label>
      `;

      els.yearSwitcher.querySelector("#overviewYearSelect")?.addEventListener("change", (event) => {
        state.selectedOverviewYear = event.target.value;
        state.selectedCountry = null;
        render();
      });
      return;
    }

    if (state.module === "alternative") {
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = `
        <button class="year-btn ${state.alternativeHorizon === "short" ? "active" : ""}" type="button" data-alt-horizon="short">短期替代</button>
        <button class="year-btn ${state.alternativeHorizon === "long" ? "active" : ""}" type="button" data-alt-horizon="long">长期替代</button>
      `;

      els.yearSwitcher.querySelectorAll("[data-alt-horizon]").forEach((button) => {
        button.addEventListener("click", () => {
          state.alternativeHorizon = button.dataset.altHorizon;
          state.alternativeFlowMode = false;
          state.selectedCountry = null;
          render();
        });
      });
      return;
    }

    els.yearSwitcher.innerHTML = "";
    els.yearSwitcher.classList.add("hidden");
  }

  function buildHeroMetrics(product) {
    if (state.module === "risk") {
      const country = getSelectedCountry(product);
      const riskKey = resolveCountryKey(country, product.risk);
      const risk = riskKey ? product.risk[riskKey] : null;
      const countryLabel = labelCountry(riskKey || country || "该国");
      const years = ["2022", "2023", "2024"];

      els.heroMetrics.className = "metric-strip metric-strip--triple";
      els.heroMetrics.innerHTML = years
        .map((year) => {
          const metrics = getRiskDtvByYear(risk, year);
          return `
            <article class="metric-card metric-card--risk-year">
              <div class="metric-label">${countryLabel} ${year}</div>
              <div class="risk-year-grid">
                <div class="risk-year-item">
                  <span>D</span>
                  <strong>${formatRiskMetric(metrics.d)}</strong>
                </div>
                <div class="risk-year-item">
                  <span>T</span>
                  <strong>${formatRiskMetric(metrics.t)}</strong>
                </div>
                <div class="risk-year-item">
                  <span>V</span>
                  <strong>${formatRiskMetric(metrics.v)}</strong>
                </div>
              </div>
              <div class="metric-note">D 破坏性 / T 传播性 / V 脆弱性</div>
            </article>
          `;
        })
        .join("");
      return;
    }

    if (state.module === "alternative") {
      const country = getSelectedCountry(product);
      const item = getAlternativeSelectedItem(product, country);
      const topCountries = getAlternativeTopCountries(product);
      const suggestion = getAlternativeSuggestion(product, item);

      els.heroMetrics.className = "metric-strip";
      els.heroMetrics.innerHTML = [
        {
          label: `${getAlternativeModeLabel()}覆盖国家`,
          value: `${topCountries.length} 个`,
          note: `当前界面展示 ${getAlternativeModeLabel()}潜能排名前 10 的国家。`,
        },
        {
          label: `${labelCountry(country || "当前国家")}潜能`,
          value: item ? item.potential.toFixed(4) : "--",
          note: item ? `能力分级：${item.tierLabel}` : "当前国家暂无匹配的替代潜能结果。",
        },
        {
          label: "风险等级",
          value: item ? getAlternativeRiskLabel(product, item.country) : "--",
          note: "结合前述 CI 风险分级结果进行替代可行性判断。",
        },
        {
          label: "替代建议",
          value: suggestion.title,
          note: "当前建议为临时规则版，后续可按你提供的正式分级表替换。",
        },
      ]
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
      return;
    }

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
    const externalDependency = Number(getSeriesValue(product.overview.externalDependency, yearIndex));

    const cards = [
      {
        label: `${selectedYear}主产国产量`,
        value: formatMt(totalProduction),
        note: "按当前选中年份汇总前十大主产国的产量。",
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
        label: `${selectedYear}对外进口依赖度`,
        value: Number.isFinite(externalDependency) ? `${(externalDependency * 100).toFixed(2)}%` : "--",
        note: "按净进口量与表观消费量计算该年份的对外进口依赖度。",
      },
    ];

    els.heroMetrics.className = "metric-strip";
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

  function renderRiskSide(product, country) {
    const riskKey = resolveCountryKey(country, product.risk);
    const risk = riskKey ? product.risk[riskKey] : null;
    const riskYears = ["2022", "2023", "2024"];

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = risk ? riskMeta(risk.level).label : "暂无数据";
    els.detailBadge.style.background = risk ? `${riskMeta(risk.level).color}22` : "rgba(0,0,0,0.06)";

    els.detailHighlights.innerHTML = risk
      ? `
        <article class="detail-chip"><div class="detail-chip-label">CI 2022</div><div class="detail-chip-value">${risk.ci2022.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">CI 2023</div><div class="detail-chip-value">${risk.ci2023.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">CI 2024</div><div class="detail-chip-value">${risk.ci2024.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">三年均值</div><div class="detail-chip-value">${risk.score.toFixed(4)}</div></article>
      `
      : "";

    const radarSeries = risk
      ? riskYears.map((year, index) => {
          const metrics = getRiskDtvByYear(risk, year);
          const colors = ["#1f6b45", "#d2a543", "#b93e34"];
          return {
            label: year,
            color: colors[index],
            values: [metrics.d, metrics.t, metrics.v],
          };
        })
      : [];

    els.chartStack.innerHTML = risk
      ? `
        <article class="chart-card">
          <h4>D / T / V 三维雷达图</h4>
          <div class="single-chart">
            <div class="single-chart-title">2022-2024 三年结构对比</div>
            ${makeRadarChart(radarSeries, { size: 308, radius: 96, maxValue: 3 })}
          </div>
        </article>
        <article class="chart-card">
          <h4>CI 风险解读</h4>
          <div class="single-chart risk-level-card risk-level-card--stacked">
            <div class="risk-level-value" style="color:${riskMeta(risk.level).color};">${riskMeta(risk.level).label}</div>
            <p class="chart-caption">雷达图展示该国 2022-2024 年 D 破坏性、T 传播性、V 脆弱性的结构变化，便于对比不同年份的风险构成。</p>
            <p class="chart-caption">CI 2022-2024：${risk.ci2022.toFixed(4)} / ${risk.ci2023.toFixed(4)} / ${risk.ci2024.toFixed(4)}</p>
          </div>
        </article>
      `
      : `<article class="chart-card"><h4>暂无风险数据</h4><p class="chart-caption">请在地图中选择具有风险分级结果的国家。</p></article>`;
  }

  function renderRiskSide(product, country) {
    const riskKey = resolveCountryKey(country, product.risk);
    const risk = riskKey ? product.risk[riskKey] : null;
    const riskYears = ["2022", "2023", "2024"];
    els.chartStack.className = "chart-stack chart-stack--risk-compact";

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = risk ? riskMeta(risk.level).label : "暂无数据";
    els.detailBadge.style.background = risk ? `${riskMeta(risk.level).color}22` : "rgba(0,0,0,0.06)";

    els.detailHighlights.innerHTML = risk
      ? `
        <article class="detail-chip"><div class="detail-chip-label">CI 2022</div><div class="detail-chip-value">${risk.ci2022.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">CI 2023</div><div class="detail-chip-value">${risk.ci2023.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">CI 2024</div><div class="detail-chip-value">${risk.ci2024.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">三年均值</div><div class="detail-chip-value">${risk.score.toFixed(4)}</div></article>
      `
      : "";

    const radarSeries = risk
      ? riskYears.map((year, index) => {
          const metrics = getRiskDtvByYear(risk, year);
          const colors = ["#1f6b45", "#d2a543", "#b93e34"];
          return {
            label: year,
            color: colors[index],
            values: [metrics.d, metrics.t, metrics.v],
          };
        })
      : [];

    els.chartStack.innerHTML = risk
      ? `
        <article class="chart-card chart-card--risk-radar">
          <h4>D / T / V 三维雷达图</h4>
          <div class="single-chart single-chart--risk-radar">
            <div class="single-chart-title">2022-2024 三年结构对比</div>
            ${makeRadarChart(radarSeries, { size: 244, radius: 68, maxValue: 3 })}
          </div>
        </article>
        <article class="chart-card chart-card--risk-note">
          <h4>CI 风险解读</h4>
          <div class="single-chart risk-level-card risk-level-card--stacked">
            <div class="risk-level-value" style="color:${riskMeta(risk.level).color};">${riskMeta(risk.level).label}</div>
            <p class="chart-caption">雷达图展示该国 2022-2024 年 D 破坏性、T 传播性、V 脆弱性的结构变化，便于比较不同年份的风险构成。</p>
            <p class="chart-caption">CI 2022-2024：${risk.ci2022.toFixed(4)} / ${risk.ci2023.toFixed(4)} / ${risk.ci2024.toFixed(4)}</p>
          </div>
        </article>
      `
      : `<article class="chart-card"><h4>暂无风险数据</h4><p class="chart-caption">请在地图中选择具有风险分级结果的国家。</p></article>`;
  }

  function renderRiskSide(product, country) {
    const riskKey = resolveCountryKey(country, product.risk);
    const risk = riskKey ? product.risk[riskKey] : null;
    const riskYears = ["2022", "2023", "2024"];
    const yearColors = {
      "2022": "#5f8b65",
      "2023": "#d2a543",
      "2024": "#1f6b45",
    };

    els.chartStack.className = "chart-stack chart-stack--risk-compact";

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = risk ? riskMeta(risk.level).label : "暂无数据";
    els.detailBadge.style.background = risk ? `${riskMeta(risk.level).color}22` : "rgba(0,0,0,0.06)";

    els.detailHighlights.innerHTML = risk
      ? `
        <article class="detail-chip"><div class="detail-chip-label">CI 2022</div><div class="detail-chip-value">${risk.ci2022.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">CI 2023</div><div class="detail-chip-value">${risk.ci2023.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">CI 2024</div><div class="detail-chip-value">${risk.ci2024.toFixed(4)}</div></article>
        <article class="detail-chip"><div class="detail-chip-label">三年均值</div><div class="detail-chip-value">${risk.score.toFixed(4)}</div></article>
      `
      : "";

    const selectedYear = risk && riskYears.includes(String(state.selectedRiskRadarYear))
      ? String(state.selectedRiskRadarYear)
      : "2024";
    state.selectedRiskRadarYear = selectedYear;

    const selectedMetrics = risk ? getRiskDtvByYear(risk, selectedYear) : null;
    const selectedSeries = risk
      ? [
          {
            label: `${selectedYear}年`,
            color: yearColors[selectedYear] || "#1f6b45",
            values: [selectedMetrics.d, selectedMetrics.t, selectedMetrics.v],
          },
        ]
      : [];

    els.chartStack.innerHTML = risk
      ? `
        <article class="chart-card chart-card--risk-radar">
          <h4>D / T / V 三维雷达图</h4>
          <div class="single-chart single-chart--risk-radar">
            <div class="risk-radar-switch" style="--active-index:${riskYears.indexOf(selectedYear)};">
              <span class="risk-radar-switch-thumb" aria-hidden="true"></span>
              ${riskYears
                .map(
                  (year) => `
                    <button
                      class="risk-radar-switch-option ${year === selectedYear ? "is-active" : ""}"
                      type="button"
                      data-risk-radar-year="${year}"
                      aria-pressed="${year === selectedYear}"
                    >
                      ${year}
                    </button>
                  `,
                )
                .join("")}
            </div>
            <div class="single-chart-title">${selectedYear} 年 D / T / V 结构</div>
            ${makeRadarChart(selectedSeries, { size: 236, radius: 70, maxValue: 3, showLegend: false, showPoints: false })}
          </div>
        </article>
        <article class="chart-card chart-card--risk-note">
          <h4>CI 风险解读</h4>
          <div class="single-chart risk-level-card risk-level-card--stacked">
            <div class="risk-level-value" style="color:${riskMeta(risk.level).color};">${riskMeta(risk.level).label}</div>
            <p class="chart-caption">${selectedYear} 年 D / T / V 分别为 ${formatRiskMetric(selectedMetrics.d)} / ${formatRiskMetric(selectedMetrics.t)} / ${formatRiskMetric(selectedMetrics.v)}，用于观察该国当前年份的风险结构重心。</p>
            <p class="chart-caption">CI 2022-2024：${risk.ci2022.toFixed(4)} / ${risk.ci2023.toFixed(4)} / ${risk.ci2024.toFixed(4)}</p>
          </div>
        </article>
      `
      : `<article class="chart-card"><h4>暂无风险数据</h4><p class="chart-caption">请在地图中选择具有风险分级结果的国家。</p></article>`;

    els.chartStack.querySelectorAll("[data-risk-radar-year]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextYear = button.dataset.riskRadarYear;
        if (!nextYear || nextYear === state.selectedRiskRadarYear) return;
        state.selectedRiskRadarYear = nextYear;
        renderRiskSide(product, country);
        initChartInteractions();
        hideChartTooltip();
      });
    });
  }

  function renderRiskSide(product, country) {
    const riskKey = resolveCountryKey(country, product.risk);
    const risk = riskKey ? product.risk[riskKey] : null;
    const selectedYear = ensureRiskYear();
    const yearLabel = getRiskYearLabel(selectedYear);
    const yearColors = {
      "2022": "#5f8b65",
      "2023": "#d2a543",
      "2024": "#1f6b45",
      avg: "#1f6b45",
    };
    const metrics = risk ? getRiskDtvByYear(risk, selectedYear) : null;
    const ciCards = [
      { key: "2022", label: "CI 2022", value: getRiskCiByYear(risk, "2022") },
      { key: "2023", label: "CI 2023", value: getRiskCiByYear(risk, "2023") },
      { key: "2024", label: "CI 2024", value: getRiskCiByYear(risk, "2024") },
      { key: "avg", label: "CI 平均值", value: getRiskCiByYear(risk, "avg") },
    ];

    els.chartStack.className = "chart-stack chart-stack--risk-compact chart-stack--risk-side";

    els.detailTitle.textContent = labelCountry(country);
    els.detailBadge.textContent = risk ? riskMeta(risk.level).label : "暂无数据";
    els.detailBadge.style.background = risk ? `${riskMeta(risk.level).color}22` : "rgba(0,0,0,0.06)";
    els.detailBadge.style.color = risk ? riskMeta(risk.level).color : "";
    els.detailBadge.style.borderColor = risk ? `${riskMeta(risk.level).color}44` : "";

    els.detailHighlights.className = "detail-highlights detail-highlights--risk-ci";
    els.detailHighlights.innerHTML = risk
      ? ciCards
          .map(
            (card) => `
              <article class="detail-chip detail-chip--risk-ci ${card.key === selectedYear ? "is-active" : ""}">
                <div class="detail-chip-label">${card.label}</div>
                <div class="detail-chip-value">${formatRiskMetric(card.value)}</div>
              </article>
            `,
          )
          .join("")
      : "";

    const selectedSeries = risk
      ? [
          {
            label: yearLabel,
            color: yearColors[selectedYear] || "#1f6b45",
            values: [metrics.d, metrics.t, metrics.v],
          },
        ]
      : [];

    const definitionItems = [
      { short: "D", name: "破坏性", color: "#b93e34", text: "衡量一国引发系统性供应中断的潜在能力，类似关键上游供应商，其失效可能对下游产生广泛影响。" },
      { short: "T", name: "传播性", color: "#d2a543", text: "衡量一国作为中介节点在网络中传播冲击的能力。" },
      { short: "V", name: "脆弱性", color: "#1f6b45", text: "衡量一国对外部供应冲击的敏感程度。" },
    ];

    els.chartStack.innerHTML = risk
      ? `
        <article class="chart-card chart-card--risk-radar">
          <div class="risk-radar-head">
            <div>
              <h4>D / T / V 三维雷达图</h4>
              <div class="single-chart-title">${yearLabel}结构对比</div>
            </div>
            <div class="risk-radar-head-actions">
              <div class="risk-radar-zoom" data-risk-radar-zoom>
                <button class="risk-radar-zoom-btn" type="button" data-radar-zoom="out" aria-label="缩小雷达图">−</button>
                <span class="risk-radar-zoom-value" data-radar-zoom-value>${Math.round((state.riskRadarScale || 1) * 100)}%</span>
                <button class="risk-radar-zoom-btn" type="button" data-radar-zoom="in" aria-label="放大雷达图">+</button>
                <button class="risk-radar-zoom-btn" type="button" data-radar-zoom="reset" aria-label="重置雷达图缩放">↺</button>
              </div>
            </div>
          </div>
          <div class="single-chart single-chart--risk-radar" data-risk-radar-stage>
            ${makeRadarChart(selectedSeries, {
              size: 352,
              radius: 118,
              maxValue: 3,
              axes: ["D", "T", "V"],
              labelOffset: 32,
              showLegend: false,
              showPoints: true,
              showValueLabels: true,
              coloredPoints: true,
              className: "radar-chart-wrap--risk",
            })}
          </div>
        </article>
        <article class="chart-card chart-card--risk-definitions">
          <div class="risk-definition-card-title">三维指标定义</div>
          <div class="risk-definition-list">
            ${definitionItems
              .map(
                (item) => `
                  <p style="--dtv-color:${item.color};">
                    <span class="risk-definition-badge">${item.short}</span>
                    <span><strong>${item.name}</strong>${item.text}</span>
                  </p>
                `,
              )
              .join("")}
          </div>
        </article>
      `
      : `<article class="chart-card"><h4>暂无风险数据</h4><p class="chart-caption">请在地图中选择具有风险分级结果的国家。</p></article>`;

    if (risk) bindRiskRadarZoom();
  }

  function clampRiskRadarScale(scale) {
    return Math.min(1.8, Math.max(0.8, Number(scale) || 1));
  }

  function clampRiskRadarOffset(offset = state.riskRadarOffset, scale = state.riskRadarScale) {
    const maxOffset = 120 * Math.max(1, scale);
    return {
      x: Math.min(maxOffset, Math.max(-maxOffset, Number(offset?.x) || 0)),
      y: Math.min(maxOffset, Math.max(-maxOffset, Number(offset?.y) || 0)),
    };
  }

  function applyRiskRadarTransform() {
    const stage = els.chartStack.querySelector("[data-risk-radar-stage]");
    const wrap = stage?.querySelector(".radar-chart-wrap");
    const valueLabel = els.chartStack.querySelector("[data-radar-zoom-value]");
    const scale = clampRiskRadarScale(state.riskRadarScale);
    const offset = clampRiskRadarOffset(state.riskRadarOffset, scale);
    state.riskRadarScale = scale;
    state.riskRadarOffset = offset;
    if (wrap) {
      wrap.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(${scale})`;
    }
    if (valueLabel) valueLabel.textContent = `${Math.round(scale * 100)}%`;
  }

  function resetRiskRadarView() {
    state.riskRadarScale = 1;
    state.riskRadarOffset = { x: 0, y: 0 };
    applyRiskRadarTransform();
  }

  function bindRiskRadarZoom() {
    const stage = els.chartStack.querySelector("[data-risk-radar-stage]");
    const wrap = stage?.querySelector(".radar-chart-wrap");
    if (!stage || !wrap) return;

    applyRiskRadarTransform();

    els.chartStack.querySelectorAll("[data-radar-zoom]").forEach((button) => {
      button.addEventListener("click", () => {
        const action = button.dataset.radarZoom;
        if (action === "in") state.riskRadarScale = clampRiskRadarScale(state.riskRadarScale + 0.1);
        if (action === "out") state.riskRadarScale = clampRiskRadarScale(state.riskRadarScale - 0.1);
        if (action === "reset") {
          resetRiskRadarView();
          return;
        }
        applyRiskRadarTransform();
      });
    });

    stage.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -0.08 : 0.08;
        state.riskRadarScale = clampRiskRadarScale(state.riskRadarScale + delta);
        applyRiskRadarTransform();
      },
      { passive: false },
    );

    const endDrag = (event) => {
      if (!state.riskRadarDrag) return;
      if (event?.pointerId && state.riskRadarDrag.pointerId !== event.pointerId) return;
      stage.classList.remove("is-dragging");
      try {
        stage.releasePointerCapture?.(state.riskRadarDrag.pointerId);
      } catch (error) {
        // Ignore release failures when the pointer is already gone.
      }
      state.riskRadarDrag = null;
    };

    stage.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      state.riskRadarDrag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: state.riskRadarOffset.x,
        originY: state.riskRadarOffset.y,
      };
      stage.classList.add("is-dragging");
      stage.setPointerCapture?.(event.pointerId);
    });

    stage.addEventListener("pointermove", (event) => {
      if (!state.riskRadarDrag || state.riskRadarDrag.pointerId !== event.pointerId) return;
      const dx = event.clientX - state.riskRadarDrag.startX;
      const dy = event.clientY - state.riskRadarDrag.startY;
      state.riskRadarOffset = clampRiskRadarOffset(
        {
          x: state.riskRadarDrag.originX + dx,
          y: state.riskRadarDrag.originY + dy,
        },
        state.riskRadarScale,
      );
      applyRiskRadarTransform();
    });

    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);
    stage.addEventListener("pointerleave", (event) => {
      if (state.riskRadarDrag?.pointerId === event.pointerId) endDrag(event);
    });
  }

  function closeOverviewYearDropdown() {
    els.yearSwitcher.querySelectorAll(".year-select-wrap").forEach((wrap) => {
      wrap.classList.remove("is-open");
      wrap.querySelector(".year-select-trigger")?.setAttribute("aria-expanded", "false");
    });
  }

  function ensureOverviewYearDropdownDismiss() {
    if (document.body.dataset.yearDropdownBound === "1") return;
    document.body.dataset.yearDropdownBound = "1";

    document.addEventListener("pointerdown", (event) => {
      if (!els.yearSwitcher.contains(event.target)) closeOverviewYearDropdown();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeOverviewYearDropdown();
    });
  }

  function renderYearSwitcher(product) {
    if (state.module === "overview") {
      const years = getRecentOverviewYears(product);
      ensureOverviewYear(product);
      ensureOverviewYearDropdownDismiss();
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = `
        <div class="year-select-wrap" data-year-dropdown>
          <span class="year-select-label">年份</span>
          <button
            class="year-select-trigger"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-label="选择年份"
          >
            <span class="year-select-value">${state.selectedOverviewYear}年</span>
          </button>
          <div class="year-select-menu" role="listbox" aria-label="年份选项">
            ${years
              .map(
                (year) => `
                  <button
                    class="year-select-option ${String(year) === String(state.selectedOverviewYear) ? "is-active" : ""}"
                    type="button"
                    role="option"
                    aria-selected="${String(year) === String(state.selectedOverviewYear)}"
                    data-year-option="${year}"
                  >
                    ${year}年
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
      `;

      const wrap = els.yearSwitcher.querySelector("[data-year-dropdown]");
      const trigger = els.yearSwitcher.querySelector(".year-select-trigger");

      trigger?.addEventListener("click", (event) => {
        event.stopPropagation();
        const willOpen = !wrap.classList.contains("is-open");
        closeOverviewYearDropdown();
        wrap.classList.toggle("is-open", willOpen);
        trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });

      els.yearSwitcher.querySelectorAll("[data-year-option]").forEach((button) => {
        button.addEventListener("click", () => {
          state.selectedOverviewYear = button.dataset.yearOption;
          state.selectedCountry = null;
          closeOverviewYearDropdown();
          render();
        });
      });
      return;
    }

    if (state.module === "risk") {
      const years = getRiskYears();
      const selectedYear = ensureRiskYear();
      ensureOverviewYearDropdownDismiss();
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = `
        <div class="year-select-wrap" data-year-dropdown>
          <span class="year-select-label">年份</span>
          <button
            class="year-select-trigger"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-label="选择风险年份"
          >
            <span class="year-select-value">${getRiskYearLabel(selectedYear)}</span>
          </button>
          <div class="year-select-menu" role="listbox" aria-label="风险年份选项">
            ${years
              .map(
                (year) => `
                  <button
                    class="year-select-option ${String(year) === String(selectedYear) ? "is-active" : ""}"
                    type="button"
                    role="option"
                    aria-selected="${String(year) === String(selectedYear)}"
                    data-year-option="${year}"
                  >
                    ${getRiskYearLabel(year)}
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
      `;

      const wrap = els.yearSwitcher.querySelector("[data-year-dropdown]");
      const trigger = els.yearSwitcher.querySelector(".year-select-trigger");

      trigger?.addEventListener("click", (event) => {
        event.stopPropagation();
        const willOpen = !wrap.classList.contains("is-open");
        closeOverviewYearDropdown();
        wrap.classList.toggle("is-open", willOpen);
        trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });

      els.yearSwitcher.querySelectorAll("[data-year-option]").forEach((button) => {
        button.addEventListener("click", () => {
          state.selectedRiskRadarYear = button.dataset.yearOption;
          closeOverviewYearDropdown();
          render();
        });
      });
      return;
    }

    if (state.module === "alternative") {
      ensureOverviewYearDropdownDismiss();
      const flowScenarios = product.replacementFlows?.[state.alternativeHorizon] || [];
      const selectedScenario = flowScenarios.find(
        (item) => normalizeCountryName(item.country) === normalizeCountryName(state.alternativeDisruptionCountry),
      );
      els.yearSwitcher.classList.remove("hidden");
      els.yearSwitcher.innerHTML = `
        <button class="year-btn ${state.alternativeHorizon === "short" ? "active" : ""}" type="button" data-alt-horizon="short">短期替代</button>
        <button class="year-btn ${state.alternativeHorizon === "long" ? "active" : ""}" type="button" data-alt-horizon="long">长期替代</button>
        <div class="year-select-wrap alternative-flow-select" data-alternative-flow-dropdown>
          <span class="year-select-label">断供国</span>
          <button
            class="year-select-trigger alternative-flow-trigger"
            type="button"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-label="选择断供国"
          >
            <span class="year-select-value">${selectedScenario ? labelCountry(selectedScenario.country) : "无"}</span>
          </button>
          <div class="year-select-menu alternative-flow-menu" role="listbox" aria-label="断供国选项">
            <button
              class="year-select-option ${selectedScenario ? "" : "is-active"}"
              type="button"
              role="option"
              aria-selected="${!selectedScenario}"
              data-disruption-country=""
            >
              无
            </button>
            ${flowScenarios
              .map(
                (scenario) => `
                  <button
                    class="year-select-option ${selectedScenario === scenario ? "is-active" : ""}"
                    type="button"
                    role="option"
                    aria-selected="${selectedScenario === scenario}"
                    data-disruption-country="${scenario.country}"
                  >
                    ${labelCountry(scenario.country)}
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
      `;

      els.yearSwitcher.querySelectorAll("[data-alt-horizon]").forEach((button) => {
        button.addEventListener("click", () => {
          state.alternativeHorizon = button.dataset.altHorizon;
          state.alternativeFlowMode = false;
          state.alternativeDisruptionCountry = null;
          state.selectedCountry = null;
          render();
        });
      });

      const flowWrap = els.yearSwitcher.querySelector("[data-alternative-flow-dropdown]");
      const flowTrigger = flowWrap?.querySelector(".year-select-trigger");
      flowTrigger?.addEventListener("click", (event) => {
        event.stopPropagation();
        const willOpen = !flowWrap.classList.contains("is-open");
        closeOverviewYearDropdown();
        flowWrap.classList.toggle("is-open", willOpen);
        flowTrigger.setAttribute("aria-expanded", String(willOpen));
      });

      els.yearSwitcher.querySelectorAll("[data-disruption-country]").forEach((button) => {
        button.addEventListener("click", () => {
          const disruptionCountry = button.dataset.disruptionCountry || null;
          state.alternativeDisruptionCountry = disruptionCountry;
          state.alternativeFlowMode = Boolean(disruptionCountry);
          closeOverviewYearDropdown();
          renderYearSwitcher(product);
          syncAlternativeFlowMode(product);
        });
      });
      return;
    }

    els.yearSwitcher.innerHTML = "";
    els.yearSwitcher.classList.add("hidden");
  }

  function drawMap(product) {
    const { styleMap, legend, title, kicker, caption, hiddenCountries = [], replacementArrows = [] } = getModuleCountryStyles(product);
    renderYearSwitcher(product);
    renderLegend(legend);
    els.mapKicker.textContent = kicker;
    els.mapTitle.textContent = title;
    renderMapDefinition();
    els.mapCaption.textContent = caption || "";
    els.mapCaption.classList.toggle("hidden", !caption);
    els.mapPanel?.classList.toggle("map-panel--risk", state.module === "risk");
    els.mapPanel?.classList.toggle("map-panel--alternative", state.module === "alternative");
    els.worldMap.innerHTML = "";

    if (!state.geoJson) {
      els.worldMap.innerHTML = '<text x="500" y="260" text-anchor="middle" fill="#627061" font-size="18">地图数据加载中...</text>';
      return;
    }

    state.selectedCountry = getSelectedCountry(product);
    drawMapBackdrop();

    state.geoJson.features.forEach((feature, index) => {
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
      const finalOpacity = isHiddenCountry ? "0" : matchedKey ? "0.96" : "0.72";
      node.setAttribute("opacity", finalOpacity);
      node.style.setProperty("--country-index", String(index));
      node.style.setProperty("--country-delay", `${Math.min(index, 36) * 14}ms`);
      node.style.setProperty("--map-final-opacity", finalOpacity);

      if (!isHiddenCountry && matchedKey && normalizeCountryName(matchedKey) === normalizeCountryName(state.selectedCountry)) {
        node.classList.add("is-active");
      }

      node.addEventListener("mouseenter", (event) => showTooltip(event, product, mapName));
      node.addEventListener("mousemove", setTooltipPosition);
      node.addEventListener("mouseleave", hideTooltip);
      node.addEventListener("click", () => {
        if (!matchedKey || isHiddenCountry) return;
        if (state.module === "alternative") {
          const alternativeKey = resolveCountryKey(
            mapName,
            getAlternativeTopCountries(product).map((item) => item.country),
          );
          if (!alternativeKey) return;
          state.selectedCountry = alternativeKey;
          updateMapSelection(product);
          return;
        }
        const next = matchedKey;
        if (next) {
          state.selectedCountry = next;
          updateMapSelection(product);
        }
      });

      els.worldMap.appendChild(node);
    });

    drawReplacementArrows(replacementArrows);
    renderMapFocus(product, styleMap);
    applyMapViewport();
  }

  // In the alternative module, geography communicates CI risk while the
  // tooltip and side panel continue to communicate replacement potential.
  const buildHeroMetricsWithMapCards = buildHeroMetrics;
  buildHeroMetrics = function buildHeroMetricsByModule(product) {
    if (state.module === "risk") {
      const country = getSelectedCountry(product);
      const riskKey = resolveCountryKey(country, product.risk);
      const risk = riskKey ? product.risk[riskKey] : null;
      const countryLabel = labelCountry(riskKey || country || "该国");
      const selectedYear = ensureRiskYear();
      const yearLabel = getRiskYearLabel(selectedYear);
      const metrics = getRiskDtvByYear(risk, selectedYear);
      const yearCi = getRiskCiByYear(risk, selectedYear);
      const metricMeta = [
        { key: "d", short: "D", name: "破坏性", color: "#b93e34" },
        { key: "t", short: "T", name: "传播性", color: "#d2a543" },
        { key: "v", short: "V", name: "脆弱性", color: "#1f6b45" },
      ];

      els.heroMetrics.className = "metric-strip metric-strip--risk-panel";
      els.heroMetrics.innerHTML = `
        <article class="metric-card risk-dtv-panel">
          <div class="risk-dtv-panel-head">
            <div class="risk-dtv-panel-title">${countryLabel}<span>${yearLabel} · CI ${formatRiskMetric(yearCi)}</span></div>
          </div>
          <div class="risk-dtv-metrics risk-dtv-metrics--row">
            ${metricMeta
              .map(
                (item) => `
                  <div class="risk-dtv-metric" style="--dtv-color:${item.color};">
                    <span class="risk-dtv-metric-badge">${item.short}</span>
                    <div class="risk-dtv-metric-copy">
                      <strong>${formatRiskMetric(metrics[item.key])}</strong>
                      <em>${item.name}</em>
                    </div>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      `;
      return;
    }

    if (state.module === "alternative") {
      els.heroMetrics.className = "metric-strip metric-strip--alt-note";
      els.heroMetrics.innerHTML = `
        <article class="metric-card alt-risk-note-panel">
          <div class="alt-risk-note-title">风险分级备注</div>
          <div class="alt-risk-note-copy">
            在主要供应国断供后，优先保证本国供应，结合某国可供量及风险分级结果来筛选替代国。
          </div>
        </article>
      `;
      return;
    }

    els.heroMetrics.classList.remove("hidden");
    buildHeroMetricsWithMapCards(product);
  };

  const getModuleCountryStylesWithPotentialColors = getModuleCountryStyles;

  function getSelectedReplacementFlow(product) {
    const scenarios = product.replacementFlows?.[state.alternativeHorizon] || [];
    return scenarios.find(
      (item) => normalizeCountryName(item.country) === normalizeCountryName(state.alternativeDisruptionCountry),
    ) || null;
  }

  getModuleCountryStyles = function getModuleCountryStylesWithRiskColors(product) {
    const config = getModuleCountryStylesWithPotentialColors(product);
    const updatedRiskLegend = [
      { label: "高风险", color: palette.high },
      { label: "中风险", color: palette.medium },
      { label: "低风险", color: palette.low },
      { label: "风险可忽略", color: palette.negligible },
    ];

    if (state.module === "risk") {
      const selectedYear = ensureRiskYear();
      const yearLabel = getRiskYearLabel(selectedYear);
      config.legend = updatedRiskLegend;
      config.kicker = `${yearLabel}风险视图`;
      config.title = `${getProductMeta(product.id).name}${yearLabel} CI 风险地图`;
      config.caption = "";
      return config;
    }
    if (state.module !== "alternative") return config;

    Object.entries(product.risk || {}).forEach(([country, risk]) => {
      config.styleMap[country] = {
        ...(config.styleMap[country] || {}),
        fill: riskMeta(risk.level).color,
      };
    });

    const flowScenario = state.alternativeFlowMode ? getSelectedReplacementFlow(product) : null;
    if (flowScenario) {
      config.hiddenCountries = [flowScenario.country];
      config.replacementArrows = flowScenario.replacements.map((replacement) => ({
        from: flowScenario.country,
        to: replacement.country,
        color: "#1f6b45",
      }));
    } else {
      config.hiddenCountries = [];
      config.replacementArrows = [];
    }

    config.legend = updatedRiskLegend;
    config.kicker = state.alternativeFlowMode ? "替代演示" : "替代视图";
    config.title = state.alternativeFlowMode
      ? `${labelCountry(flowScenario?.country)}断供替代流向`
      : `${getProductMeta(product.id).name}${getAlternativeModeLabel()}国家布局`;
    config.caption = "";
    return config;
  };

  function render() {
    const product = getProduct();
    ensureOverviewYear(product);
    state.selectedCountry = getSelectedCountry(product);
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
    closeDetailModal();
    updateView();
  });

  initModalInteractions();
  initMapInteractions();
  render();
  loadWorldMap();
})();
