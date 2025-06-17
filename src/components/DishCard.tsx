
import React, { useState } from 'react';

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasErrored, setHasErrored] = useState(false);

  // Define all possible image options for each dish
  const dishImageOptions: { [key: string]: string[] } = {
    "Hand Pulled Noodles": [
      "hpn_4_dish_wn.png",
      "hand_pulled_noodles.png",
      "noodles.png"
    ],
    "Dumplings": [
      "dump_4_dish_wn.png",
      "dumplings.png"
    ],
    "Jasmine Rice": [
      "jas_4_dish_wn.png",
      "jasmine_rice.png",
      "rice.png"
    ],
    "Pork Belly & Spinach with Rice": [
      "bps_4_dish_wn.png",
      "pork_belly_spinach.png"
    ],
    "Smashed Cucumber Salad": [
      "smash_4_dish_wn.png",
      "cucumber_salad.png"
    ]
  };

  const specialImageOptions = [
    "spec_4_dish_wn.png",
    "special.png"
  ];

  const getCurrentImageSrc = () => {
    if (hasErrored) {
      return "/images/placeholder.jpg";
    }

    if (isSpecial) {
      if (currentImageIndex >= specialImageOptions.length) {
        return "/images/placeholder.jpg";
      }
      return `/images/${specialImageOptions[currentImageIndex]}`;
    } else {
      const options = dishImageOptions[name] || [];
      if (currentImageIndex >= options.length) {
        return "/images/placeholder.jpg";
      }
      return `/images/${options[currentImageIndex]}`;
    }
  };

  const handleImageError = () => {
    console.log(`Image failed to load: ${getCurrentImageSrc()}`);
    
    const maxOptions = isSpecial ? specialImageOptions.length : (dishImageOptions[name]?.length || 0);
    
    if (currentImageIndex < maxOptions - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      console.log(`Trying next image option (index ${nextIndex})`);
    } else {
      console.log(`All image options exhausted, using placeholder`);
      setHasErrored(true);
    }
  };

  const handleImageLoad = () => {
    console.log(`Successfully loaded image: ${getCurrentImageSrc()}`);
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <img 
        src={getCurrentImageSrc()}
        alt={isSpecial ? `Special: ${specialText}` : name}
        className="w-full h-full object-cover"
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default DishCard;
