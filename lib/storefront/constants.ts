/**
 * Storefront Constants - 遊戲代儲平台內容數據
 * Based on ai_studio design with Traditional Chinese content
 */

import { Game, PriceItem, VIPLevel, Partner, FAQItem, CarouselSlide, ContactInfo } from './types';

// 輪播圖片
export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    title: '特戰英豪 賽季更新',
    subtitle: '限時匯率優惠中，特務造型搶先入帳'
  },
  {
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
    title: '鳴潮 ‧ 全新版本',
    subtitle: '抽卡儲值最划算，多種面額隨時供應'
  },
  {
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
    title: 'Apex 頂獵首選',
    subtitle: '全台最穩定的金幣來源，安全不封號'
  }
];

// 遊戲目錄
export const GAMES: Game[] = [
  // 熱門遊戲
  { 
    id: '1', 
    name: '特戰英豪', 
    englishName: 'Valorant', 
    image: 'https://picsum.photos/seed/val/800/450', 
    isHot: true,
    category: 'hot',
    packages: [
      { id: 'v1', name: '1000 VP', price: 280 },
      { id: 'v2', name: '2050 VP', price: 540 },
      { id: 'v3', name: '5350 VP', price: 1350 },
      { id: 'v4', name: '11000 VP', price: 2650 },
    ]
  },
  { 
    id: '2', 
    name: 'Apex 英雄', 
    englishName: 'Apex Legends', 
    image: 'https://picsum.photos/seed/apex/800/450', 
    isHot: true,
    category: 'hot',
    packages: [
      { id: 'a1', name: '1000 金幣', price: 270 },
      { id: 'a2', name: '2150 金幣', price: 540 },
      { id: 'a3', name: '4350 金幣', price: 1080 },
      { id: 'a4', name: '11500 金幣', price: 2600 },
    ]
  },
  { 
    id: '3', 
    name: '傳說對決', 
    englishName: 'Arena of Valor', 
    image: 'https://picsum.photos/seed/aov/800/450',
    category: 'hot',
    packages: [
      { id: 'av1', name: '175 點券', price: 100 },
      { id: 'av2', name: '350 點券', price: 190 },
      { id: 'av3', name: '700 點券', price: 370 },
      { id: 'av4', name: '1400 點券', price: 720 },
    ]
  },
  { 
    id: '4', 
    name: '鳴潮', 
    englishName: 'Wuthering Waves', 
    image: 'https://picsum.photos/seed/wuwa/800/450',
    isHot: true,
    category: 'hot',
    packages: [
      { id: 'w1', name: '300 星聲', price: 150 },
      { id: 'w2', name: '980 星聲', price: 450 },
      { id: 'w3', name: '1980 星聲', price: 890 },
      { id: 'w4', name: '3280 星聲', price: 1450 },
    ]
  },
  // UID 直儲
  { 
    id: '7', 
    name: '原神', 
    englishName: 'Genshin Impact', 
    image: 'https://picsum.photos/seed/genshin/800/450',
    category: 'uid',
    uidOnly: true,
    packages: [
      { id: 'g1', name: '60 原石', price: 30 },
      { id: 'g2', name: '300 原石', price: 150 },
      { id: 'g3', name: '980 原石', price: 450 },
      { id: 'g4', name: '空月祝福', price: 150 },
    ]
  },
  { 
    id: '8', 
    name: '崩壞：星穹鐵道', 
    englishName: 'Honkai: Star Rail', 
    image: 'https://picsum.photos/seed/starrail/800/450',
    category: 'uid',
    uidOnly: true,
    packages: [
      { id: 'sr1', name: '60 古老夢華', price: 30 },
      { id: 'sr2', name: '300 古老夢華', price: 150 },
      { id: 'sr3', name: '980 古老夢華', price: 450 },
      { id: 'sr4', name: '無名勳禮', price: 330 },
    ]
  },
  { 
    id: '9', 
    name: '絕區零', 
    englishName: 'Zenless Zone Zero', 
    image: 'https://picsum.photos/seed/zzz/800/450',
    category: 'uid',
    uidOnly: true,
    packages: [
      { id: 'z1', name: '60 菲林', price: 30 },
      { id: 'z2', name: '300 菲林', price: 150 },
      { id: 'z3', name: '980 菲林', price: 450 },
    ]
  },
  // 點卡專區
  { 
    id: '10', 
    name: 'MyCard 點數', 
    englishName: 'MyCard', 
    image: 'https://picsum.photos/seed/mycard/800/450',
    category: 'card',
    packages: [
      { id: 'm1', name: '150 點', price: 145 },
      { id: 'm2', name: '500 點', price: 485 },
      { id: 'm3', name: '1000 點', price: 970 },
      { id: 'm4', name: '3000 點', price: 2900 },
    ]
  },
  { 
    id: '11', 
    name: 'Google Play 禮品卡', 
    englishName: 'Google Card', 
    image: 'https://picsum.photos/seed/google/800/450',
    category: 'card',
    packages: [
      { id: 'gc1', name: '500 NTD', price: 490 },
      { id: 'gc2', name: '1000 NTD', price: 980 },
      { id: 'gc3', name: '2000 NTD', price: 1950 },
    ]
  },
  { 
    id: '12', 
    name: '貝殼幣', 
    englishName: 'Garena Shells', 
    image: 'https://picsum.photos/seed/shell/800/450',
    category: 'card',
    packages: [
      { id: 's1', name: '140 點', price: 95 },
      { id: 's2', name: '350 點', price: 235 },
      { id: 's3', name: '700 點', price: 465 },
      { id: 's4', name: '1400 點', price: 920 },
    ]
  },
];

