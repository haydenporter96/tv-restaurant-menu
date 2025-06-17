
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
  // Map dish names to your abbreviations
  const getImagePath = (dishName: string) => {
    const dishAbbreviations: { [key: string]: string } = {
      "Hand Pulled Noodles": "hand_pulled_noodles",
      "Dumplings": "dumplings", 
      "Jasmine Rice": "jasmine_rice",
      "Pork Belly & Spinach with Rice": "belly_pork_spinach",
      "Smashed Cucumber Salad": "smashed_cucumber_salad",
      "Special": "special_dish"
    };
    
    const abbrev = dishAbbreviations[dishName];
    if (!abbrev) {
      console.log(`No abbreviation found for dish: ${dishName}`);
      return `/images/placeholder.jpg`;
    }
    
    // Use the full descriptive names for the images
    const imagePath = `/images/${abbrev}.jpg`;
    console.log(`Loading image for ${dishName}: ${imagePath}`);
    return imagePath;
  };

  const imagePath = isSpecial ? `/images/special_dish.jpg` : getImagePath(name);

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
