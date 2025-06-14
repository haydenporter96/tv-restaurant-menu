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
  // Determine the image size suffix based on layout context
  const getImageSizeSuffix = () => {
    if (!layoutContext) return '';
    
    const { totalItems, hasHandPulledNoodles, isFirstOther } = layoutContext;
    
    if (name === "Hand Pulled Noodles") {
      // HPN sizing based on total items
      if (totalItems === 1) return '-xlarge';
      if (totalItems === 2) return '-large';
      if (totalItems >= 3 && totalItems <= 4) return '-medium';
      if (totalItems >= 5) return '-small';
    } else {
      // Other dishes sizing
      if (!hasHandPulledNoodles) {
        // No HPN layouts
        if (totalItems === 1) return '-xlarge';
        if (totalItems === 2) return '-large';
        if (totalItems === 3) return '-medium';
        if (totalItems === 4) return '-medium';
        if (totalItems === 5) return isFirstOther ? '-medium' : '-small';
        if (totalItems === 6) return '-small';
      } else {
        // With HPN layouts
        if (totalItems === 2) return '-large';
        if (totalItems === 3) return '-medium';
        if (totalItems === 4) return '-medium';
        if (totalItems === 5) return '-small';
        if (totalItems === 6) return isFirstOther ? '-medium' : '-small';
      }
    }
    
    return '';
  };

  // Map dish names to image file names with size suffix
  const getImagePath = (dishName: string) => {
    const sizeSuffix = getImageSizeSuffix();
    
    const imageMap: { [key: string]: string } = {
      "Hand Pulled Noodles": `/images/hand-pulled-noodles${sizeSuffix}.png`,
      "Dumplings": `/images/dumplings${sizeSuffix}.png`,
      "Jasmine Rice": `/images/jasmine-rice${sizeSuffix}.png`,
      "Pork Belly & Spinach with Rice": `/images/pork-belly-spinach${sizeSuffix}.png`,
      "Smashed Cucumber Salad": `/images/cucumber-salad${sizeSuffix}.png`,
      "Special": `/images/special${sizeSuffix}.png`
    };
    
    return imageMap[dishName] || `/images/placeholder${sizeSuffix}.png`;
  };

  const imagePath = isSpecial ? `/images/special${getImageSizeSuffix()}.png` : getImagePath(name);

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
