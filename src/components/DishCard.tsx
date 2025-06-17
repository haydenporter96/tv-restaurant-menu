
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
  // Determine the layout suffix based on your naming convention
  const getImageSizeSuffix = () => {
    if (!layoutContext) return '';
    
    const { totalItems, hasHandPulledNoodles } = layoutContext;
    
    // Map total items and HPN presence to your layout naming
    if (totalItems === 1) return '_1_dish';
    if (totalItems === 2) return '_2_dish';
    if (totalItems === 3) return '_3_dish';
    if (totalItems === 4) {
      return hasHandPulledNoodles ? '_4_dish_wn' : '_4_dish_nn';
    }
    if (totalItems === 5) {
      return hasHandPulledNoodles ? '_5_dish_wn' : '_5_dish_nn';
    }
    if (totalItems === 6) return '_6_dish';
    
    return '';
  };

  // Map dish names to your abbreviations with layout suffix
  const getImagePath = (dishName: string) => {
    const sizeSuffix = getImageSizeSuffix();
    
    const dishAbbreviations: { [key: string]: string } = {
      "Hand Pulled Noodles": "hpn",
      "Dumplings": "dump",
      "Jasmine Rice": "jas",
      "Pork Belly & Spinach with Rice": "bps",
      "Smashed Cucumber Salad": "smash",
      "Special": "spec"
    };
    
    const abbrev = dishAbbreviations[dishName];
    if (!abbrev) return `/images/placeholder${sizeSuffix}.png`;
    
    return `/images/${abbrev}${sizeSuffix}.png`;
  };

  const imagePath = isSpecial ? `/images/spec${getImageSizeSuffix()}.png` : getImagePath(name);

  return (
    <div className="w-full h-full overflow-hidden">
      <img 
        src={imagePath}
        alt={isSpecial ? `Special: ${specialText}` : name}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to a default image if the specific image fails to load
          const target = e.target as HTMLImageElement;
          target.src = "/images/placeholder.png";
        }}
      />
    </div>
  );
};

export default DishCard;
