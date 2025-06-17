
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

  // More comprehensive image options - including common variations
  const dishImageOptions: { [key: string]: string[] } = {
    "Hand Pulled Noodles": [
      "hpn_4_dish_wn.png",
      "hand_pulled_noodles.png",
      "noodles.png",
      "hand-pulled-noodles.png",
      "handpullednoodles.png",
      "noodle.png"
    ],
    "Dumplings": [
      "dump_4_dish_wn.png",
      "dumplings.png",
      "dumpling.png",
      "gyoza.png"
    ],
    "Jasmine Rice": [
      "jas_4_dish_wn.png",
      "jasmine_rice.png",
      "rice.png",
      "jasmine-rice.png",
      "white_rice.png"
    ],
    "Pork Belly & Spinach with Rice": [
      "bps_4_dish_wn.png",
      "pork_belly_spinach.png",
      "pork-belly.png",
      "pork_belly.png"
    ],
    "Smashed Cucumber Salad": [
      "smash_4_dish_wn.png",
      "cucumber_salad.png",
      "cucumber.png",
      "salad.png"
    ]
  };

  const specialImageOptions = [
    "spec_4_dish_wn.png",
    "special.png",
    "special-dish.png",
    "todays-special.png"
  ];

  const placeholderOptions = [
    "placeholder.jpg",
    "placeholder.png",
    "default.jpg",
    "default.png",
    "no-image.jpg"
  ];

  const getCurrentImageSrc = () => {
    if (hasErrored) {
      // Try placeholder options
      const placeholderIndex = Math.min(currentImageIndex - getTotalDishOptions(), placeholderOptions.length - 1);
      if (placeholderIndex >= 0 && placeholderIndex < placeholderOptions.length) {
        return `/images/${placeholderOptions[placeholderIndex]}`;
      }
      return "/images/placeholder.jpg"; // final fallback
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

  const getTotalDishOptions = () => {
    if (isSpecial) {
      return specialImageOptions.length;
    }
    return dishImageOptions[name]?.length || 0;
  };

  const handleImageError = () => {
    const currentSrc = getCurrentImageSrc();
    console.log(`❌ Image failed to load: ${currentSrc}`);
    
    const totalDishOptions = getTotalDishOptions();
    const totalOptions = totalDishOptions + placeholderOptions.length;
    
    if (currentImageIndex < totalOptions - 1) {
      const nextIndex = currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      
      if (nextIndex >= totalDishOptions) {
        setHasErrored(true);
        console.log(`🔄 Trying placeholder option ${nextIndex - totalDishOptions + 1}/${placeholderOptions.length}`);
      } else {
        console.log(`🔄 Trying next image option ${nextIndex + 1}/${totalDishOptions}`);
      }
    } else {
      console.log(`❌ All image options exhausted for ${isSpecial ? 'Special' : name}`);
      setHasErrored(true);
    }
  };

  const handleImageLoad = () => {
    const currentSrc = getCurrentImageSrc();
    console.log(`✅ Successfully loaded: ${currentSrc}`);
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