// 預設遊戲（用於通用訂單入口）
export const DEFAULT_GAME = GAMES[0];

// Pokemon Go 價格（示例）
export const POKEMON_GO_PRICES: PriceItem[] = [
  { id: 'p1', package: '100 寶可幣', originalPrice: 'TWD 33', discountPrice: 'TWD 28' },
  { id: 'p2', package: '550 寶可幣', originalPrice: 'TWD 170', discountPrice: 'TWD 145' },
  { id: 'p3', package: '1200 寶可幣', originalPrice: 'TWD 330', discountPrice: 'TWD 280' },
  { id: 'p4', package: '2500 寶可幣', originalPrice: 'TWD 670', discountPrice: 'TWD 560' },
  { id: 'p5', package: '5200 寶可幣', originalPrice: 'TWD 1320', discountPrice: 'TWD 1080' },
  { id: 'p6', package: '14500 寶可幣', originalPrice: 'TWD 3290', discountPrice: 'TWD 2650' },
];

// VIP 等級
export const VIP_LEVELS: VIPLevel[] = [
  {
    name: 'Lv.1 豚，鐵粉 (V1)',
    threshold: '月消費 $10,000',
    benefits: ['0.5% 點數回饋', '優先排隊作業', '解鎖點數商城'],
    color: 'from-slate-500 to-slate-700'
  },
  {
    name: 'Lv.2 水豚領主 (V2)',
    threshold: '月消費 $30,000',
    benefits: ['1.0% 點數回饋', '專屬客服通道', '生日驚喜禮金'],
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    name: 'Lv.3 水豚酋長 (V3)',
    threshold: '月消費 $80,000',
    benefits: ['1.5% 點數回饋', '急件最優先處理', '年度節日大禮包'],
    color: 'from-purple-500 to-indigo-600'
  }
];

// 聯絡資訊
export const CONTACT_INFO: ContactInfo = {
  line: '@yh666',
  instagram: 'yh777.tw',
  lineLink: 'https://line.me/R/ti/p/@yh666',
  igLink: 'https://instagram.com/yh777.tw'
};

