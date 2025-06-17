
import React from 'react';

interface DishCardProps {
  name: string;
  isSpecial?: boolean;
  specialText?: string;
  size: 'small' | 'medium' | 'large' | 'xlarge' | 'half' | 'quarter';
  layoutContext?: {
    totalItems: number;
    hasHandPulledNoodles: boolean;
    isFirstOther?: boolean;
  };
}

const DishCard: React.FC<DishCardProps> = ({ name, isSpecial, specialText, size, layoutContext }) => {
  // Map dish names to actual uploaded image file names
  const getImagePath = (dishName: string) => {
    const dishImageMap: { [key: string]: string } = {
      "Hand Pulled Noodles": "hpn_4_dish_wn.png",
      "Dumplings": "dump_4_dish_wn.png", 
      "Jasmine Rice": "jas_4_dish_wn.png",
      "Pork Belly & Spinach with Rice": "bps_4_dish_wn.png",
      "Smashed Cucumber Salad": "smash_4_dish_wn.png"
    };
    
    const imageFile = dishImageMap[dishName];
    if (!imageFile) {
      console.log(`No image mapping found for dish: ${dishName}`);
      return `/images/placeholder.jpg`;
    }
    
    const imagePath = `/images/${imageFile}`;
    console.log(`Loading image for ${dishName}: ${imagePath}`);
    return imagePath;
  };

  const imagePath = isSpecial ? `/images/spec_4_dish_wn.png` : getImagePath(name);

  return (
    <div className="w-full h-full overflow-hidden">
      <img 
        src={imagePath}
        alt={isSpecial ? `Special: ${specialText}` : name}
        className="w-full h-full object-cover"
        onError={(e) => {
          console.log(`Failed to load image: ${imagePath}`);
          const target = e.target as HTMLImageElement;
          target.src = "/images/placeholder.jpg";
        }}
        onLoad={() => {
          console.log(`Successfully loaded image: ${imagePath}`);
        }}
      />
    </div>
  );
};

export default DishCard;
