export interface AccordionItem {
  id: number;
  title: string;
  content: string;
}

export interface Model {
  id: number;
  name: string;
  description: string;
  size: string;
  sizeBya?: string;
  capacity: string;
  rooms: string;
  floors: string;
  images: string[];
  slug?: string;
}

export interface ModelSpecifications {
  price?: string | number;
  size?: string | number;
  sizeBya?: string | number;
  sizeBra?: string | number;
  rooms?: string | number;
  floors?: string | number;
  bedrooms?: string | number;
  bathrooms?: string | number;
  weight?: string | number;
  ceilingHeight?: string | number;
  modules?: string | number;
}

export interface SpecificationsBlock {
  _type: "specificationsBlock";
  _key: string;
}

// Home hero (static, not part of content blocks)
export interface Hero {
  video?: {
    asset?: {
      _id?: string;
      _type?: string;
      url?: string;
    };
  };
}

export interface NavigationPage {
  _id: string;
  _type?: "page" | "home";
  name?: string;
  slug?: {
    _type?: "slug";
    current?: string;
  };
}

export interface IntroductionBlock {
  _type: "introductionBlock";
  _key: string;
  text?: string;
}

export interface ValuesBlock {
  _type: "valuesBlock";
  _key: string;
  paragraphs?: string[];
}

export interface ModelsBlock {
  _type: "modelsBlock";
  _key: string;
  models?: Array<{
    _id: string;
    _type: string;
    name: string;
    slug?: { current?: string };
    description: string;
    size: string;
    capacity: string;
    rooms: string;
    floors: string;
    image?: {
      asset?: {
        _id: string;
        _type: string;
        url: string;
      };
    };
  }>;
}

export interface AccordionBlock {
  _type: "accordionBlock";
  _key: string;
  title?: string;
  items?: Array<{
    title: string;
    content: string;
  }>;
}

export interface ProductionPhase {
  title: string;
  description: string;
  duration?: string;
  features?: string[];
  image?: {
    asset?: {
      _id?: string;
      _type?: string;
      url?: string;
    };
  };
}

export interface ProductionBlock {
  _type: "productionBlock";
  _key: string;
  heading?: string;
  subheading?: string;
  phases?: ProductionPhase[];
}

export type ContentBlock =
  | IntroductionBlock
  | ValuesBlock
  | ModelsBlock
  | TypeBlock
  | AccordionBlock
  | ProductionBlock;

export interface SanityImageAsset {
  asset?: {
    _id: string;
    _type: string;
    url: string;
  };
}

export interface PortableTextSpan {
  _type: "span";
  text?: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: "block";
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: Array<{ _key: string; _type: string }>;
}

export interface TextBlock {
  _type: "textBlock";
  _key: string;
  title?: string;
  pillColor?: "blue" | "green" | "lime" | "brown";
  heading?: string;
  body?: PortableTextBlock[];
}

export interface ImagesBlockItem {
  alt?: string;
  caption?: string;
  image?: SanityImageAsset;
}

export interface ImagesBlock {
  _type: "imagesBlock";
  _key: string;
  images?: ImagesBlockItem[];
}

export interface CarouselSlide {
  title?: string;
  description?: string;
  image?: SanityImageAsset;
}

export interface CarouselBlock {
  _type: "carouselBlock";
  _key: string;
  slides?: CarouselSlide[];
}

export interface ContactBlock {
  _type: "contactBlock";
  _key: string;
  badge?: string;
  heading?: string;
  description?: string;
  submitLabel?: string;
}

export interface StepItem {
  title: string;
  description: string;
  image?: SanityImageAsset;
}

export interface StepsBlock {
  _type: "stepsBlock";
  _key: string;
  heading?: string;
  steps?: StepItem[];
}

export interface FloorPlanBlockItem {
  alt?: string;
  caption?: string;
  image?: SanityImageAsset;
}

export interface FloorPlanBlock {
  _type: "floorPlanBlock";
  _key: string;
  heading?: string;
  floorPlans?: FloorPlanBlockItem[];
}

export interface ImageBlock {
  _type: "imageBlock";
  _key: string;
  alt?: string;
  caption?: string;
  image?: SanityImageAsset;
}

export interface CardItem {
  title: string;
  description?: string;
  image?: SanityImageAsset;
}

export interface CardsBlock {
  _type: "cardsBlock";
  _key: string;
  heading?: string;
  cards?: CardItem[];
}

export interface ModelType {
  _key: string;
  name: string;
  image?: SanityImageAsset;
  description?: PortableTextBlock[];
}

export interface TypeBlockModel {
  _id: string;
  _type: string;
  name: string;
  slug?: { current?: string };
  types?: ModelType[];
}

export interface TypeBlock {
  _type: "typeBlock";
  _key: string;
  title?: string;
  heading?: string;
  models?: TypeBlockModel[];
}

export type PageContentBlock =
  | TextBlock
  | ImagesBlock
  | CarouselBlock
  | ModelsBlock
  | ContactBlock
  | AccordionBlock
  | StepsBlock
  | CardsBlock;

export interface IntTypeBlock {
  _type: "intTypeBlock";
  _key: string;
  title?: string;
  heading?: string;
}

export type ModelContentBlock =
  | SpecificationsBlock
  | TextBlock
  | FloorPlanBlock
  | ImageBlock
  | ImagesBlock
  | CarouselBlock
  | CardsBlock
  | IntTypeBlock;

// Sanity Document Types
export interface HomeDocument {
  _id: string;
  _type: "home";
  _rev?: string;
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: {
    asset?: {
      _id: string;
      _type: string;
      url: string;
    };
  };
  canonicalUrl?: string;
  introduction?: string;
  hero?: Hero;
  contentBlocks?: ContentBlock[];
}

export interface SettingsDocument {
  _id: string;
  _type: "settings";
  _rev?: string;
  siteName?: string;
  siteDescription?: string;
  tagline?: string;
  subtagline?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: {
    asset?: {
      _id?: string;
      url?: string;
    };
  };
  navigation?: NavigationPage[];
  footer?: {
    contactText?: string;
    contactEmail?: string;
    contactEmailUrl?: string;
    findUsText?: string;
    address?: string;
    addressUrl?: string;
    followUsText?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
    }>;
  };
}

export interface ModelDocument extends ModelSpecifications {
  _id: string;
  _type: "model";
  _rev?: string;
  name: string;
  slug?: {
    _type?: "slug";
    current?: string;
  };
  description: string;
  size: string;
  capacity: string;
  rooms: string;
  floors: string;
  images?: Array<{
    asset?: {
      _id: string;
      _type: string;
      url: string;
    };
  }>;
  types?: ModelType[];
  contentBlocks?: ModelContentBlock[];
}

export interface PageDocument {
  _id: string;
  _type: "page";
  _rev?: string;
  name: string;
  slug?: {
    _type?: "slug";
    current?: string;
  };
  description?: string;
  introduction?: string;
  image?: SanityImageAsset;
  contentBlocks?: PageContentBlock[];
}