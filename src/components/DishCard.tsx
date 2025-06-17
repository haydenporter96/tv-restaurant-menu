
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
  // Simplify the image naming to match uploaded files
  const getImageSizeSuffix = () => {
    if (!layoutContext) return '';
    
    const { totalItems, hasHandPulledNoodles } = layoutContext;
    
    // Try simpler naming first - just the layout number
    if (totalItems === 1) return '1';
    if (totalItems === 2) return '2';
    if (totalItems === 3) return '3';
    if (totalItems === 4) return '4';
    if (totalItems === 5) return '5';
    if (totalItems === 6) return '6';
    
    return '';
  };

  // Map dish names to your abbreviations
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
    if (!abbrev) {
      console.log(`No abbreviation found for dish: ${dishName}`);
      return `/images/placeholder.jpg`;
    }
    
    // Try different naming patterns
    const possiblePaths = [
      `/images/${abbrev}${sizeSuffix}.jpg`,
      `/images/${abbrev}_${sizeSuffix}.jpg`,
      `/images/${abbrev}.jpg`
    ];
    
    console.log(`Trying paths for ${dishName}:`, possiblePaths);
    return possiblePaths[0]; // Start with first pattern
  };

  const imagePath = isSpecial ? `/images/spec${getImageSizeSuffix()}.jpg` : getImagePath(name);

  // Log the image path for debugging
  console.log(`Loading image for ${name}: ${imagePath}`);

  return (
    <div className="w-full h-full overflow-hidden">
      <img 
        src={imagePath}
        alt={isSpecial ? `Special: ${specialText}` : name}
        className="w-full h-full object-cover"
        onError={(e) => {
          console.log(`Failed to load image: ${imagePath}`);
          const target = e.target as HTMLImageElement;
          
          // Try alternative naming patterns
          if (imagePath.includes('_4_dish_wn')) {
            const newPath = imagePath.replace('_4_dish_wn', '4');
            console.log(`Trying alternative path: ${newPath}`);
            target.src = newPath;
          } else if (imagePath.includes('4.jpg')) {
            const newPath = imagePath.replace('4.jpg', '.jpg');
            console.log(`Trying fallback without number: ${newPath}`);
            target.src = newPath;
          } else {
            target.src = "/images/placeholder.jpg";
          }
        }}
        onLoad={() => {
          console.log(`Successfully loaded image: ${imagePath}`);
        }}
      />
    </div>
  );
};

export default DishCard;
