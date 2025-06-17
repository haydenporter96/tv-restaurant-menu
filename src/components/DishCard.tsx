
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

  // Map dish names to their uploaded images
  const dishImages: { [key: string]: string } = {
    "Hand Pulled Noodles": "/lovable-uploads/53aff4e4-6595-4ee9-a809-2df0f26ca0c9.png",
    "Dumplings": "/lovable-uploads/544547f6-0f79-4151-9f39-10560256c0f1.png",
    "Jasmine Rice": "/lovable-uploads/2488f124-96c9-4488-8b86-786396cd1436.png",
    "Pork Belly & Spinach with Rice": "/lovable-uploads/d32069e3-34c9-4395-a502-bd57a9036556.png",
    "Smashed Cucumber Salad": "/lovable-uploads/c3bf4e20-9cf8-4828-a0ee-db4708464a43.png"
  };

  const specialImage = "/lovable-uploads/412247f5-934b-49ae-911b-ecbc9d0176a7.png";

  const getCurrentImageSrc = () => {
    if (isSpecial) {
      return specialImage;
    } else {
      return dishImages[name] || "/images/placeholder.jpg";
    }
  };

  const handleImageError = () => {
    const currentSrc = getCurrentImageSrc();
    console.log(`❌ Image failed to load: ${currentSrc}`);
    setHasErrored(true);
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
