// Game and Package Types
export interface GamePackage {
  id: string;
  name: string;
  price: number;
  image?: string;
}

// Option Group Types
export interface OptionGroup {
  id: string;
  label: string;
  order: number;
  required: boolean;
  selectionMode: 'single' | 'multi';
  minSelections?: number;
  maxSelections?: number;
  minTotalQty?: number;
  maxTotalQty?: number;
  options: Option[];
}

export interface Option {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  minQty?: number;
  maxQty?: number;
  step?: number;
}

export interface Game {
  id: string;
  name: string;
  englishName: string;
  image: string;
  isHot?: boolean;
  category: 'hot' | 'uid' | 'card';
  uidOnly?: boolean;
  packages: GamePackage[];
  optionGroups?: OptionGroup[];
}

export interface PriceItem {
  id: string;
  package: string;
  originalPrice: string;
  discountPrice: string;
}

export interface VIPLevel {
  name: string;
  threshold: string;
  benefits: string[];
  color: string;
}

export interface Partner {
  id: string;
  name: string;
  avatar: string;
  quote: string;
  mainGame: string;
  isVerified?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
}

export interface ContactInfo {
  line: string;
  instagram: string;
  lineLink: string;
  igLink: string;
}

export type InfoModalType = 'vip' | 'terms' | 'privacy' | null;
export type ViewType = 'home' | 'shop';
