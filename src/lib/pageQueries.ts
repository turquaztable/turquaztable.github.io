/**
 * Page-specific GROQ queries
 * Fetches settings from page-level singleton documents.
 * Each function returns data with fallback defaults so pages
 * render correctly even when the singleton has not been created.
 */
import { sanityClient } from "./sanity";

// --- ABOUT PAGE ---

export interface AboutPageData {
  introHeading: string | null;
  connectHeading: string;
  connectBody: string;
  showGetInTouchButton: boolean;
  getInTouchText: string;
  getInTouchLink: string;
  showSubscribeButton: boolean;
  subscribeText: string;
  subscribeLink: string;
}

export async function getAboutPageSettings(): Promise<AboutPageData> {
  const result = await sanityClient.fetch(`
    *[_id == "aboutPageSettings"][0] {
      introHeading,
      connectHeading,
      connectBody,
      showGetInTouchButton,
      getInTouchText,
      getInTouchLink,
      showSubscribeButton,
      subscribeText,
      subscribeLink
    }
  `);
  return {
    introHeading: result?.introHeading || null,
    connectHeading: result?.connectHeading || "Let's Connect",
    connectBody:
      result?.connectBody ||
      "I love hearing from you. Follow along on social media, send me a message, or sign up for my newsletter to get new recipes delivered to your inbox.",
    showGetInTouchButton: result?.showGetInTouchButton !== false,
    getInTouchText: result?.getInTouchText || "Get in Touch",
    getInTouchLink: result?.getInTouchLink || "/contact",
    showSubscribeButton: result?.showSubscribeButton !== false,
    subscribeText: result?.subscribeText || "Subscribe",
    subscribeLink: result?.subscribeLink || "/#newsletter",
  };
}

// --- SHOP PAGE ---

export interface LocalOrderItem {
  name: string;
  description?: string;
  price?: string;
  image?: any;
}

export interface CategoryOrderEntry {
  categoryKey: string;
  label?: string;
}

export interface ShopPageData {
  showDisclosure: boolean;
  disclosureText: string;
  showTopPicks: boolean;
  topPicksHeading: string;
  categoryOrder: CategoryOrderEntry[];
  showLocalOrders: boolean;
  localOrdersHeading: string;
  localOrdersDescription: string;
  localOrdersItems: LocalOrderItem[];
  localOrdersContact: string;
  localOrdersAvailability: string;
}

export async function getShopPageSettings(): Promise<ShopPageData> {
  const result = await sanityClient.fetch(`
    *[_id == "shopPageSettings"][0] {
      showDisclosure,
      disclosureText,
      showTopPicks,
      topPicksHeading,
      categoryOrder[] {
        categoryKey,
        label
      },
      showLocalOrders,
      localOrdersHeading,
      localOrdersDescription,
      localOrdersItems[] {
        name,
        description,
        price,
        image
      },
      localOrdersContact,
      localOrdersAvailability
    }
  `);
  return {
    showDisclosure: result?.showDisclosure !== false,
    disclosureText:
      result?.disclosureText ||
      "This page contains affiliate links. I earn a small commission if you purchase through these links, at no extra cost to you. I only recommend products I genuinely use and love.",
    showTopPicks: result?.showTopPicks !== false,
    topPicksHeading: result?.topPicksHeading || "Top Picks",
    categoryOrder: result?.categoryOrder || [],
    showLocalOrders: result?.showLocalOrders === true,
    localOrdersHeading: result?.localOrdersHeading || "Local Orders",
    localOrdersDescription: result?.localOrdersDescription || "",
    localOrdersItems: result?.localOrdersItems || [],
    localOrdersContact: result?.localOrdersContact || "",
    localOrdersAvailability: result?.localOrdersAvailability || "",
  };
}

// --- CONTACT PAGE ---

export interface ContactSection {
  heading: string;
  description: string;
}

export interface ContactPageData {
  pageHeading: string;
  pageIntro: string;
  showGeneral: boolean;
  generalHeading: string;
  generalDescription: string;
  showPress: boolean;
  pressHeading: string;
  pressDescription: string;
  showArtCommissions: boolean;
  artCommissionsHeading: string;
  artCommissionsDescription: string;
  customSections: ContactSection[];
}

export async function getContactPageSettings(): Promise<ContactPageData> {
  const result = await sanityClient.fetch(`
    *[_id == "contactPageSettings"][0] {
      pageHeading,
      pageIntro,
      showGeneral,
      generalHeading,
      generalDescription,
      showPress,
      pressHeading,
      pressDescription,
      showArtCommissions,
      artCommissionsHeading,
      artCommissionsDescription,
      customSections[] {
        heading,
        description
      }
    }
  `);
  return {
    pageHeading: result?.pageHeading || "Let's Connect",
    pageIntro:
      result?.pageIntro ||
      "Have a question, collaboration idea, or just want to say hi? I'd love to hear from you.",
    showGeneral: result?.showGeneral !== false,
    generalHeading: result?.generalHeading || "General Inquiries",
    generalDescription:
      result?.generalDescription ||
      "For recipe questions, collaborations, or just to say hello - the best way to reach me is through my social media channels or by sending a direct message on Instagram.",
    showPress: result?.showPress !== false,
    pressHeading: result?.pressHeading || "Press & Collaborations",
    pressDescription:
      result?.pressDescription ||
      "Interested in working together? I'm open to brand partnerships, recipe development, content creation, and other creative collaborations. Please reach out via DM or email with details about your project.",
    showArtCommissions: result?.showArtCommissions !== false,
    artCommissionsHeading: result?.artCommissionsHeading || "Art Commissions",
    artCommissionsDescription:
      result?.artCommissionsDescription ||
      "Interested in a custom painting or print? Send me a message on Instagram with details about what you're looking for, and I'll get back to you with pricing and availability.",
    customSections: result?.customSections || [],
  };
}

// --- ART PAGE ---

export interface GalleryPageData {
  pageHeading: string;
  pageIntro: string;
  showIntro: boolean;
  showCallout: boolean;
  calloutHeading: string;
  calloutBody: string;
  calloutImage: any;
}

export async function getArtPageSettings(): Promise<GalleryPageData> {
  const result = await sanityClient.fetch(`
    *[_id == "artPageSettings"][0] {
      pageHeading,
      pageIntro,
      showIntro,
      showCallout,
      calloutHeading,
      calloutBody,
      calloutImage
    }
  `);
  return {
    pageHeading: result?.pageHeading || "Art & Painting",
    pageIntro: result?.pageIntro || "",
    showIntro: result?.showIntro !== false,
    showCallout: result?.showCallout === true,
    calloutHeading: result?.calloutHeading || "",
    calloutBody: result?.calloutBody || "",
    calloutImage: result?.calloutImage || null,
  };
}

// --- FASHION PAGE ---

export async function getFashionPageSettings(): Promise<GalleryPageData> {
  const result = await sanityClient.fetch(`
    *[_id == "fashionPageSettings"][0] {
      pageHeading,
      pageIntro,
      showIntro,
      showCallout,
      calloutHeading,
      calloutBody,
      calloutImage
    }
  `);
  return {
    pageHeading: result?.pageHeading || "Fashion & Makeup",
    pageIntro: result?.pageIntro || "",
    showIntro: result?.showIntro !== false,
    showCallout: result?.showCallout === true,
    calloutHeading: result?.calloutHeading || "",
    calloutBody: result?.calloutBody || "",
    calloutImage: result?.calloutImage || null,
  };
}
