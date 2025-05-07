// types.ts

// Interface for accessory items
export interface Accessory {
    id: number;
    name: string;
    style: string;
    size: string;
  }
  
  // Type for the categories (house or land)
  export type Category = "house" | "land";
  
  // Available styles for accessories
  export const styles: string[] = [
    "Rustic", "Luxury", "Contemporary", "Industrial", "Traditional", 
    "Abstract", "Bohemian", "Vintage", "Modern", "Decorative", 
    "Functional", "Recreational", "Colorful", "Natural", "Serene", 
    "Playful", "Minimalist", "Victorian", "Eclectic", "Art Deco", 
    "Scandinavian", "Mediterranean", "Farmhouse", "Cottage", 
    "Mid-Century Modern", "Coastal", "Japanese Zen", "Tropical", 
    "Southwestern", "Gothic", "StyleNotSpecified"
  ];
  
  // Available sizes for accessories
  export const sizes: string[] = [
    "Small", "Medium", "Large", "Extra Large", "Compact", "Oversized",
    "Standard", "Mini", "Maxi", "Petite", "Tall", "Short", "Wide", 
    "Narrow", "Slim", "Spacious", "Cozy", "Roomy", "Generous", "Ample", 
    "Vast", "Expansive", "Breezy", "Open", "SizeNotSpecified"
  ];
  