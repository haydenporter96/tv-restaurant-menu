
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
  // Determine the exact image size suffix based on precise layout calculations
  // Total display: 1920x1080, Header: 120px, Menu area: 1920x960
  const getImageSizeSuffix = () => {
    if (!layoutContext) return '';
    
    const { totalItems, hasHandPulledNoodles, isFirstOther } = layoutContext;
    
    if (name === "Hand Pulled Noodles") {
      // HPN sizing based on total items - always takes left half or full width
      if (totalItems === 1) return '-1920x960'; // Full menu area
      if (totalItems === 2) return '-960x960'; // Left half, square
      if (totalItems >= 3 && totalItems <= 4) return '-960x960'; // Left half, square
      if (totalItems >= 5) return '-960x960'; // Left half, square
    } else {
      // Other dishes sizing
      if (!hasHandPulledNoodles) {
        // No HPN layouts - dishes fill entire menu area
        if (totalItems === 1) return '-1920x960'; // Full menu area
        if (totalItems === 2) return '-960x960'; // Half width, full height
        if (totalItems === 3) return '-640x960'; // Third width, full height
        if (totalItems === 4) return '-960x480'; // Half width, half height
        if (totalItems === 5) return isFirstOther ? '-960x480' : '-480x480'; // First gets 2 cols, others 1 col
        if (totalItems === 6) return '-640x480'; // Third width, half height
      } else {
        // With HPN layouts - dishes share right half (960px width)
        if (totalItems === 2) return '-960x960'; // Right half, full height
        if (totalItems === 3) return '-960x480'; // Right half, half height
        if (totalItems === 4) return '-480x480'; // Quarter of menu area
        if (totalItems === 5) return '-480x480'; // Quarter of menu area
        if (totalItems === 6) return isFirstOther ? '-480x480' : '-320x480'; // Varied based on position
      }
    }
    
    return '';
  };

  // Map dish names to image file names with precise size suffix
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
