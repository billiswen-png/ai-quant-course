export type Lesson = { title: string; detail: string; minutes: number };
export type CourseVisual = { src: string; alt: string; title: string; caption: string };
export type CourseWeek = {
  slug: string; week: number; campusWeek: number; title: string; summary: string;
  goals: string[]; concepts: string[]; lessons: [Lesson, Lesson, Lesson]; flow: string[];
  practice: string; individualEvidence: string; groupDeliverable: string; checkpoint: string; code?: string; visual?: CourseVisual;
};

export const courseWeeks: CourseWeek[] = [
  {
    slug: "week-1", week: 1, campusWeek: 9,
    title: "AI 時代的程式交易與量化系統概論",
    summary: "從市場問題與系統邊界出發，建立 AI 協作、量化研究及風險溝通的共同語言。",
    goals: ["理解程式交易系統的完整生命週期", "把市場觀察改寫成可驗證問題", "辨識研究、模擬與實際交易的邊界"],
    concepts: ["量化研究", "AI 協作", "系統架構", "金融邏輯"],
    lessons: [
      { title: "程式交易與量化系統全貌", detail: "理論講解・金融實務案例", minutes: 50 },
      { title: "AI 協作與可驗證研究問題", detail: "教師示範・問題拆解", minutes: 50 },
      { title: "研究問題畫布與系統地圖", detail: "個人實作・小組建模", minutes: 50 }
    ],
    flow: ["市場現象", "研究問題", "資料需求", "策略假設", "驗證證據"],
    visual: {
      src: "/images/week-1-research-path.webp",
      alt: "學生從觀察市場開始，依序整理資料、建立策略邏輯並檢視驗證證據的研究歷程插圖",
      title: "把市場直覺變成可驗證問題",
      caption: "先問一個能被資料回答、也可能被推翻的問題，再決定要寫什麼程式。"
    },
    practice: "選擇一個可觀察的市場現象，寫清楚對象、時間尺度、假設、所需資料及如何判定假設不成立。",
    individualEvidence: "每人提交一項市場觀察，以及將觀察改寫成研究問題的紀錄。",
    groupDeliverable: "研究問題畫布＋量化系統地圖",
    checkpoint: "問題必須可取得資料、可被否證，且不以獲利保證作為研究目標。"
  },
  {
    slug: "week-2", week: 2, campusWeek: 10,
    title: "VS Code × AI 協作：Python 量化開發入門",
    summary: "在 VS Code 與本機 Jupyter 建立可重現專案，練習閱讀、測試及修正 AI 協作產生的程式。",
    goals: ["完成本機 Python 與 Jupyter 環境", "理解資料型別、函式與例外處理", "建立 AI 小步修改與驗證紀錄"],
    concepts: ["VS Code", "本機 Jupyter", "Python", "Git", "AI 驗證"],
    lessons: [
      { title: "VS Code、本機 Jupyter 與 Git", detail: "環境檢查・專案建立", minutes: 50 },
      { title: "Python 金融資料結構與函式", detail: "教師示範・個人實作", minutes: 50 },
      { title: "AI 小步協作、程式閱讀與測試", detail: "錯誤診斷・同儕互查", minutes: 50 }
    ],
    flow: ["定義輸入", "請 AI 解釋", "小步修改", "執行測試", "保存證據"],
    practice: "讀入一份行情資料，完成欄位檢查、日期排序、重複值移除、報酬計算與錯誤處理。",
    individualEvidence: "保留一組有效與一組失敗的 AI 指令，說明如何測試及修正。",
    groupDeliverable: "可重現專案骨架＋README執行說明",
    checkpoint: "組員能在另一台電腦依 README 重現結果，並說明每一個環境與套件需求。",
    code: `import pandas as pd\n\ndf = pd.read_csv("market_data.csv", parse_dates=["timestamp"])\ndf = df.sort_values("timestamp").drop_duplicates("timestamp")\ndf["return"] = df["close"].pct_change()`
  },
  {
    slug: "week-3", week: 3, campusWeek: 11,
    title: "金融資料、API 即時報價與資料工程",
    summary: "認識 Tick、K棒與時間語意，將 API 行情接入一致的資料格式，建立品質檢查與模擬報價管線。",
    goals: ["區分歷史資料、快照與串流行情", "理解 Shioaji、MDC 與 SOR 的角色邊界", "完成可測試的行情資料品質管線"],
    concepts: ["Tick／K棒", "Shioaji", "MDC行情", "SOR送單", "資料品質"],
    lessons: [
      { title: "Tick、K棒與金融資料時間語意", detail: "圖文講解・欄位判讀", minutes: 50 },
      { title: "Shioaji、MDC、SOR 與 API 架構", detail: "架構圖解・報價示範", minutes: 50 },
      { title: "資料清理、品質檢查與模擬管線", detail: "小組實作・異常演練", minutes: 50 }
    ],
    flow: ["Shioaji／MDC行情", "欄位標準化", "時間與缺值檢查", "策略資料層", "模擬輸出"],
    visual: {
      src: "/images/week-3-data-pipeline.webp",
      alt: "多種行情資料依序經過欄位標準化、時間與品質檢查、儲存及監控的資料管線插圖",
      title: "讓行情先通過品質關卡",
      caption: "策略看到資料之前，先統一欄位、確認時間、處理缺值與重複資料。"
    },
    practice: "以歷史或模擬行情完成報價接收、欄位對照、時間排序、缺值處理、重複資料移除與異常標記。",
    individualEvidence: "每人解釋一項資料品質問題，以及該問題可能造成的策略偏差。",
    groupDeliverable: "資料字典＋模擬報價管線＋品質檢查表",
    checkpoint: "行情來源、送單通道及測試資料必須清楚分層；不得將 API 金鑰提交到 Repository。",
    code: `def validate_quote(quote):\n    required = {"symbol", "timestamp", "price", "volume"}\n    missing = required - quote.keys()\n    return {"valid": not missing, "missing": sorted(missing)}`
  },
  {
    slug: "week-4", week: 4, campusWeek: 12,
    title: "AI 協作：建立第一個可執行交易策略",
    summary: "把自然語言市場想法轉成明確的指標、訊號、部位與狀態機，避免把圖形直覺誤當策略。",
    goals: ["理解 KD、MACD 與布林通道的計算邏輯", "定義進出場、部位與退出規則", "用測試案例檢查策略狀態"],
    concepts: ["技術指標", "訊號", "部位", "狀態機", "單元測試"],
    lessons: [
      { title: "指標原理與訊號形成", detail: "KD・MACD・布林通道", minutes: 50 },
      { title: "進出場、部位與狀態機", detail: "規格圖解・教師示範", minutes: 50 },
      { title: "策略函式與邊界測試", detail: "AI協作・個人實作", minutes: 50 }
    ],
    flow: ["行情輸入", "指標計算", "訊號判定", "部位狀態", "風險退出"],
    practice: "把一個自然語言策略寫成輸入、參數、訊號、部位、退出及無效條件，再以人工案例測試。",
    individualEvidence: "每人提交一個策略邊界案例與預期結果。",
    groupDeliverable: "策略函式＋狀態測試＋策略規格表",
    checkpoint: "不得使用未來資料；每個訊號都能追溯至明確資料與條件。"
  },
  {
    slug: "week-5", week: 5, campusWeek: 13,
    title: "公平回測、成交模擬與績效評估",
    summary: "建立正確的時間序列回測，納入成本與成交假設，從多項指標理解策略報酬、風險及限制。",
    goals: ["避免未來函數與資料偷看", "納入手續費、滑價及成交假設", "解讀報酬、勝率、Sharpe、MaxDD與PF"],
    concepts: ["資料切分", "成交模擬", "交易成本", "Sharpe", "MaxDD", "PF"],
    lessons: [
      { title: "時間序列切分與公平回測", detail: "未來函數・資料偷看", minutes: 50 },
      { title: "成交模擬、滑價與交易成本", detail: "假設設定・情境比較", minutes: 50 },
      { title: "績效儀表板與結果解讀", detail: "勝率・Sharpe・MaxDD・PF", minutes: 50 }
    ],
    flow: ["訓練／觀察區間", "訊號延遲", "成交與成本", "權益曲線", "績效風險"],
    visual: {
      src: "/images/week-5-backtest.webp",
      alt: "行情經策略規則、部位狀態、時間切分與成本模擬後產出績效及回撤報告的回測流程插圖",
      title: "策略要通過公平回測才能被解讀",
      caption: "先固定時序與成交假設，再把成本放進去，最後同時閱讀報酬與風險。"
    },
    practice: "比較未計成本、已計成本及不同滑價情境，分析策略績效差異與最主要的風險來源。",
    individualEvidence: "每人解釋一個績效指標不能單獨代表策略好壞的原因。",
    groupDeliverable: "含成本回測＋績效儀表板＋結果說明",
    checkpoint: "資料切分、價格採用時點、成本與未成交規則必須能被重現。"
  },
  {
    slug: "week-6", week: 6, campusWeek: 14,
    title: "策略穩健性、帳務邏輯與風險控管",
    summary: "從損益對帳、樣本外驗證、壓力測試及停機條件，辨識過度最佳化並建立可執行的風控規格。",
    goals: ["完成交易紀錄與損益對帳", "進行樣本外、敏感度與壓力測試", "定義部位限制、停損與停機條件"],
    concepts: ["損益對帳", "樣本外", "敏感度", "壓力測試", "停機條件"],
    lessons: [
      { title: "交易紀錄、部位與損益對帳", detail: "帳務邏輯・逐筆核對", minutes: 50 },
      { title: "樣本外、敏感度與穩健性", detail: "驗證方法・過度最佳化", minutes: 50 },
      { title: "壓力測試、風險限制與停機", detail: "失敗情境・小組審查", minutes: 50 }
    ],
    flow: ["交易紀錄", "損益對帳", "樣本外驗證", "壓力測試", "風控與停機"],
    practice: "針對資料中斷、延遲、極端滑價、連續虧損及部位異常建立測試，提出策略停機與復原規則。",
    individualEvidence: "每人負責一種失敗情境，記錄觸發條件、系統反應及修正方法。",
    groupDeliverable: "風控清單＋對帳結果＋策略穩健性報告",
    checkpoint: "先定義失敗與停機條件，再談績效；不得只挑選最佳參數結果。"
  },
  {
    slug: "week-7", week: 7, campusWeek: 15,
    title: "Paper Trading 系統整合與成果封版",
    summary: "整合資料、訊號、風控與模擬委託，完成紅隊測試、課堂版發表及正式發表前的修正清單。",
    goals: ["完成端到端 Paper Trading 原型", "以故障情境檢驗系統", "完成課堂版發表並整理修改項目"],
    concepts: ["系統整合", "Paper Trading", "紅隊測試", "原型發表", "修改清單"],
    lessons: [
      { title: "Paper Trading 端到端系統整合", detail: "行情・策略・風控・模擬委託", minutes: 50 },
      { title: "紅隊測試與最終驗收", detail: "故障演練・交叉檢核", minutes: 50 },
      { title: "成品完成與課堂版成果發表", detail: "原型展示・教師回饋", minutes: 50 }
    ],
    flow: ["行情", "策略", "風控", "模擬委託", "紀錄與展示"],
    visual: {
      src: "/images/week-7-paper-trading.webp",
      alt: "交易紀錄經壓力測試、風險防護與模擬交易後，由學生共同檢視並發表的系統整合插圖",
      title: "把研究成果變成可驗收的系統",
      caption: "不是只展示曲線；還要能重播紀錄、觸發風控、說明限制並接受提問。"
    },
    practice: "小組執行完整系統展示，接受同儕與教師提問，將問題依必要修正、說明補強與延伸功能分級。",
    individualEvidence: "每人說明自己的貢獻、測試證據、發現的限制及下一步修正。",
    groupDeliverable: "可執行系統原型＋課堂版簡報＋正式發表修改清單",
    checkpoint: "本週完成原型與課堂版發表；後續保留一週修正，再進行第8週正式成果發表。"
  }
];

