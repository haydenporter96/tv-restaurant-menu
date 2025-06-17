
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
  // Try multiple possible image file names and extensions
  const getImagePath = (dishName: string) => {
    console.log(`Attempting to get image for dish: ${dishName}`);
    
    // Map dish names to possible image file names to try
    const dishImageOptions: { [key: string]: string[] } = {
      "Hand Pulled Noodles": [
        "hpn_4_dish_wn.png",
        "hpn_4_dish_wn.jpg", 
        "hand_pulled_noodles.png",
        "hand_pulled_noodles.jpg",
        "noodles.png",
        "noodles.jpg"
      ],
      "Dumplings": [
        "dump_4_dish_wn.png",
        "dump_4_dish_wn.jpg",
        "dumplings.png", 
        "dumplings.jpg"
      ],
      "Jasmine Rice": [
        "jas_4_dish_wn.png",
        "jas_4_dish_wn.jpg",
        "jasmine_rice.png",
        "jasmine_rice.jpg",
        "rice.png",
        "rice.jpg"
      ],
      "Pork Belly & Spinach with Rice": [
        "bps_4_dish_wn.png",
        "bps_4_dish_wn.jpg",
        "pork_belly_spinach.png",
        "pork_belly_spinach.jpg"
      ],
      "Smashed Cucumber Salad": [
        "smash_4_dish_wn.png",
        "smash_4_dish_wn.jpg",
        "cucumber_salad.png",
        "cucumber_salad.jpg"
      ]
    };
    
    const options = dishImageOptions[dishName];
    if (!options || options.length === 0) {
      console.log(`No image options found for dish: ${dishName}`);
      return `/images/placeholder.jpg`;
    }
    
    // Return the first option for now, we'll handle fallbacks in the component
    const primaryOption = options[0];
    const imagePath = `/images/${primaryOption}`;
    console.log(`Primary image path for ${dishName}: ${imagePath}`);
    return imagePath;
  };

  const specialImageOptions = [
    "spec_4_dish_wn.png",
    "spec_4_dish_wn.jpg",
    "special.png", 
    "special.jpg"
  ];

  const imagePath = isSpecial ? `/images/${specialImageOptions[0]}` : getImagePath(name);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log(`Failed to load image: ${imagePath}`);
    const target = e.target as HTMLImageElement;
    
    // Try alternative image paths for this specific dish
    if (isSpecial) {
      // Try other special image options
      const currentSrc = target.src;
      const currentFileName = currentSrc.split('/').pop();
      const currentIndex = specialImageOptions.findIndex(option => option === currentFileName);
      
      if (currentIndex < specialImageOptions.length - 1) {
        const nextOption = specialImageOptions[currentIndex + 1];
        console.log(`Trying alternative special image: ${nextOption}`);
        target.src = `/images/${nextOption}`;
        return;
      }
    } else {
      // Try other options for regular dishes
      const dishImageOptions: { [key: string]: string[] } = {
        "Hand Pulled Noodles": [
          "hpn_4_dish_wn.png",
          "hpn_4_dish_wn.jpg", 
          "hand_pulled_noodles.png",
          "hand_pulled_noodles.jpg",
          "noodles.png",
          "noodles.jpg"
        ],
        "Dumplings": [
          "dump_4_dish_wn.png",
          "dump_4_dish_wn.jpg",
          "dumplings.png", 
          "dumplings.jpg"
        ],
        "Jasmine Rice": [
          "jas_4_dish_wn.png",
          "jas_4_dish_wn.jpg",
          "jasmine_rice.png",
          "jasmine_rice.jpg",
          "rice.png",
          "rice.jpg"
        ],
        "Pork Belly & Spinach with Rice": [
          "bps_4_dish_wn.png",
          "bps_4_dish_wn.jpg",
          "pork_belly_spinach.png",
          "pork_belly_spinach.jpg"
        ],
        "Smashed Cucumber Salad": [
          "smash_4_dish_wn.png",
          "smash_4_dish_wn.jpg",
          "cucumber_salad.png",
          "cucumber_salad.jpg"
        ]
      };
      
      const options = dishImageOptions[name];
      if (options) {
        const currentSrc = target.src;
        const currentFileName = currentSrc.split('/').pop();
        const currentIndex = options.findIndex(option => option === currentFileName);
        
        if (currentIndex < options.length - 1) {
          const nextOption = options[currentIndex + 1];
          console.log(`Trying alternative image for ${name}: ${nextOption}`);
          target.src = `/images/${nextOption}`;
          return;
        }
      }
    }
    
    // All options exhausted, use placeholder
    console.log(`All image options exhausted for ${isSpecial ? 'Special' : name}, using placeholder`);
    target.src = "/images/placeholder.jpg";
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <img 
        src={imagePath}
        alt={isSpecial ? `Special: ${specialText}` : name}
        className="w-full h-full object-cover"
        onError={handleImageError}
        onLoad={() => {
          console.log(`Successfully loaded image: ${imagePath}`);
        }}
      />
    </div>
  );
};

export default DishCard;
