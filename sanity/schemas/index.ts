// All Sanity schemas registered in one place
import recipe from "./recipe";
import artPost from "./artPost";
import fashionPost from "./fashionPost";
import blogPost from "./blogPost";
import category from "./category";
import affiliateProduct from "./affiliateProduct";
import homepageSettings from "./homepageSettings";
import siteSettings from "./siteSettings";
import aboutPageSettings from "./aboutPageSettings";
import shopPageSettings from "./shopPageSettings";
import contactPageSettings from "./contactPageSettings";
import artPageSettings from "./artPageSettings";
import fashionPageSettings from "./fashionPageSettings";
import blockContent from "./blockContent";

export const schemaTypes = [
  // Content types
  recipe,
  artPost,
  fashionPost,
  blogPost,
  category,
  affiliateProduct,

  // Singletons
  homepageSettings,
  siteSettings,
  aboutPageSettings,
  shopPageSettings,
  contactPageSettings,
  artPageSettings,
  fashionPageSettings,

  // Shared types
  blockContent,
];