// 合作夥伴
export const PARTNERS: Partner[] = [
  {
    id: '1',
    name: '知名實況主 A',
    avatar: 'https://picsum.photos/seed/streamer1/150/150',
    quote: '出貨速度超快，這是我用過最安心的代儲！',
    mainGame: '特戰英豪',
    isVerified: true
  },
  {
    id: '2',
    name: 'Apex 頂獵大神',
    avatar: 'https://picsum.photos/seed/streamer2/150/150',
    quote: '這匯率真的沒話說，代儲我只認準 YH 遊戲倉庫。',
    mainGame: 'Apex Legends',
    isVerified: true
  },
  {
    id: '3',
    name: '鳴潮攻略組',
    avatar: 'https://picsum.photos/seed/streamer3/150/150',
    quote: '幫粉絲儲值也都來這裡，大推他們的 VIP 制度！',
    mainGame: '鳴潮',
    isVerified: true
  },
  {
    id: '4',
    name: '傳說電競領隊',
    avatar: 'https://picsum.photos/seed/streamer4/150/150',
    quote: '專業、穩定、安全，遊戲玩家的後勤首選。',
    mainGame: '傳說對決',
    isVerified: true
  }
];

// FAQ 資料
export const FAQ_DATA: FAQItem[] = [
  {
    question: "代儲安全嗎？會被鎖帳號嗎？",
    answer: "YH 遊戲倉庫堅持使用正軌管道與官方匯率差進行代儲，不使用任何黑卡，保證帳號 100% 安全。"
  },
  {
    question: "儲值大約需要多久時間？",
    answer: "收到款項後平均 5-10 分鐘內作業完畢，大型活動期間可能稍有延遲，均會提前告知。"
  },
  {
    question: "支援哪些付款方式？",
    answer: "目前支援銀行轉帳、LINE Pay、超商代碼（需加收手續費）等多種便捷支付方式。"
  },
  {
    question: "如何加入 VIP 會員？",
    answer: "當您的累積消費達到指定門檻（如黃金會員 $5,000），系統將自動為您升級，或連繫客服人工審核。"
  }
];

// 服務條款內容
export const TERMS_CONTENT = `
# 服務條款

## 1. 服務說明
YH 遊戲倉庫提供遊戲代儲服務，所有交易均遵守相關法律法規。

## 2. 訂單流程
- 下單後請於 24 小時內完成付款
- 付款後請透過 LINE 通知客服
- 平均處理時間為 5-10 分鐘

## 3. 退款政策
- 尚未開始處理的訂單可全額退款
- 已完成的儲值服務不接受退款

## 4. 免責聲明
- 因遊戲官方政策變更導致的問題，本平台不承擔責任
- 請妥善保管您的帳號資訊
`;

// 隱私政策內容
export const PRIVACY_CONTENT = `
# 隱私政策

## 1. 資料收集
我們僅收集必要的資料以完成交易：
- 遊戲帳號資訊
- 聯絡電話
- 付款資訊

## 2. 資料保護
- 所有資料採用 SSL 加密傳輸
- 不會將您的資料販售給第三方
- 交易完成後帳號資訊將自動刪除

## 3. Cookie 使用
我們使用 Cookie 來改善使用者體驗。

## 4. 聯絡我們
如有隱私相關問題，請透過 LINE 聯繫我們。
`;

// VIP 制度詳細內容
export const VIP_CONTENT = `
# VIP 會員制度

## 如何升級
透過累積消費金額自動升級，無需額外申請。

## 等級權益

### Lv.1 豚，鐵粉 (V1)
- 月消費滿 $10,000
- 0.5% 點數回饋
- 優先排隊作業

### Lv.2 水豚領主 (V2)
- 月消費滿 $30,000
- 1.0% 點數回饋
- 專屬客服通道
- 生日驚喜禮金

### Lv.3 水豚酋長 (V3)
- 月消費滿 $80,000
- 1.5% 點數回饋
- 急件最優先處理
- 年度節日大禮包
`;
