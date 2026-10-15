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
    "Viet Nam": "越南",
    Vietnam: "越南",
    "Lao People's Dem. Rep.": "老挝",
    "Lao PDR": "老挝",
    Laos: "老挝",
    Mexico: "墨西哥",
    Nigeria: "尼日利亚",
    Ethiopia: "埃塞俄比亚",
    Sudan: "苏丹",
    "Sudan (former)": "苏丹（原）",
    "Sudan (...2011)": "苏丹（2011年前）",
    "South Sudan": "南苏丹",
    Kazakhstan: "哈萨克斯坦",
    "South Africa": "南非",
    Romania: "罗马尼亚",
    Bulgaria: "保加利亚",
    Turkey: "土耳其",
    "Türkiye": "土耳其",
    "T\u00c3\u00bcrkiye": "土耳其",
    "United Kingdom": "英国",
    "United Kingdom of Great Britain and Northern Ireland": "英国",
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
    turkey: ["Turkey", "Türkiye", "T\u00c3\u00bcrkiye"],
    trkiye: ["Turkey", "Türkiye", "T\u00c3\u00bcrkiye"],
    sudan: ["Sudan", "Sudan (former)", "Sudan (...2011)"],
    sudanformer: ["Sudan", "Sudan (former)"],
    sudan2011: ["Sudan", "Sudan (...2011)"],
    southsudan: ["South Sudan", "S. Sudan"],
    ssudan: ["South Sudan", "S. Sudan"],
    unitedkingdom: ["United Kingdom", "United Kingdom of Great Britain and Northern Ireland"],
    unitedkingdomofgreatbritainandnorthernireland: [
      "United Kingdom",
      "United Kingdom of Great Britain and Northern Ireland",
    ],
    bolivia: ["Bolivia", "Bolivia (Plurinational State of)"],
    boliviaplurinationalstateof: ["Bolivia", "Bolivia (Plurinational State of)"],
    tanzania: ["Tanzania", "United Rep. of Tanzania", "United Republic of Tanzania"],
    unitedrepoftanzania: ["Tanzania", "United Rep. of Tanzania", "United Republic of Tanzania"],
    unitedrepublicoftanzania: ["Tanzania", "United Rep. of Tanzania", "United Republic of Tanzania"],
    china: ["China"],
    vietnam: ["Vietnam", "Viet Nam"],
    laos: ["Laos", "Lao PDR", "Lao People's Dem. Rep."],
    laopdr: ["Laos", "Lao PDR", "Lao People's Dem. Rep."],
    laopeoplesdemrep: ["Laos", "Lao PDR", "Lao People's Dem. Rep."],
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
    { id: "production", label: "产能" },
    { id: "trade", label: "进口贸易" },
    { id: "risk", label: "风险" },
    { id: "alternative", label: "替代" },
  ];

  const state = {
    view: "landing",
    productId: Object.keys(PRODUCT_META)[0],
    module: "production",
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
    capacityMapViewport: { x: 0, y: 0, width: 1000, height: 520 },
    capacityMapDrag: null,
    suppressCapacityMapClickUntil: 0,
    tradeMapViewport: { x: 0, y: 0, width: 1000, height: 520 },
    tradeMapDrag: null,
    suppressTradeMapClickUntil: 0,
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
    refreshDataBtn: document.getElementById("refreshDataBtn"),
    refreshDataStatus: document.getElementById("refreshDataStatus"),
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
    dashboardGrid: document.getElementById("dashboardGrid"),
    capacityDashboard: document.getElementById("capacityDashboard"),
    capacityFilters: document.getElementById("capacityFilters"),
    capacityDependencyLabel: document.getElementById("capacityDependencyLabel"),
    capacityDependencyValue: document.getElementById("capacityDependencyValue"),
    capacityMapKicker: document.getElementById("capacityMapKicker"),
    capacityMapTitle: document.getElementById("capacityMapTitle"),
    capacityMapCaption: document.getElementById("capacityMapCaption"),
    capacityMapStage: document.getElementById("capacityMapStage"),
    capacityWorldMap: document.getElementById("capacityWorldMap"),
    capacityMapTooltip: document.getElementById("capacityMapTooltip"),
    capacityMapZoomIn: document.getElementById("capacityMapZoomIn"),
    capacityMapZoomOut: document.getElementById("capacityMapZoomOut"),
    capacityMapResetView: document.getElementById("capacityMapResetView"),
    capacityRankTitle: document.getElementById("capacityRankTitle"),
    capacityRankBody: document.getElementById("capacityRankBody"),
    capacityDetailTitle: document.getElementById("capacityDetailTitle"),
    capacityDetailBadge: document.getElementById("capacityDetailBadge"),
    capacityBasicTitle: document.getElementById("capacityBasicTitle"),
    capacityBasicList: document.getElementById("capacityBasicList"),
    capacityTrendTitle: document.getElementById("capacityTrendTitle"),
    capacityTrendStack: document.getElementById("capacityTrendStack"),
    capacityHeatmapTitle: document.getElementById("capacityHeatmapTitle"),
    capacityHeatmapLegend: document.getElementById("capacityHeatmapLegend"),
    capacityHeatmapWrap: document.getElementById("capacityHeatmapWrap"),
    tradeDashboard: document.getElementById("tradeDashboard"),
    tradeMetrics: document.getElementById("tradeMetrics"),
    tradeFilters: document.getElementById("tradeFilters"),
    tradeMapKicker: document.getElementById("tradeMapKicker"),
    tradeMapTitle: document.getElementById("tradeMapTitle"),
    tradeMapCaption: document.getElementById("tradeMapCaption"),
    tradeMapStage: document.getElementById("tradeMapStage"),
    tradeWorldMap: document.getElementById("tradeWorldMap"),
    tradeMapTooltip: document.getElementById("tradeMapTooltip"),
    tradeMapZoomIn: document.getElementById("tradeMapZoomIn"),
    tradeMapZoomOut: document.getElementById("tradeMapZoomOut"),
    tradeMapResetView: document.getElementById("tradeMapResetView"),
    tradeRankTitle: document.getElementById("tradeRankTitle"),
    tradeRankBody: document.getElementById("tradeRankBody"),
    tradeDetailTitle: document.getElementById("tradeDetailTitle"),
    tradeDetailBadge: document.getElementById("tradeDetailBadge"),
    tradeBasicTitle: document.getElementById("tradeBasicTitle"),
    tradeBasicList: document.getElementById("tradeBasicList"),
    tradeTrendTitle: document.getElementById("tradeTrendTitle"),
    tradeTrendStack: document.getElementById("tradeTrendStack"),
    tradeOverallTitle: document.getElementById("tradeOverallTitle"),
    tradeOverallCharts: document.getElementById("tradeOverallCharts"),
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
    if (!name) return name;
    const direct = WORLD_COUNTRY_LABELS[name] || COUNTRY_LABELS[name];
    if (direct) return direct;
    const aliases = COUNTRY_ALIASES[normalizeCountryName(name)] || [];
    for (const alias of aliases) {
      const label = WORLD_COUNTRY_LABELS[alias] || COUNTRY_LABELS[alias];
      if (label) return label;
    }
    return name;
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
    if (format === "wantons") return `${num.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} 万吨`;
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
    if (format === "wantons") return num >= 1000 ? num.toFixed(0) : num.toFixed(1);
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
    return [els.chartStack, els.capacityTrendStack, els.tradeTrendStack, els.tradeOverallCharts, els.detailModalBody].filter(Boolean);
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
        state.module = "production";
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
    const titleMap = {
      production: `${meta.name}产能总览`,
      trade: `中国${meta.name}进口分析`,
      risk: `${meta.name}风险分析`,
      alternative: `${meta.name}替代布局`,
    };
    els.dashboardTitle.textContent = titleMap[state.module] || `${meta.name}国际供给总览`;

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

  function getRiskCountries(product) {
    return Object.entries(product.risk)
      .sort((a, b) => b[1].score - a[1].score)
      .map(([country]) => country);
  }

  function getAlternativeCountries(product) {
    return getAlternativeTopCountries(product);
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

  function getSelectedCountry(product) {
    if (state.module === "production") {
      const producers = getProductionTopCountries(product);
      const names = producers.map((item) => item.country);
      if (state.selectedCountry && resolveCountryKey(state.selectedCountry, names)) {
        return resolveCountryKey(state.selectedCountry, names);
      }
      return names[0] || null;
    }

    if (state.module === "trade") {
      const tradeCountries = getTradeTopCountries(product).map((item) => item.country);
      if (state.selectedCountry && resolveCountryKey(state.selectedCountry, tradeCountries)) {
        return resolveCountryKey(state.selectedCountry, tradeCountries);
      }
      return tradeCountries[0] || null;
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

  function setTooltipPosition(event) {
    const box = els.worldMap.getBoundingClientRect();
    const offsetX = event.clientX - box.left + 18;
    const offsetY = event.clientY - box.top + 18;
    els.mapTooltip.style.left = `${Math.min(offsetX, box.width - 280)}px`;
    els.mapTooltip.style.top = `${Math.min(offsetY, box.height - 160)}px`;
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

    const zeroFloorFormats = new Set(["mt", "wantons", "percent", "price", "area", "yield"]);
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

    const openModalFromTrigger = (trigger) => {
      const product = getProduct();
      const country = getSelectedCountry(product);
      if (!country) return;

      const modalKind = trigger.getAttribute("data-open-detail-modal");
      let modalContent = "";
      if (modalKind?.startsWith("capacity_")) {
        modalContent = buildCapacityTrendModal(product, country, modalKind);
      } else if (modalKind?.startsWith("trade_")) {
        modalContent = buildTradeTrendModal(product, country, modalKind);
      } else {
        return;
      }
      openDetailModal(modalContent, trigger);
    };

    const bindModalRoot = (root) => {
      if (!root || root.dataset.detailModalBound === "1") return;
      root.dataset.detailModalBound = "1";

      root.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-open-detail-modal]");
        if (!trigger || !root.contains(trigger)) return;
        openModalFromTrigger(trigger);
      });

      root.addEventListener("keydown", (event) => {
        const trigger = event.target.closest("[data-open-detail-modal]");
        if (!trigger || !root.contains(trigger) || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        openModalFromTrigger(trigger);
      });
    };

    bindModalRoot(els.chartStack);
    bindModalRoot(els.capacityTrendStack);
    bindModalRoot(els.tradeTrendStack);
    bindModalRoot(els.tradeOverallCharts);
  }

  function buildCapacityTrendModal(product, country, modalKind) {
    const producerKey = resolveCountryKey(country, product.producers);
    const producer = producerKey ? product.producers[producerKey] : null;
    const years = product.years;
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || years.at(yearIndex));
    const outputSeries = (producer?.output || []).map((value) => (value === null || value === undefined ? null : Number(value) * 100));
    const areaSeries = (producer?.area || []).map((value) => (value === null || value === undefined ? null : Number(value) * 100));
    const outputValues = getAvailableSeriesValues(outputSeries);
    const areaValues = getAvailableSeriesValues(areaSeries);
    const yieldValues = getAvailableSeriesValues(producer?.yield);

    const configMap = {
      capacity_output: {
        title: "产量变化（万吨）",
        color: "#1f6b45",
        format: "wantons",
        label: "产量",
        series: outputSeries,
        note: "用于观察该国产量规模的长期变化与波动。",
        stats: producer
          ? [
              { label: `${selectedYear}产量`, value: `${formatWanTons(getSeriesValue(producer.output, yearIndex))} 万吨` },
              { label: "近年峰值", value: outputValues.length ? `${formatWanTons(Math.max(...outputValues) / 100)} 万吨` : "暂无数据" },
              { label: "近年均值", value: outputValues.length ? `${formatWanTons(outputValues.reduce((sum, value) => sum + value, 0) / outputValues.length / 100)} 万吨` : "暂无数据" },
            ]
          : [],
      },
      capacity_area: {
        title: "面积变化（万公顷）",
        color: "#3f8f5c",
        format: "area",
        label: "面积",
        series: areaSeries,
        note: "用于观察该国收获面积的扩张或收缩趋势。",
        stats: producer
          ? [
              { label: `${selectedYear}面积`, value: `${formatWanHa(getSeriesValue(producer.area, yearIndex))} 万公顷` },
              { label: "近年峰值", value: areaValues.length ? `${formatWanHa(Math.max(...areaValues) / 100)} 万公顷` : "暂无数据" },
              { label: "近年均值", value: areaValues.length ? `${formatWanHa(areaValues.reduce((sum, value) => sum + value, 0) / areaValues.length / 100)} 万公顷` : "暂无数据" },
            ]
          : [],
      },
      capacity_yield: {
        title: "单产变化（吨/公顷）",
        color: "#7a5ea8",
        format: "yield",
        label: "单产",
        series: producer?.yield || [],
        note: "用于观察单产效率变化及可能受到的气候影响。",
        stats: producer
          ? [
              { label: `${selectedYear}单产`, value: `${formatYieldValue(getSeriesValue(producer.yield, yearIndex))} 吨/公顷` },
              { label: "近年峰值", value: yieldValues.length ? `${Math.max(...yieldValues).toFixed(2)} 吨/公顷` : "暂无数据" },
              { label: "近年均值", value: yieldValues.length ? `${(yieldValues.reduce((sum, value) => sum + value, 0) / yieldValues.length).toFixed(2)} 吨/公顷` : "暂无数据" },
            ]
          : [],
      },
    };

    const config = configMap[modalKind];
    if (!producer || !config) {
      return `
        <div class="modal-content modal-content--empty">
          <div class="modal-header">
            <div>
              <p class="panel-kicker">Production Detail</p>
              <h3 class="modal-title" id="detailModalTitle">${labelCountry(country)}产能趋势</h3>
              <p class="modal-copy">当前国家暂无可展开的产能趋势数据，请切换其他国家查看。</p>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="modal-content modal-content--single-chart">
        <div class="modal-header">
          <div>
            <p class="panel-kicker">Production Detail</p>
            <h3 class="modal-title" id="detailModalTitle">${config.title}</h3>
            <p class="modal-copy">${labelCountry(country)} 的这项产能指标已展开为大图，便于更清楚地观察年度变化过程。</p>
          </div>
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

  function enhanceCapacityTrendCards() {
    if (!els.capacityTrendStack) return;
    const cards = Array.from(els.capacityTrendStack.querySelectorAll(".capacity-trend-card"));
    const modalKinds = ["capacity_output", "capacity_area", "capacity_yield"];
    const labels = ["产量变化大图", "面积变化大图", "单产变化大图"];

    cards.forEach((card, index) => {
      const modalKind = modalKinds[index];
      if (!modalKind) return;

      card.classList.add("chart-card--interactive", "capacity-trend-card--interactive");
      card.setAttribute("data-open-detail-modal", modalKind);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `查看${labels[index]}`);

      const head = card.querySelector(".capacity-trend-head");
      if (head && !card.querySelector(".chart-expand-hint")) {
        const hint = document.createElement("span");
        hint.className = "chart-expand-hint";
        hint.textContent = "点击查看大图";
        head.appendChild(hint);
      }
    });
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

    if (state.module === "risk") {
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

  function renderMapFocus() {
    // 风险/替代模块改用右侧详情与 tooltip，地图焦点卡已停用
    els.mapFocus.innerHTML = "";
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

  function getTooltipRows(product, mapCountryName) {
    const riskKey = resolveCountryKey(mapCountryName, product.risk);
    const shortKey = resolveCountryKey(mapCountryName, (product.alternatives.shortTerm || []).map((item) => item.country));
    const longKey = resolveCountryKey(mapCountryName, (product.alternatives.longTerm || []).map((item) => item.country));

    const rows = [];
    let meta = "暂无监测数据";

    if (state.module === "risk") {
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
      const riskLabel = getAlternativeRiskLabel(product, riskKey || mapCountryName);

      if (item) {
        const suggestion = getAlternativeSuggestion(product, item);
        meta = `${getAlternativeModeLabel()} | ${riskLabel}`;
        rows.push([`${getAlternativeModeLabel()}潜能`, item.potential.toFixed(4)]);
        rows.push(["风险等级", riskLabel]);
        rows.push(["替代建议", suggestion.title]);
      } else {
        meta = riskLabel;
        rows.push(["风险等级", riskLabel]);
      }
    }

    return {
      title: labelCountry(riskKey || shortKey || longKey || mapCountryName),
      meta,
      rows: rows.length ? rows : [["状态", "当前模块暂无可展示数据"]],
    };
  }

  function renderAlternativeSide(product, country) {
    const flowScenario = getSelectedReplacementFlow(product);
    if (flowScenario) {
      renderReplacementFlowSide(flowScenario);
      return;
    }

    renderReplacementFlowEmptyState();
    return;
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

  function renderReplacementFlowSide(flowScenario) {
    const product = getProduct();
    const modeLabel = getAlternativeModeLabel();
    const replacements = flowScenario.replacements.slice(0, 10).map((replacement) => {
      const altItem = getAlternativeSelectedItem(product, replacement.country);
      return {
        ...replacement,
        potential: altItem?.potential ?? null,
        tierLabel: altItem?.tierLabel || "",
      };
    });
    const maxPotential = Math.max(...replacements.map((item) => Number(item.potential || 0)), 0.0001);

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
        const riskKey = resolveCountryKey(replacement.country, product.risk);
        const risk = riskKey ? product.risk[riskKey] : null;
        const riskLabel = risk
          ? riskMeta(risk.level).label
          : replacement.risk || "暂无风险分级";
        const riskColor = risk ? riskMeta(risk.level).color : palette.negligible;
        const barColor = riskColor;
        const potentialText =
          replacement.potential != null ? Number(replacement.potential).toFixed(4) : "暂无";
        const width =
          replacement.potential != null
            ? Math.max(8, (Number(replacement.potential) / maxPotential) * 100)
            : 0;
        return `
          <div class="alt-rank-row alt-rank-row--flow">
            <div class="alt-rank-order">${index + 1}</div>
            <div class="alt-rank-main">
              <div class="alt-rank-head">
                <strong>${labelCountry(replacement.country)}</strong>
                <span class="alt-rank-tag" style="background:${riskColor}18;color:${riskColor};">${riskLabel}</span>
              </div>
              <div class="alt-rank-bar">
                <span style="width:${width}%;background:${barColor};"></span>
              </div>
              ${replacement.relationship ? `<div class="alt-rank-meta">${replacement.relationship}</div>` : ""}
            </div>
            <div class="alt-rank-value">
              <span class="alt-rank-value-label">潜能值</span>
              <strong class="alt-rank-value-num">${potentialText}</strong>
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
          <div class="single-chart-title">${labelCountry(flowScenario.country)} · 替代潜能</div>
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
    const selectedCountry =
      state.alternativeFlowMode && state.alternativeDisruptionCountry
        ? state.alternativeDisruptionCountry
        : getSelectedCountry(product);

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

  function getModuleCountryStyles(product) {
    const styleMap = {};
    let legend = [];
    let title = "";
    let kicker = "";
    let caption = "";
    let hiddenCountries = [];
    let replacementArrows = [];

    if (state.module === "risk") {
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
        hiddenCountries = [];
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
        caption = `当前加粗显示 ${labelCountry(sourceCountry)}，并高亮 ${candidates.length} 个可承接替代需求且不属于高风险的候选国家。`;
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

  function buildHeroMetrics(product) {
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
    els.heroMetrics.className = "metric-strip hidden";
    els.heroMetrics.innerHTML = "";
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
    document.querySelectorAll(".year-select-wrap").forEach((wrap) => {
      wrap.classList.remove("is-open");
      wrap.querySelector(".year-select-trigger")?.setAttribute("aria-expanded", "false");
    });
  }

  function ensureOverviewYearDropdownDismiss() {
    if (document.body.dataset.yearDropdownBound === "1") return;
    document.body.dataset.yearDropdownBound = "1";

    document.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".year-select-wrap")) return;
      closeOverviewYearDropdown();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeOverviewYearDropdown();
    });
  }

  function renderYearSwitcher(product) {
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
    const activeCountry =
      state.module === "alternative" && state.alternativeFlowMode && state.alternativeDisruptionCountry
        ? state.alternativeDisruptionCountry
        : state.selectedCountry;
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

      if (
        !isHiddenCountry &&
        activeCountry &&
        normalizeCountryName(matchedKey || mapName) === normalizeCountryName(activeCountry)
      ) {
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
      config.hiddenCountries = [];
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

  function formatWanTons(mtValue) {
    const value = Number(mtValue) * 100;
    if (!Number.isFinite(value)) return "--";
    return value.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatWanHa(mhValue) {
    const value = Number(mhValue) * 100;
    if (!Number.isFinite(value)) return "--";
    return value.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatYieldValue(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return "--";
    return num.toFixed(2);
  }

  function getProductionColor(ratio) {
    const stops = [
      [0, [216, 234, 223]],
      [0.35, [143, 188, 155]],
      [0.7, [63, 143, 92]],
      [1, [20, 85, 54]],
    ];
    const t = Math.min(1, Math.max(0, Number(ratio) || 0));
    let left = stops[0];
    let right = stops[stops.length - 1];
    for (let index = 0; index < stops.length - 1; index += 1) {
      if (t >= stops[index][0] && t <= stops[index + 1][0]) {
        left = stops[index];
        right = stops[index + 1];
        break;
      }
    }
    const local = (t - left[0]) / Math.max(0.0001, right[0] - left[0]);
    const mix = left[1].map((channel, index) => Math.round(channel + (right[1][index] - channel) * local));
    return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
  }

  function getHeatmapRankColor(rank) {
    const value = Number(rank);
    if (!Number.isFinite(value) || value <= 0) return "";
    if (value <= 3) return "#1f6b45";
    if (value <= 6) return "#5f8b65";
    return "#d2a543";
  }

  function getProductionTopCountries(product, yearIndex = getOverviewYearIndex(product)) {
    return Object.entries(product.producers || {})
      .map(([country, info]) => {
        const output = Number(getSeriesValue(info.output, yearIndex));
        const rankRaw = Number(getSeriesValue(info.rank, yearIndex));
        return {
          country,
          output: Number.isFinite(output) ? output : null,
          area: Number(getSeriesValue(info.area, yearIndex)),
          yield: Number(getSeriesValue(info.yield, yearIndex)),
          rank: Number.isFinite(rankRaw) && rankRaw > 0 && rankRaw <= 10 ? rankRaw : null,
        };
      })
      .filter((item) => item.output !== null && item.output > 0 && item.rank)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10);
  }

  function getProductionHeatmapCountries(product) {
    const scored = Object.entries(product.producers || {}).map(([country, info]) => {
      const bestRank = Math.min(
        ...((info.rank || []).map(Number).filter((rank) => Number.isFinite(rank) && rank > 0 && rank <= 10).concat([999])),
      );
      const latestOutput = Number(getSeriesValue(info.output, product.years.length - 1) || 0);
      return { country, bestRank, latestOutput };
    });
    return scored
      .filter((item) => item.bestRank <= 10)
      .sort((a, b) => a.bestRank - b.bestRank || b.latestOutput - a.latestOutput)
      .map((item) => item.country);
  }

  function syncDashboardLayout() {
    const isProduction = state.module === "production";
    const isTrade = state.module === "trade";
    els.capacityDashboard?.classList.toggle("hidden", !isProduction);
    els.tradeDashboard?.classList.toggle("hidden", !isTrade);
    els.dashboardGrid?.classList.toggle("hidden", isProduction || isTrade);
    els.dashboardView?.classList.toggle("dashboard-view--capacity", isProduction);
    els.dashboardView?.classList.toggle("dashboard-view--trade", isTrade);
  }

  function applyCapacityMapViewport() {
    if (!els.capacityWorldMap) return;
    const viewport = clampMapViewport(state.capacityMapViewport);
    state.capacityMapViewport = viewport;
    els.capacityWorldMap.setAttribute("viewBox", `${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}`);
    const isZoomed = viewport.width < 999.5;
    els.capacityMapStage?.closest(".capacity-map-panel")?.classList.toggle("is-map-zoomed", isZoomed);
  }

  function resetCapacityMapViewport() {
    state.capacityMapViewport = { x: 0, y: 0, width: 1000, height: 520 };
    applyCapacityMapViewport();
  }

  function zoomCapacityMap(scaleFactor, originRatioX = 0.5, originRatioY = 0.5) {
    const current = clampMapViewport(state.capacityMapViewport);
    const nextWidth = current.width / scaleFactor;
    const nextHeight = nextWidth * 0.52;
    const originX = current.x + current.width * originRatioX;
    const originY = current.y + current.height * originRatioY;
    state.capacityMapViewport = clampMapViewport({
      x: originX - nextWidth * originRatioX,
      y: originY - nextHeight * originRatioY,
      width: nextWidth,
      height: nextHeight,
    });
    applyCapacityMapViewport();
  }

  function initCapacityMapInteractions() {
    if (!els.capacityWorldMap || els.capacityWorldMap.dataset.bound === "1") return;
    els.capacityWorldMap.dataset.bound = "1";

    els.capacityMapZoomIn?.addEventListener("click", () => zoomCapacityMap(1.22));
    els.capacityMapZoomOut?.addEventListener("click", () => zoomCapacityMap(1 / 1.22));
    els.capacityMapResetView?.addEventListener("click", () => resetCapacityMapViewport());

    els.capacityWorldMap.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        const rect = els.capacityWorldMap.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const originRatioX = (event.clientX - rect.left) / rect.width;
        const originRatioY = (event.clientY - rect.top) / rect.height;
        zoomCapacityMap(event.deltaY < 0 ? 1.1 : 1 / 1.1, originRatioX, originRatioY);
      },
      { passive: false },
    );

    els.capacityWorldMap.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      els.capacityMapTooltip?.classList.add("hidden");
      state.capacityMapDrag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        viewport: { ...state.capacityMapViewport },
        moved: false,
      };
    });

    els.capacityWorldMap.addEventListener("pointermove", (event) => {
      if (!state.capacityMapDrag || state.capacityMapDrag.pointerId !== event.pointerId) return;
      const rect = els.capacityWorldMap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dx = event.clientX - state.capacityMapDrag.startX;
      const dy = event.clientY - state.capacityMapDrag.startY;
      if (!state.capacityMapDrag.moved && Math.hypot(dx, dy) > 4) {
        state.capacityMapDrag.moved = true;
        els.capacityWorldMap.setPointerCapture?.(event.pointerId);
        els.capacityMapStage?.classList.add("is-dragging");
      }
      if (!state.capacityMapDrag.moved) return;
      state.capacityMapViewport = clampMapViewport({
        x: state.capacityMapDrag.viewport.x - (dx / rect.width) * state.capacityMapDrag.viewport.width,
        y: state.capacityMapDrag.viewport.y - (dy / rect.height) * state.capacityMapDrag.viewport.height,
        width: state.capacityMapDrag.viewport.width,
        height: state.capacityMapDrag.viewport.height,
      });
      applyCapacityMapViewport();
    });

    const finishDrag = (event) => {
      if (!state.capacityMapDrag || (event?.pointerId && state.capacityMapDrag.pointerId !== event.pointerId)) return;
      if (state.capacityMapDrag.moved) state.suppressCapacityMapClickUntil = Date.now() + 220;
      els.capacityMapStage?.classList.remove("is-dragging");
      state.capacityMapDrag = null;
    };

    els.capacityWorldMap.addEventListener("pointerup", finishDrag);
    els.capacityWorldMap.addEventListener("pointercancel", finishDrag);
    els.capacityWorldMap.addEventListener("pointerleave", (event) => {
      if (state.capacityMapDrag?.pointerId === event.pointerId) finishDrag(event);
    });
  }

  function renderCapacityFilters(product) {
    ensureOverviewYear(product);
    ensureOverviewYearDropdownDismiss();
    if (!els.capacityFilters) return;

    els.capacityFilters.classList.remove("hidden");
    els.capacityFilters.innerHTML = `
      <div class="year-select-wrap" data-capacity-year-dropdown>
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
          ${product.years
            .map(
              (year) => `
                <button
                  class="year-select-option ${String(year) === String(state.selectedOverviewYear) ? "is-active" : ""}"
                  type="button"
                  role="option"
                  aria-selected="${String(year) === String(state.selectedOverviewYear)}"
                  data-capacity-year="${year}"
                >
                  ${year}年
                </button>
              `,
            )
            .join("")}
        </div>
      </div>
    `;

    const wrap = els.capacityFilters.querySelector("[data-capacity-year-dropdown]");
    const trigger = els.capacityFilters.querySelector(".year-select-trigger");
    trigger?.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !wrap.classList.contains("is-open");
      closeOverviewYearDropdown();
      wrap.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    els.capacityFilters.querySelectorAll("[data-capacity-year]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedOverviewYear = button.dataset.capacityYear;
        state.selectedCountry = null;
        closeOverviewYearDropdown();
        render();
      });
    });
  }

  function renderCapacityDependency(product) {
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || product.years.at(yearIndex));
    const dependency = Number(getSeriesValue(product.overview.externalDependency, yearIndex));
    if (els.capacityDependencyLabel) {
      els.capacityDependencyLabel.textContent = `对外进口依赖度（${selectedYear}年）`;
    }
    if (els.capacityDependencyValue) {
      els.capacityDependencyValue.textContent = Number.isFinite(dependency)
        ? `${(dependency * 100).toFixed(2)}%`
        : "--";
    }
  }

  function renderCapacityRankTable(product, topCountries) {
    const selectedYear = String(state.selectedOverviewYear || product.years.at(-1));
    if (els.capacityRankTitle) els.capacityRankTitle.textContent = `${selectedYear}年前十大主产国`;
    if (!els.capacityRankBody) return;

    els.capacityRankBody.innerHTML = topCountries
      .map((item) => {
        const active = normalizeCountryName(item.country) === normalizeCountryName(state.selectedCountry);
        return `
          <tr class="${active ? "is-active" : ""}" data-capacity-country="${item.country}">
            <td><span class="capacity-rank-index">${item.rank}</span></td>
            <td>${labelCountry(item.country)}</td>
            <td>${formatWanTons(item.output)}</td>
            <td>${formatYieldValue(item.yield)}</td>
          </tr>
        `;
      })
      .join("");

    els.capacityRankBody.querySelectorAll("[data-capacity-country]").forEach((row) => {
      row.addEventListener("click", () => {
        state.selectedCountry = row.dataset.capacityCountry;
        render();
      });
    });
  }

  function renderCapacityDetail(product, country, topCountries) {
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || product.years.at(yearIndex));
    const producerKey = resolveCountryKey(country, product.producers);
    const producer = producerKey ? product.producers[producerKey] : null;
    const ranked = topCountries.find((item) => normalizeCountryName(item.country) === normalizeCountryName(country));

    if (els.capacityDetailTitle) els.capacityDetailTitle.textContent = labelCountry(country || "请选择国家");
    if (els.capacityDetailBadge) {
      els.capacityDetailBadge.textContent = ranked ? `${selectedYear}年排名第${ranked.rank}` : "待选择";
      els.capacityDetailBadge.style.background = ranked ? "rgba(31, 107, 69, 0.12)" : "rgba(0,0,0,0.06)";
    }
    if (els.capacityBasicTitle) els.capacityBasicTitle.textContent = `基本信息（${selectedYear}年）`;
    if (els.capacityTrendTitle) {
      els.capacityTrendTitle.textContent = `${labelCountry(country || "该国")}${getProductMeta(product.id).name}产能变化（2005-2024年）`;
    }

    if (!producer || !els.capacityBasicList) {
      if (els.capacityBasicList) els.capacityBasicList.innerHTML = "";
      if (els.capacityTrendStack) els.capacityTrendStack.innerHTML = "";
      return;
    }

    const output = getSeriesValue(producer.output, yearIndex);
    const area = getSeriesValue(producer.area, yearIndex);
    const yieldValue = getSeriesValue(producer.yield, yearIndex);

    els.capacityBasicList.innerHTML = `
      <div class="capacity-basic-row"><span>产量</span><strong>${formatWanTons(output)} 万吨</strong></div>
      <div class="capacity-basic-row"><span>收获面积</span><strong>${formatWanHa(area)} 万公顷</strong></div>
      <div class="capacity-basic-row"><span>单产</span><strong>${formatYieldValue(yieldValue)} 吨/公顷</strong></div>
      <div class="capacity-basic-row"><span>当年排名</span><strong>第 ${ranked?.rank || "--"} 名</strong></div>
    `;

    const chartOutput = (producer.output || []).map((value) => (value === null || value === undefined ? null : Number(value) * 100));
    const chartArea = (producer.area || []).map((value) => (value === null || value === undefined ? null : Number(value) * 100));

    els.capacityTrendStack.innerHTML = `
      <article class="capacity-trend-card">
        <div class="capacity-trend-head"><span>产量变化（万吨）</span></div>
        ${makeLineChart(chartOutput, product.years, "#1f6b45", { compact: true, showAllYears: true, format: "wantons", label: "产量" })}
      </article>
      <article class="capacity-trend-card">
        <div class="capacity-trend-head"><span>面积变化（万公顷）</span></div>
        ${makeLineChart(chartArea, product.years, "#3f8f5c", { compact: true, showAllYears: true, format: "area", label: "面积" })}
      </article>
      <article class="capacity-trend-card">
        <div class="capacity-trend-head"><span>单产变化（吨/公顷）</span></div>
        ${makeLineChart(producer.yield, product.years, "#7a5ea8", { compact: true, showAllYears: true, format: "yield", label: "单产" })}
      </article>
    `;
    enhanceCapacityTrendCards();
  }

  function renderCapacityHeatmap(product) {
    const meta = getProductMeta(product.id);
    if (els.capacityHeatmapTitle) {
      els.capacityHeatmapTitle.textContent = `${meta.name}主要主产国历年产量排名变化（2005—2024年）`;
    }
    if (els.capacityHeatmapLegend) {
      els.capacityHeatmapLegend.innerHTML = `
        <span class="capacity-heat-legend-item"><i style="background:#1f6b45"></i>1-3名</span>
        <span class="capacity-heat-legend-item"><i style="background:#5f8b65"></i>4-6名</span>
        <span class="capacity-heat-legend-item"><i style="background:#d2a543"></i>7-10名</span>
      `;
    }
    if (!els.capacityHeatmapWrap) return;

    const countries = getProductionHeatmapCountries(product);
    const years = product.years || [];
    els.capacityHeatmapWrap.innerHTML = `
      <table class="capacity-heatmap-table">
        <thead>
          <tr>
            <th>国家</th>
            ${years.map((year) => `<th>${year}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${countries
            .map((country) => {
              const info = product.producers[country] || {};
              return `
                <tr>
                  <th>${labelCountry(country)}</th>
                  ${years
                    .map((_, index) => {
                      const rank = Number(getSeriesValue(info.rank, index));
                      if (!Number.isFinite(rank) || rank <= 0 || rank > 10) return `<td class="is-empty">-</td>`;
                      const color = getHeatmapRankColor(rank);
                      return `<td style="background:${color}33;color:#1d2a33;"><strong>${rank}</strong></td>`;
                    })
                    .join("")}
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;
  }

  function drawCapacityMap(product, topCountries) {
    if (!els.capacityWorldMap) return;
    const selectedYear = String(state.selectedOverviewYear || product.years.at(-1));
    if (els.capacityMapKicker) els.capacityMapKicker.textContent = "主产国分布";
    if (els.capacityMapTitle) {
      els.capacityMapTitle.textContent = `${selectedYear}年世界${getProductMeta(product.id).name}主产国分布（前十国）`;
    }
    if (els.capacityMapCaption) {
      els.capacityMapCaption.textContent = `注：地图颜色深浅表示该国${getProductMeta(product.id).name}产量大小`;
    }

    els.capacityWorldMap.innerHTML = "";
    applyCapacityMapViewport();

    if (!state.geoJson) {
      els.capacityWorldMap.innerHTML = '<text x="500" y="260" text-anchor="middle" fill="#627061" font-size="18">地图数据加载中...</text>';
      return;
    }

    const maxOutput = Math.max(...topCountries.map((item) => item.output || 0), 0.0001);
    const styleMap = Object.fromEntries(
      topCountries.map((item) => [item.country, { fill: getProductionColor((item.output || 0) / maxOutput), rank: item.rank }]),
    );

    // backdrop oceans / land fill similar to main map
    const ocean = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    ocean.setAttribute("x", "0");
    ocean.setAttribute("y", "0");
    ocean.setAttribute("width", "1000");
    ocean.setAttribute("height", "520");
    ocean.setAttribute("fill", "#eef4f0");
    els.capacityWorldMap.appendChild(ocean);

    state.geoJson.features.forEach((feature) => {
      const mapName = feature.properties?.name;
      const matchedKey = resolveCountryKey(mapName, Object.keys(styleMap));
      const pathData = geometryToPath(feature.geometry);
      if (!pathData) return;
      const node = document.createElementNS("http://www.w3.org/2000/svg", "path");
      node.setAttribute("d", pathData);
      node.setAttribute("fill", matchedKey ? styleMap[matchedKey].fill : "#d9e2dc");
      node.setAttribute("stroke", "rgba(31,107,69,0.18)");
      node.setAttribute("stroke-width", "0.7");
      node.setAttribute("class", "country-shape");
      node.setAttribute("data-country", matchedKey || mapName);
      if (matchedKey && normalizeCountryName(matchedKey) === normalizeCountryName(state.selectedCountry)) {
        node.classList.add("is-active");
        node.setAttribute("stroke", "#1f6b45");
        node.setAttribute("stroke-width", "1.6");
      }
      node.addEventListener("mouseenter", (event) => {
        const producerKey = resolveCountryKey(mapName, product.producers);
        const tip = els.capacityMapTooltip;
        if (!tip) return;
        const ranked = topCountries.find((item) => normalizeCountryName(item.country) === normalizeCountryName(producerKey || mapName));
        tip.classList.remove("hidden");
        tip.innerHTML = `
          <strong>${labelCountry(producerKey || mapName)}</strong>
          <div>${ranked ? `排名第 ${ranked.rank}` : "未进入前十"}</div>
          <div>产量：${ranked ? `${formatWanTons(ranked.output)} 万吨` : "--"}</div>
        `;
        const box = els.capacityWorldMap.getBoundingClientRect();
        tip.style.left = `${event.clientX - box.left + 14}px`;
        tip.style.top = `${event.clientY - box.top + 14}px`;
      });
      node.addEventListener("mousemove", (event) => {
        const tip = els.capacityMapTooltip;
        if (!tip || tip.classList.contains("hidden")) return;
        const box = els.capacityWorldMap.getBoundingClientRect();
        tip.style.left = `${event.clientX - box.left + 14}px`;
        tip.style.top = `${event.clientY - box.top + 14}px`;
      });
      node.addEventListener("mouseleave", () => els.capacityMapTooltip?.classList.add("hidden"));
      node.addEventListener("click", () => {
        if (Date.now() < state.suppressCapacityMapClickUntil) return;
        const next = resolveCountryKey(mapName, Object.keys(product.producers || {}));
        if (!next) return;
        state.selectedCountry = next;
        render();
      });
      els.capacityWorldMap.appendChild(node);
    });

    topCountries.forEach((item) => {
      const point = getCountryAnchorPoint(item.country);
      if (!point) return;
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.setAttribute("class", "capacity-rank-marker");
      group.style.cursor = "pointer";
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", point[0]);
      circle.setAttribute("cy", point[1]);
      circle.setAttribute("r", "11");
      circle.setAttribute("fill", "#1f6b45");
      circle.setAttribute("stroke", "#ffffff");
      circle.setAttribute("stroke-width", "2");
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", point[0]);
      text.setAttribute("y", point[1] + 4);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("fill", "#ffffff");
      text.setAttribute("font-size", "11");
      text.setAttribute("font-weight", "700");
      text.textContent = String(item.rank);
      group.appendChild(circle);
      group.appendChild(text);
      group.addEventListener("click", () => {
        state.selectedCountry = item.country;
        render();
      });
      els.capacityWorldMap.appendChild(group);
    });
  }

  function getCountryAnchorPoint(countryName) {
    if (typeof getCountryAnchor === "function") {
      const anchor = getCountryAnchor(countryName);
      if (anchor) return anchor;
    }
    const coordinateKey = resolveCountryKey(countryName, appData.countryCoordinates || {});
    if (coordinateKey && Array.isArray(appData.countryCoordinates?.[coordinateKey])) {
      return appData.countryCoordinates[coordinateKey];
    }
    return null;
  }

  function renderCapacityDashboard(product) {
    ensureOverviewYear(product);
    const topCountries = getProductionTopCountries(product);
    if (!state.selectedCountry || !resolveCountryKey(state.selectedCountry, topCountries.map((item) => item.country))) {
      state.selectedCountry = topCountries[0]?.country || null;
    } else {
      state.selectedCountry = resolveCountryKey(state.selectedCountry, topCountries.map((item) => item.country));
    }

    renderCapacityFilters(product);
    renderCapacityDependency(product);
    drawCapacityMap(product, topCountries);
    renderCapacityRankTable(product, topCountries);
    renderCapacityDetail(product, state.selectedCountry, topCountries);
    renderCapacityHeatmap(product);
    initChartInteractions();
    hideChartTooltip();
  }

  function formatTradeVolume(mtValue) {
    return formatWanTons(mtValue);
  }

  function formatTradeValue(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return "--";
    return num.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatTradePrice(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return "--";
    return num.toFixed(2);
  }

  function formatYoy(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return { text: "--", className: "" };
    const sign = num > 0 ? "+" : "";
    return {
      text: `${sign}${num.toFixed(2)}%`,
      className: num > 0 ? "is-up" : num < 0 ? "is-down" : "",
    };
  }

  function getTradeOverview(product) {
    if (product.tradeOverview) return product.tradeOverview;

    const years = product.years || [];
    const imports = Object.values(product.imports || {});
    const volume = (product.importTrend || []).map((value) => (
      value === null || value === undefined ? null : Number(value) * 100
    ));
    const value = years.map((_, index) => {
      const sum = imports.reduce((total, info) => {
        const item = Number(getSeriesValue(info.value, index));
        return total + (Number.isFinite(item) ? item : 0);
      }, 0);
      return sum > 0 ? Number(sum.toFixed(4)) : null;
    });
    const price = years.map((_, index) => {
      const volMt = Number(getSeriesValue(product.importTrend, index));
      const val = Number(value[index]);
      if (!Number.isFinite(volMt) || volMt <= 0 || !Number.isFinite(val)) return null;
      // 贸易额(百万美元) / 进口量(百万吨) = 美元/吨
      return Number((val / volMt).toFixed(4));
    });

    return {
      volume,
      value,
      price,
      volumeYoy: years.map(() => null),
      valueYoy: years.map(() => null),
      priceYoy: years.map(() => null),
    };
  }

  function getTradeTopCountries(product, yearIndex = getOverviewYearIndex(product)) {
    return Object.entries(product.imports || {})
      .map(([country, info]) => {
        const volume = Number(getSeriesValue(info.volume, yearIndex));
        return {
          country,
          volume: Number.isFinite(volume) && volume > 0 ? volume : null,
          value: Number(getSeriesValue(info.value, yearIndex)),
          price: Number(getSeriesValue(info.price, yearIndex)),
          concentration: Number(getSeriesValue(info.dependency, yearIndex)),
        };
      })
      .filter((item) => item.volume !== null)
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 5)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }

  function makeBarChart(values, years, color, options = {}) {
    const width = options.width || 320;
    const height = options.height || 150;
    const pad = { top: 16, right: 12, bottom: 28, left: 42 };
    const chartId = `bar-${++chartInstanceId}`;
    const points = years.map((year, index) => {
      const raw = values[index];
      const numeric = Number(raw);
      return {
        year,
        index,
        value: raw === null || raw === undefined || !Number.isFinite(numeric) ? null : numeric,
      };
    }).filter((item) => item.value !== null);

    if (!points.length) {
      return `<div class="chart-caption">暂无数据</div>`;
    }

    const axis = buildChartYAxis(points.map((item) => item.value), options.format || "");
    const innerW = width - pad.left - pad.right;
    const innerH = height - pad.top - pad.bottom;
    const barWidth = Math.max(4, Math.min(18, (innerW / Math.max(years.length, 1)) * 0.62));

    const bars = years.map((year, index) => {
      const raw = values[index];
      const numeric = Number(raw);
      if (raw === null || raw === undefined || !Number.isFinite(numeric)) return "";
      const x = pad.left + (index + 0.5) * (innerW / Math.max(years.length, 1)) - barWidth / 2;
      const y = pad.top + ((axis.max - numeric) / Math.max(axis.max - axis.min, 0.0001)) * innerH;
      const h = Math.max(1, pad.top + innerH - y);
      const label = formatChartValue(numeric, options.format);
      return `
        <rect class="trade-bar" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${barWidth.toFixed(2)}" height="${h.toFixed(2)}" fill="${color}" rx="3"></rect>
        <rect class="chart-hit-point" data-year="${year}" data-label="${options.label || "数值"}" data-value="${label}" data-index="${index}"
          x="${(x - 4).toFixed(2)}" y="${pad.top}" width="${(barWidth + 8).toFixed(2)}" height="${innerH}" fill="transparent"></rect>
      `;
    }).join("");

    const yTicks = (axis.ticks || []).map((tick) => {
      const y = pad.top + ((axis.max - tick) / Math.max(axis.max - axis.min, 0.0001)) * innerH;
      return `
        <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="rgba(45,79,53,0.08)" stroke-width="1"></line>
        <text x="${pad.left - 6}" y="${y + 3}" text-anchor="end" fill="#7a877c" font-size="10">${formatChartAxisValue(tick, options.format)}</text>
      `;
    }).join("");

    const xLabels = years.map((year, index) => {
      if (years.length > 12 && index % 4 !== 0 && index !== years.length - 1) return "";
      const x = pad.left + (index + 0.5) * (innerW / Math.max(years.length, 1));
      return `<text x="${x.toFixed(2)}" y="${height - 8}" text-anchor="middle" fill="#7a877c" font-size="10">${year}</text>`;
    }).join("");

    return `
      <div class="line-chart-wrap" data-chart-id="${chartId}">
        <svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img">
          ${yTicks}
          ${bars}
          ${xLabels}
        </svg>
      </div>
    `;
  }

  function applyTradeMapViewport() {
    if (!els.tradeWorldMap) return;
    const viewport = clampMapViewport(state.tradeMapViewport);
    state.tradeMapViewport = viewport;
    els.tradeWorldMap.setAttribute("viewBox", `${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}`);
    const isZoomed = viewport.width < 999.5;
    els.tradeMapStage?.closest(".trade-map-panel")?.classList.toggle("is-map-zoomed", isZoomed);
  }

  function resetTradeMapViewport() {
    state.tradeMapViewport = { x: 0, y: 0, width: 1000, height: 520 };
    applyTradeMapViewport();
  }

  function zoomTradeMap(scaleFactor, originRatioX = 0.5, originRatioY = 0.5) {
    const current = clampMapViewport(state.tradeMapViewport);
    const nextWidth = current.width / scaleFactor;
    const nextHeight = nextWidth * 0.52;
    const originX = current.x + current.width * originRatioX;
    const originY = current.y + current.height * originRatioY;
    state.tradeMapViewport = clampMapViewport({
      x: originX - nextWidth * originRatioX,
      y: originY - nextHeight * originRatioY,
      width: nextWidth,
      height: nextHeight,
    });
    applyTradeMapViewport();
  }

  function initTradeMapInteractions() {
    if (!els.tradeWorldMap || els.tradeWorldMap.dataset.bound === "1") return;
    els.tradeWorldMap.dataset.bound = "1";

    els.tradeMapZoomIn?.addEventListener("click", () => zoomTradeMap(1.22));
    els.tradeMapZoomOut?.addEventListener("click", () => zoomTradeMap(1 / 1.22));
    els.tradeMapResetView?.addEventListener("click", () => resetTradeMapViewport());

    els.tradeWorldMap.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        const rect = els.tradeWorldMap.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        zoomTradeMap(
          event.deltaY < 0 ? 1.1 : 1 / 1.1,
          (event.clientX - rect.left) / rect.width,
          (event.clientY - rect.top) / rect.height,
        );
      },
      { passive: false },
    );

    els.tradeWorldMap.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      els.tradeMapTooltip?.classList.add("hidden");
      state.tradeMapDrag = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        viewport: { ...state.tradeMapViewport },
        moved: false,
      };
    });

    els.tradeWorldMap.addEventListener("pointermove", (event) => {
      if (!state.tradeMapDrag || state.tradeMapDrag.pointerId !== event.pointerId) return;
      const rect = els.tradeWorldMap.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dx = event.clientX - state.tradeMapDrag.startX;
      const dy = event.clientY - state.tradeMapDrag.startY;
      if (!state.tradeMapDrag.moved && Math.hypot(dx, dy) > 4) {
        state.tradeMapDrag.moved = true;
        els.tradeWorldMap.setPointerCapture?.(event.pointerId);
        els.tradeMapStage?.classList.add("is-dragging");
      }
      if (!state.tradeMapDrag.moved) return;
      state.tradeMapViewport = clampMapViewport({
        x: state.tradeMapDrag.viewport.x - (dx / rect.width) * state.tradeMapDrag.viewport.width,
        y: state.tradeMapDrag.viewport.y - (dy / rect.height) * state.tradeMapDrag.viewport.height,
        width: state.tradeMapDrag.viewport.width,
        height: state.tradeMapDrag.viewport.height,
      });
      applyTradeMapViewport();
    });

    const finishDrag = (event) => {
      if (!state.tradeMapDrag || (event?.pointerId && state.tradeMapDrag.pointerId !== event.pointerId)) return;
      if (state.tradeMapDrag.moved) state.suppressTradeMapClickUntil = Date.now() + 220;
      els.tradeMapStage?.classList.remove("is-dragging");
      state.tradeMapDrag = null;
    };

    els.tradeWorldMap.addEventListener("pointerup", finishDrag);
    els.tradeWorldMap.addEventListener("pointercancel", finishDrag);
    els.tradeWorldMap.addEventListener("pointerleave", (event) => {
      if (state.tradeMapDrag?.pointerId === event.pointerId) finishDrag(event);
    });
  }

  function renderTradeFilters(product) {
    ensureOverviewYear(product);
    ensureOverviewYearDropdownDismiss();
    if (!els.tradeFilters) return;
    els.tradeFilters.classList.remove("hidden");
    els.tradeFilters.innerHTML = `
      <div class="year-select-wrap" data-trade-year-dropdown>
        <span class="year-select-label">年份</span>
        <button class="year-select-trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="选择年份">
          <span class="year-select-value">${state.selectedOverviewYear}年</span>
        </button>
        <div class="year-select-menu" role="listbox" aria-label="年份选项">
          ${product.years
            .map(
              (year) => `
                <button class="year-select-option ${String(year) === String(state.selectedOverviewYear) ? "is-active" : ""}" type="button" role="option"
                  aria-selected="${String(year) === String(state.selectedOverviewYear)}" data-trade-year="${year}">${year}年</button>
              `,
            )
            .join("")}
        </div>
      </div>
    `;
    const wrap = els.tradeFilters.querySelector("[data-trade-year-dropdown]");
    const trigger = els.tradeFilters.querySelector(".year-select-trigger");
    trigger?.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !wrap.classList.contains("is-open");
      closeOverviewYearDropdown();
      wrap.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
    els.tradeFilters.querySelectorAll("[data-trade-year]").forEach((button) => {
      button.addEventListener("click", () => {
        state.selectedOverviewYear = button.dataset.tradeYear;
        state.selectedCountry = null;
        closeOverviewYearDropdown();
        render();
      });
    });
  }

  function renderTradeMetrics(product) {
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || product.years.at(yearIndex));
    const overview = getTradeOverview(product);
    const volumeRaw = Number(getSeriesValue(overview.volume, yearIndex));
    const valueRaw = Number(getSeriesValue(overview.value, yearIndex));
    const priceRaw = Number(getSeriesValue(overview.price, yearIndex));
    const volumeYoy = formatYoy(getSeriesValue(overview.volumeYoy, yearIndex));
    const valueYoy = formatYoy(getSeriesValue(overview.valueYoy, yearIndex));
    const priceYoy = formatYoy(getSeriesValue(overview.priceYoy, yearIndex));
    if (!els.tradeMetrics) return;
    els.tradeMetrics.innerHTML = [
      {
        label: "总进口量",
        // tradeOverview.volume 已是万吨
        value: Number.isFinite(volumeRaw) ? formatTradeValue(volumeRaw) : "--",
        unit: "万吨",
        yoy: volumeYoy,
        note: selectedYear,
      },
      {
        label: "总贸易额",
        value: Number.isFinite(valueRaw) ? formatTradeValue(valueRaw) : "--",
        unit: "百万美元",
        yoy: valueYoy,
        note: selectedYear,
      },
      {
        label: "加权平均进口价",
        value: Number.isFinite(priceRaw) ? formatTradePrice(priceRaw) : "--",
        unit: "美元/吨",
        yoy: priceYoy,
        note: selectedYear,
      },
    ]
      .map(
        (card) => `
          <article class="trade-metric-card">
            <div class="trade-metric-label">${card.label}</div>
            <div class="trade-metric-value-row">
              <strong>${card.value}</strong>
              <span>${card.unit}</span>
            </div>
            <div class="trade-metric-yoy ${card.yoy.className}">同比 ${card.yoy.text}</div>
          </article>
        `,
      )
      .join("");
  }

  function renderTradeRankTable(product, topCountries) {
    const selectedYear = String(state.selectedOverviewYear || product.years.at(-1));
    if (els.tradeRankTitle) els.tradeRankTitle.textContent = `${selectedYear}年前五大进口来源国`;
    if (!els.tradeRankBody) return;
    els.tradeRankBody.innerHTML = topCountries
      .map((item) => {
        const active = normalizeCountryName(item.country) === normalizeCountryName(state.selectedCountry);
        const concentration = Number.isFinite(item.concentration) ? `${(item.concentration * 100).toFixed(2)}%` : "--";
        return `
          <tr class="${active ? "is-active" : ""}" data-trade-country="${item.country}">
            <td><span class="capacity-rank-index">${item.rank}</span></td>
            <td>${labelCountry(item.country)}</td>
            <td>${formatTradeVolume(item.volume)}</td>
            <td>${concentration}</td>
          </tr>
        `;
      })
      .join("");
    els.tradeRankBody.querySelectorAll("[data-trade-country]").forEach((row) => {
      row.addEventListener("click", () => {
        state.selectedCountry = row.dataset.tradeCountry;
        render();
      });
    });
  }

  function renderTradeDetail(product, country, topCountries) {
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || product.years.at(yearIndex));
    const importKey = resolveCountryKey(country, product.imports);
    const importer = importKey ? product.imports[importKey] : null;
    const ranked = topCountries.find((item) => normalizeCountryName(item.country) === normalizeCountryName(country));

    if (els.tradeDetailTitle) els.tradeDetailTitle.textContent = labelCountry(country || "请选择国家");
    if (els.tradeDetailBadge) {
      els.tradeDetailBadge.textContent = ranked ? `${selectedYear}年排名第${ranked.rank}` : "待选择";
      els.tradeDetailBadge.style.background = ranked ? "rgba(31, 107, 69, 0.12)" : "rgba(0,0,0,0.06)";
    }
    if (els.tradeBasicTitle) els.tradeBasicTitle.textContent = `${selectedYear}年数据概览`;
    if (els.tradeTrendTitle) {
      els.tradeTrendTitle.textContent = `自${labelCountry(country || "该国")}进口变化（2005-2024年）`;
    }

    if (!importer || !els.tradeBasicList) {
      if (els.tradeBasicList) els.tradeBasicList.innerHTML = "";
      if (els.tradeTrendStack) els.tradeTrendStack.innerHTML = "";
      return;
    }

    const volume = getSeriesValue(importer.volume, yearIndex);
    const value = getSeriesValue(importer.value, yearIndex);
    const concentration = getSeriesValue(importer.dependency, yearIndex);
    els.tradeBasicList.innerHTML = `
      <div class="capacity-basic-row"><span>进口量</span><strong>${formatTradeVolume(volume)} 万吨</strong></div>
      <div class="capacity-basic-row"><span>贸易额</span><strong>${formatTradeValue(value)} 百万美元</strong></div>
      <div class="capacity-basic-row"><span>集中度</span><strong>${Number.isFinite(Number(concentration)) ? `${(Number(concentration) * 100).toFixed(2)}%` : "--"}</strong></div>
    `;

    const chartVolume = (importer.volume || []).map((item) => (item === null || item === undefined ? null : Number(item) * 100));
    const chartConcentration = (importer.dependency || []).map((item) => (item === null || item === undefined ? null : Number(item) * 100));

    els.tradeTrendStack.innerHTML = `
      <article class="capacity-trend-card">
        <div class="capacity-trend-head"><span>进口量变化（万吨）</span></div>
        ${makeLineChart(chartVolume, product.years, "#1f6b45", { compact: true, showAllYears: true, format: "wantons", label: "进口量" })}
      </article>
      <article class="capacity-trend-card">
        <div class="capacity-trend-head"><span>贸易额变化（百万美元）</span></div>
        ${makeLineChart(importer.value || [], product.years, "#3f8f5c", { compact: true, showAllYears: true, label: "贸易额" })}
      </article>
      <article class="capacity-trend-card">
        <div class="capacity-trend-head"><span>进口集中度变化（%）</span></div>
        ${makeLineChart(chartConcentration, product.years, "#7a5ea8", { compact: true, showAllYears: true, format: "percent", label: "集中度" })}
      </article>
    `;
    enhanceTradeTrendCards();
  }

  function enhanceTradeTrendCards() {
    if (!els.tradeTrendStack) return;
    const cards = Array.from(els.tradeTrendStack.querySelectorAll(".capacity-trend-card"));
    const kinds = ["trade_volume", "trade_value", "trade_concentration"];
    cards.forEach((card, index) => {
      const kind = kinds[index];
      if (!kind) return;
      card.classList.add("chart-card--interactive", "capacity-trend-card--interactive");
      card.setAttribute("data-open-detail-modal", kind);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      const head = card.querySelector(".capacity-trend-head");
      if (head && !card.querySelector(".chart-expand-hint")) {
        const hint = document.createElement("span");
        hint.className = "chart-expand-hint";
        hint.textContent = "点击查看大图";
        head.appendChild(hint);
      }
    });
  }

  function buildTradeTrendModal(product, country, modalKind) {
    const importKey = resolveCountryKey(country, product.imports);
    const importer = importKey ? product.imports[importKey] : null;
    const years = product.years;
    const yearIndex = getOverviewYearIndex(product);
    const selectedYear = String(state.selectedOverviewYear || years.at(yearIndex));
    const volumeSeries = (importer?.volume || []).map((value) => (value === null || value === undefined ? null : Number(value) * 100));
    const concentrationSeries = (importer?.dependency || []).map((value) => (value === null || value === undefined ? null : Number(value) * 100));
    const volumeValues = getAvailableSeriesValues(volumeSeries);
    const valueValues = getAvailableSeriesValues(importer?.value);
    const concentrationValues = getAvailableSeriesValues(concentrationSeries);

    const configMap = {
      trade_volume: {
        title: `自${labelCountry(country)}进口量变化（万吨）`,
        color: "#1f6b45",
        format: "wantons",
        label: "进口量",
        series: volumeSeries,
        note: "用于观察中国自该来源国进口规模的长期变化。",
        stats: importer
          ? [
              { label: `${selectedYear}进口量`, value: `${formatTradeVolume(getSeriesValue(importer.volume, yearIndex))} 万吨` },
              { label: "近年峰值", value: volumeValues.length ? `${formatTradeVolume(Math.max(...volumeValues) / 100)} 万吨` : "暂无数据" },
              { label: "近年均值", value: volumeValues.length ? `${formatTradeVolume(volumeValues.reduce((sum, value) => sum + value, 0) / volumeValues.length / 100)} 万吨` : "暂无数据" },
            ]
          : [],
      },
      trade_value: {
        title: `与${labelCountry(country)}贸易额变化（百万美元）`,
        color: "#3f8f5c",
        format: "",
        label: "贸易额",
        series: importer?.value || [],
        note: "用于观察中国与该来源国贸易金额的变化。",
        stats: importer
          ? [
              { label: `${selectedYear}贸易额`, value: `${formatTradeValue(getSeriesValue(importer.value, yearIndex))} 百万美元` },
              { label: "近年峰值", value: valueValues.length ? `${formatTradeValue(Math.max(...valueValues))} 百万美元` : "暂无数据" },
              { label: "近年均值", value: valueValues.length ? `${formatTradeValue(valueValues.reduce((sum, value) => sum + value, 0) / valueValues.length)} 百万美元` : "暂无数据" },
            ]
          : [],
      },
      trade_concentration: {
        title: `${labelCountry(country)}进口集中度变化（%）`,
        color: "#7a5ea8",
        format: "percent",
        label: "集中度",
        series: concentrationSeries,
        note: "用于观察中国对该来源国进口依赖是否升高或回落。",
        stats: importer
          ? [
              { label: `${selectedYear}集中度`, value: formatOptionalSeriesValue(importer.dependency, yearIndex, formatPct) },
              { label: "近年峰值", value: concentrationValues.length ? `${Math.max(...concentrationValues).toFixed(2)}%` : "暂无数据" },
              { label: "近年均值", value: concentrationValues.length ? `${(concentrationValues.reduce((sum, value) => sum + value, 0) / concentrationValues.length).toFixed(2)}%` : "暂无数据" },
            ]
          : [],
      },
      trade_overall_volume: null,
      trade_overall_value: null,
      trade_overall_price: null,
    };

    if (modalKind.startsWith("trade_overall_")) {
      const overview = getTradeOverview(product);
      const overallMap = {
        trade_overall_volume: {
          title: "总进口量变化（万吨）",
          color: "#1f6b45",
          format: "wantons",
          label: "总进口量",
          series: overview.volume || [],
          note: "中国该品种年度总进口量变化。",
          chart: "bar",
        },
        trade_overall_value: {
          title: "总贸易额变化（百万美元）",
          color: "#3f8f5c",
          format: "",
          label: "总贸易额",
          series: overview.value || [],
          note: "中国该品种年度总贸易额变化。",
          chart: "bar",
        },
        trade_overall_price: {
          title: "加权平均进口价变化（美元/吨）",
          color: "#7a5ea8",
          format: "price",
          label: "加权均价",
          series: overview.price || [],
          note: "中国该品种年度加权平均进口价格变化。",
          chart: "line",
        },
      };
      const config = overallMap[modalKind];
      const seriesValues = getAvailableSeriesValues(config.series);
      return `
        <div class="modal-content modal-content--single-chart">
          <div class="modal-header">
            <div>
              <p class="panel-kicker">Trade Detail</p>
              <h3 class="modal-title" id="detailModalTitle">${config.title}</h3>
              <p class="modal-copy">总体趋势指标已展开为大图，便于观察年度变化。</p>
            </div>
          </div>
          <div class="modal-metrics modal-metrics--triple">
            <article class="metric-card"><div class="metric-label">${selectedYear}</div><div class="metric-value">${formatChartValue(getSeriesValue(config.series, yearIndex), config.format)}</div></article>
            <article class="metric-card"><div class="metric-label">近年峰值</div><div class="metric-value">${seriesValues.length ? formatChartValue(Math.max(...seriesValues), config.format) : "--"}</div></article>
            <article class="metric-card"><div class="metric-label">近年均值</div><div class="metric-value">${seriesValues.length ? formatChartValue(seriesValues.reduce((sum, value) => sum + value, 0) / seriesValues.length, config.format) : "--"}</div></article>
          </div>
          <div class="modal-chart-stack">
            <article class="modal-chart-card modal-chart-card--wide">
              <h4>${config.title}</h4>
              <div class="single-chart single-chart--modal">
                ${
                  config.chart === "bar"
                    ? makeBarChart(config.series, years, config.color, { width: 980, height: 360, format: config.format, label: config.label })
                    : makeLineChart(config.series, years, config.color, { width: 980, height: 360, showAllYears: true, format: config.format, label: config.label })
                }
              </div>
              <p class="modal-chart-note">${config.note}</p>
            </article>
          </div>
        </div>
      `;
    }

    const config = configMap[modalKind];
    if (!importer || !config) {
      return `<div class="modal-content modal-content--empty"><div class="modal-header"><div><h3 class="modal-title" id="detailModalTitle">暂无数据</h3></div></div></div>`;
    }
    return `
      <div class="modal-content modal-content--single-chart">
        <div class="modal-header">
          <div>
            <p class="panel-kicker">Trade Detail</p>
            <h3 class="modal-title" id="detailModalTitle">${config.title}</h3>
            <p class="modal-copy">${labelCountry(country)} 的这项进口指标已展开为大图。</p>
          </div>
        </div>
        <div class="modal-metrics modal-metrics--triple">
          ${config.stats.map((item) => `<article class="metric-card"><div class="metric-label">${item.label}</div><div class="metric-value">${item.value}</div></article>`).join("")}
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

  function renderTradeOverallCharts(product) {
    const meta = getProductMeta(product.id);
    const overview = getTradeOverview(product);
    if (els.tradeOverallTitle) {
      els.tradeOverallTitle.textContent = `中国${meta.name}进口总体趋势（2005—2024年）`;
    }
    if (!els.tradeOverallCharts) return;
    els.tradeOverallCharts.innerHTML = `
      <article class="capacity-trend-card chart-card--interactive" data-open-detail-modal="trade_overall_volume" role="button" tabindex="0">
        <div class="capacity-trend-head"><span>总进口量（万吨）</span><span class="chart-expand-hint">点击查看大图</span></div>
        ${makeBarChart(overview.volume || [], product.years, "#1f6b45", { format: "wantons", label: "总进口量" })}
      </article>
      <article class="capacity-trend-card chart-card--interactive" data-open-detail-modal="trade_overall_value" role="button" tabindex="0">
        <div class="capacity-trend-head"><span>总贸易额（百万美元）</span><span class="chart-expand-hint">点击查看大图</span></div>
        ${makeBarChart(overview.value || [], product.years, "#3f8f5c", { label: "总贸易额" })}
      </article>
      <article class="capacity-trend-card chart-card--interactive" data-open-detail-modal="trade_overall_price" role="button" tabindex="0">
        <div class="capacity-trend-head"><span>加权平均进口价（美元/吨）</span><span class="chart-expand-hint">点击查看大图</span></div>
        ${makeLineChart(overview.price || [], product.years, "#7a5ea8", { compact: true, showAllYears: true, format: "price", label: "加权均价" })}
      </article>
    `;
  }

  function drawTradeMap(product, topCountries) {
    if (!els.tradeWorldMap) return;
    const selectedYear = String(state.selectedOverviewYear || product.years.at(-1));
    const meta = getProductMeta(product.id);
    if (els.tradeMapKicker) els.tradeMapKicker.textContent = "进口来源分布";
    if (els.tradeMapTitle) els.tradeMapTitle.textContent = `${selectedYear}年中国${meta.name}进口来源分布（前五大）`;
    if (els.tradeMapCaption) els.tradeMapCaption.textContent = `注：地图颜色深浅表示中国自该国${meta.name}进口量大小`;

    els.tradeWorldMap.innerHTML = "";
    applyTradeMapViewport();
    if (!state.geoJson) {
      els.tradeWorldMap.innerHTML = '<text x="500" y="260" text-anchor="middle" fill="#627061" font-size="18">地图数据加载中...</text>';
      return;
    }

    const maxVolume = Math.max(...topCountries.map((item) => item.volume || 0), 0.0001);
    const styleMap = Object.fromEntries(
      topCountries.map((item) => [item.country, { fill: getProductionColor((item.volume || 0) / maxVolume), rank: item.rank }]),
    );

    const ocean = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    ocean.setAttribute("x", "0");
    ocean.setAttribute("y", "0");
    ocean.setAttribute("width", "1000");
    ocean.setAttribute("height", "520");
    ocean.setAttribute("fill", "#eef4f0");
    els.tradeWorldMap.appendChild(ocean);

    state.geoJson.features.forEach((feature) => {
      const mapName = feature.properties?.name;
      const matchedKey = resolveCountryKey(mapName, Object.keys(styleMap));
      const pathData = geometryToPath(feature.geometry);
      if (!pathData) return;
      const node = document.createElementNS("http://www.w3.org/2000/svg", "path");
      node.setAttribute("d", pathData);
      node.setAttribute("fill", matchedKey ? styleMap[matchedKey].fill : "#d9e2dc");
      node.setAttribute("stroke", "rgba(31,107,69,0.18)");
      node.setAttribute("stroke-width", "0.7");
      node.setAttribute("class", "country-shape");
      node.setAttribute("data-country", matchedKey || mapName);
      if (matchedKey && normalizeCountryName(matchedKey) === normalizeCountryName(state.selectedCountry)) {
        node.classList.add("is-active");
        node.setAttribute("stroke", "#1f6b45");
        node.setAttribute("stroke-width", "1.6");
      }
      node.addEventListener("mouseenter", (event) => {
        const tip = els.tradeMapTooltip;
        if (!tip) return;
        const ranked = topCountries.find((item) => normalizeCountryName(item.country) === normalizeCountryName(matchedKey || mapName));
        tip.classList.remove("hidden");
        tip.innerHTML = `
          <strong>${labelCountry(matchedKey || mapName)}</strong>
          <div>${ranked ? `排名第 ${ranked.rank}` : "未进入前五"}</div>
          <div>进口量：${ranked ? `${formatTradeVolume(ranked.volume)} 万吨` : "--"}</div>
        `;
        const box = els.tradeWorldMap.getBoundingClientRect();
        tip.style.left = `${event.clientX - box.left + 14}px`;
        tip.style.top = `${event.clientY - box.top + 14}px`;
      });
      node.addEventListener("mousemove", (event) => {
        const tip = els.tradeMapTooltip;
        if (!tip || tip.classList.contains("hidden")) return;
        const box = els.tradeWorldMap.getBoundingClientRect();
        tip.style.left = `${event.clientX - box.left + 14}px`;
        tip.style.top = `${event.clientY - box.top + 14}px`;
      });
      node.addEventListener("mouseleave", () => els.tradeMapTooltip?.classList.add("hidden"));
      node.addEventListener("click", () => {
        if (Date.now() < state.suppressTradeMapClickUntil) return;
        const next = resolveCountryKey(mapName, Object.keys(product.imports || {}));
        if (!next) return;
        state.selectedCountry = next;
        render();
      });
      els.tradeWorldMap.appendChild(node);
    });

    topCountries.forEach((item) => {
      const point = getCountryAnchorPoint(item.country);
      if (!point) return;
      const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
      group.style.cursor = "pointer";
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", point[0]);
      circle.setAttribute("cy", point[1]);
      circle.setAttribute("r", "11");
      circle.setAttribute("fill", "#1f6b45");
      circle.setAttribute("stroke", "#fff");
      circle.setAttribute("stroke-width", "2");
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", point[0]);
      label.setAttribute("y", point[1] + 4);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("fill", "#fff");
      label.setAttribute("font-size", "11");
      label.setAttribute("font-weight", "700");
      label.textContent = String(item.rank);
      group.appendChild(circle);
      group.appendChild(label);
      group.addEventListener("click", () => {
        state.selectedCountry = item.country;
        render();
      });
      els.tradeWorldMap.appendChild(group);
    });
  }

  function renderTradeDashboard(product) {
    ensureOverviewYear(product);
    const topCountries = getTradeTopCountries(product);
    if (!state.selectedCountry || !resolveCountryKey(state.selectedCountry, topCountries.map((item) => item.country))) {
      state.selectedCountry = topCountries[0]?.country || null;
    } else {
      state.selectedCountry = resolveCountryKey(state.selectedCountry, topCountries.map((item) => item.country));
    }

    renderTradeFilters(product);
    renderTradeMetrics(product);
    drawTradeMap(product, topCountries);
    renderTradeRankTable(product, topCountries);
    renderTradeDetail(product, state.selectedCountry, topCountries);
    renderTradeOverallCharts(product);
    initChartInteractions();
    hideChartTooltip();
  }

  function render() {
    const product = getProduct();
    ensureOverviewYear(product);
    syncDashboardLayout();
    updateView();
    createLanding();
    createTopbar(product);

    if (state.module === "production") {
      renderCapacityDashboard(product);
      return;
    }

    if (state.module === "trade") {
      renderTradeDashboard(product);
      return;
    }

    state.selectedCountry = getSelectedCountry(product);
    buildHeroMetrics(product);
    drawMap(product);
    renderSidePanel(product);
  }

  async function loadWorldMap() {
    try {
      const response = await fetch("./scripts/world.json");
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

  function setRefreshStatus(message, kind) {
    if (!els.refreshDataStatus) return;
    els.refreshDataStatus.hidden = !message;
    els.refreshDataStatus.textContent = message || "";
    els.refreshDataStatus.classList.toggle("is-error", kind === "error");
    els.refreshDataStatus.classList.toggle("is-success", kind === "success");
  }

  async function refreshDashboardData() {
    if (!els.refreshDataBtn || els.refreshDataBtn.disabled) return;

    els.refreshDataBtn.disabled = true;
    els.refreshDataBtn.textContent = "更新中…";
    setRefreshStatus("正在重建数据");

    try {
      const response = await fetch("/api/refresh-data", {
        method: "POST",
        headers: { Accept: "application/json" },
      });
      let payload = null;
      try {
        payload = await response.json();
      } catch (_error) {
        payload = null;
      }

      if (!response.ok || !payload?.ok) {
        const message =
          payload?.error ||
          (response.status === 404 || response.status === 501
            ? "当前服务不支持网页更新数据。请通过 start_server.ps1 或 scripts.https_server 启动 HTTPS 服务后再试。"
            : `数据更新失败（HTTP ${response.status}）。`);
        throw new Error(message);
      }

      setRefreshStatus("数据更新成功，正在刷新页面…", "success");
      window.location.reload();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "数据更新失败，请稍后重试。";
      setRefreshStatus(message, "error");
      els.refreshDataBtn.disabled = false;
      els.refreshDataBtn.textContent = "更新数据";
    }
  }

  if (els.refreshDataBtn) {
    els.refreshDataBtn.addEventListener("click", () => {
      refreshDashboardData();
    });
  }

  initModalInteractions();
  initMapInteractions();
  initCapacityMapInteractions();
  initTradeMapInteractions();
  render();
  loadWorldMap();
})();