export const finalPresentation = {
  week: 8, campusWeek: 16, title: "成果發表",
  summary: "依第7週回饋完成修改、驗收與封版，進行正式成果發表。",
  steps: ["完成必要修正", "程式與文件驗收", "8分鐘正式發表", "教師與同儕提問", "提交個人學習證據"],
  lessons: [
    { title: "最終版本檢查與展示準備", detail: "檔案驗收・設備測試", minutes: 50 },
    { title: "小組正式成果發表", detail: "8分鐘簡報・系統展示・提問", minutes: 50 },
    { title: "講師回饋、同儕回饋與課程收束", detail: "成果評議・個人反思", minutes: 50 }
  ] as [Lesson, Lesson, Lesson],
  deliverables: ["可重現 Notebook 或程式專案", "專案文件與執行說明", "策略與風險報告", "正式簡報", "個人貢獻與反思"]
};

export const classPeriods = [
  { label: "第 1 堂", time: "14:20–15:10" },
  { label: "第 2 堂", time: "15:20–16:10" },
  { label: "第 3 堂", time: "16:20–17:10" }
];

export const weeklyClose = { label: "課堂驗收", time: "17:10–17:20", detail: "成果檢查、離場單與下週分工" };

export const learningRhythm = ["概念圖解", "教師示範", "個人實作", "同儕檢查", "小組整合", "課堂驗收"];

export const assessment = [
  { label: "課堂練習", value: "20%" }, { label: "分組作業", value: "30%" },
  { label: "個人反思", value: "10%" }, { label: "期末專題", value: "40%" }
];
