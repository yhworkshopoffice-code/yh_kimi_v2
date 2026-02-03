/**
 * Storefront Types - 遊戲代儲平台類型定義
 * Based on ai_studio design
 */

// 遊戲類別
export type GameCategory = 'hot' | 'uid' | 'card';

// 遊戲套餐
export interface GamePackage {
  id: string;
  name: string;
  price: number;
  image?: string;
}

// 遊戲
export interface Game {
  id: string;
  name: string;
  englishName: string;
  image: string;
  isHot?: boolean;
  category: GameCategory;
  uidOnly?: boolean;
  packages: GamePackage[];
}

// 價格項目
export interface PriceItem {
  id: string;
  package: string;
  originalPrice: string;
  discountPrice: string;
}

// VIP 等級
export interface VIPLevel {
  name: string;
  threshold: string;
  benefits: string[];
  color: string;
}

// 合作夥伴
export interface Partner {
  id: string;
  name: string;
  avatar: string;
  quote: string;
  mainGame: string;
  isVerified?: boolean;
}

// FAQ 項目
export interface FAQItem {
  question: string;
  answer: string;
}

// 輪播圖片
export interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
}

// 聯絡資訊
export interface ContactInfo {
  line: string;
  instagram: string;
  lineLink: string;
  igLink: string;
}

// 訂單表單資料
export interface OrderFormData {
  loginType: string;
  account: string;
  password: string;
  paymentMethod: 'Bank' | 'Convenience' | 'LinePay';
  phone: string;
  isPhoneVerified: boolean;
}

// Modal 類型
export type InfoModalType = 'vip' | 'terms' | 'privacy' | null;

// 視圖類型
export type StorefrontView = 'home' | 'shop';
