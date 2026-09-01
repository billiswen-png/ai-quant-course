export type Lesson = {
  title: string;
  detail: string;
};

export type CourseDay = {
  slug: string;
  day: number;
  title: string;
  summary: string;
  goals: string[];
  lessons: [Lesson, Lesson];
  practice: string;
  deliverable: string;
  code?: string;
};

export const courseDays: CourseDay[] = [
  {
    slug: "day-1",
    day: 1,
    title: "量化交易與金融市場問題",
    summary: "先從金融問題與決策流程出發，建立程式交易、量化研究與 AI 協作的共同語言。",
    goals: ["理解量化交易的核心流程", "把市場觀察轉成可檢驗問題", "辨識回測與實盤之間的差異"],
    lessons: [
      { title: "量化交易的核心概念與市場參與者", detail: "案例講授・觀念建立" },
      { title: "市場問題拆解與研究流程建立", detail: "小組討論・問題定義" }
    ],
    practice: "小組選擇一個可觀察的市場現象，寫出研究問題、資料需求與驗證方式。",
    deliverable: "一頁式研究問題畫布"
  },
  {
    slug: "day-2",
    day: 2,
    title: "Python、AI 與資料處理",
    summary: "用最少但足夠的 Python 基礎處理金融資料，並學會讓 AI 成為可驗證的程式協作夥伴。",
    goals: ["理解 Python 資料結構", "完成 Pandas 資料處理", "建立 AI 產碼與檢核流程"],
    lessons: [
      { title: "Python 基礎語法與金融資料結構", detail: "逐步實作・個別練習" },
      { title: "Pandas 清理、轉換與視覺化", detail: "資料實作・小組互查" }
    ],
    practice: "讀入一份行情資料，完成日期轉換、欄位整理、報酬計算與基礎視覺化。",
    deliverable: "可重現的資料處理 Notebook",
    code: `import pandas as pd\n\ndf = pd.read_csv("market_data.csv", parse_dates=["date"])\ndf = df.sort_values("date").drop_duplicates("date")\ndf["return"] = df["close"].pct_change()`
  },
  {
    slug: "day-3",
    day: 3,
    title: "API 報價串接與資料品質",
    summary: "把即時市場資料接進 Python，理解資料頻率、缺值、時間戳與流量限制。",
    goals: ["辨識行情資料來源與欄位", "完成 API 報價接收流程", "建立資料品質檢查清單"],
    lessons: [
      { title: "金融資料來源與 API 串接實作", detail: "流程拆解・報價接收" },
      { title: "資料清理、缺值處理與檢核方法", detail: "品質檢查・異常標記" }
    ],
    practice: "小組完成即時報價接收、欄位整理與異常資料標記。",
    deliverable: "行情資料品質檢查表",
    code: `def validate_quote(quote):\n    required = {"symbol", "timestamp", "price", "volume"}\n    missing = required - quote.keys()\n    return {"valid": not missing, "missing": sorted(missing)}`
  },
  {
    slug: "day-4",
    day: 4,
    title: "技術指標與策略規則",
    summary: "從指標原理走向明確規則，避免把圖形直覺誤當成可執行、可驗證的策略。",
    goals: ["理解常用指標的計算邏輯", "定義進出場與部位規則", "避免未來函數與訊號偷看"],
    lessons: [
      { title: "常見技術指標原理與計算", detail: "KD・MACD・布林通道" },
      { title: "策略規則設計與訊號產生", detail: "條件定義・邏輯測試" }
    ],
    practice: "將一個自然語言策略改寫為明確的輸入、條件、訊號、部位與退出規則。",
    deliverable: "策略規格表與訊號範例"
  },
  {
    slug: "day-5",
    day: 5,
    title: "回測、績效與風險評估",
    summary: "用正確的時間序列流程評估策略，理解報酬、風險、成本與穩健性之間的關係。",
    goals: ["建立基礎回測流程", "解讀 Sharpe、MaxDD 與 PF", "辨識過度最佳化風險"],
    lessons: [
      { title: "回測架構與交易模擬流程", detail: "資料切分・成本設定" },
      { title: "績效指標解讀與風險評估", detail: "穩健性・敏感度分析" }
    ],
    practice: "比較含成本與不含成本的回測結果，並說明策略最主要的風險來源。",
    deliverable: "績效摘要與風險說明"
  },
  {
    slug: "day-6",
    day: 6,
    title: "即時行情、模擬交易與策略修正",
    summary: "把研究流程帶到即時資料與模擬執行，檢查延遲、流量、狀態與例外處理。",
    goals: ["建立即時行情處理流程", "理解模擬下單與狀態管理", "依觀察結果修正策略"],
    lessons: [
      { title: "即時行情串接與資料流處理", detail: "訂閱・節流・狀態" },
      { title: "模擬交易執行與策略修正", detail: "紀錄・例外・回顧" }
    ],
    practice: "以模擬資料完成行情→策略→訊號→模擬委託→紀錄的完整流程。",
    deliverable: "模擬交易紀錄與修正清單"
  },
  {
    slug: "day-7",
    day: 7,
    title: "小組成果發表與實務回饋",
    summary: "整合研究問題、資料、策略與驗證結果，清楚呈現限制、風險與下一步。",
    goals: ["完成可重現的專題成果", "用證據說明策略優缺點", "回應同儕與講師提問"],
    lessons: [
      { title: "小組專題整合與簡報準備", detail: "成果整理・演練" },
      { title: "成果發表與講師實務回饋", detail: "發表・同儕互評" }
    ],
    practice: "完成小組口頭發表、程式展示與個人學習反思。",
    deliverable: "期末專題簡報、程式與個人反思"
  }
];

export const assessment = [
  { label: "課堂練習", value: "20%" },
  { label: "分組作業", value: "30%" },
  { label: "個人反思", value: "10%" },
  { label: "期末專題", value: "40%" }
];
