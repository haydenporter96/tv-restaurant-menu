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

  // Map dish names to their uploaded images based on layout
  const getImageForLayout = () => {
    const totalItems = layoutContext?.totalItems || 1;
    
    if (totalItems === 1) {
      // 1-dish layout images
      const singleDishImages: { [key: string]: string } = {
        "Hand Pulled Noodles": "/lovable-uploads/53aff4e4-6595-4ee9-a809-2df0f26ca0c9.png",
        "Dumplings": "/lovable-uploads/544547f6-0f79-4151-9f39-10560256c0f1.png",
        "Jasmine Rice": "/lovable-uploads/2488f124-96c9-4488-8b86-786396cd1436.png",
        "Pork Belly & Spinach with Rice": "/lovable-uploads/d32069e3-34c9-4395-a502-bd57a9036556.png",
        "Smashed Cucumber Salad": "/lovable-uploads/c3bf4e20-9cf8-4828-a0ee-db4708464a43.png"
      };
      return singleDishImages[name];
    } else if (totalItems === 2) {
      // 2-dish layout images
      const twoDishImages: { [key: string]: string } = {
        "Hand Pulled Noodles": "/lovable-uploads/1cb9fd45-6c94-4963-8c6c-a2eec3ce42de.png",
        "Dumplings": "/lovable-uploads/0820e25b-9cb1-49ae-a8a5-1fd11a1f27e4.png",
        "Jasmine Rice": "/lovable-uploads/6d836bec-9ef6-4a11-8ec7-0c9ad585aa40.png",
        "Pork Belly & Spinach with Rice": "/lovable-uploads/7c048fc0-0070-44da-9ccd-32f339b72fc9.png",
        "Smashed Cucumber Salad": "/lovable-uploads/c841f3f7-4de5-4e24-a53c-4e5a297eca7b.png"
      };
      return twoDishImages[name];
    } else if (totalItems === 3) {
      // 3-dish layout images
      const threeDishImages: { [key: string]: string } = {
        "Hand Pulled Noodles": "/lovable-uploads/abadaf3e-3a31-41bb-8a28-5531120a77b6.png",
        "Dumplings": "/lovable-uploads/9e2a908c-1aaf-47f3-b3d8-e8a7180e70e4.png",
        "Jasmine Rice": "/lovable-uploads/025f79e1-d5d2-46a1-a72e-1279a0a6cb24.png",
        "Pork Belly & Spinach with Rice": "/lovable-uploads/b4cb4b4f-f0ac-4dc9-8edc-fc460f3ff65d.png",
        "Smashed Cucumber Salad": "/lovable-uploads/64dbb69c-93f3-4b34-b257-16687aad0857.png"
      };
      return threeDishImages[name];
    }
    
    // Fallback to 1-dish layout for other layouts until updated
    const fallbackImages: { [key: string]: string } = {
      "Hand Pulled Noodles": "/lovable-uploads/53aff4e4-6595-4ee9-a809-2df0f26ca0c9.png",
      "Dumplings": "/lovable-uploads/544547f6-0f79-4151-9f39-10560256c0f1.png",
      "Jasmine Rice": "/lovable-uploads/2488f124-96c9-4488-8b86-786396cd1436.png",
      "Pork Belly & Spinach with Rice": "/lovable-uploads/d32069e3-34c9-4395-a502-bd57a9036556.png",
      "Smashed Cucumber Salad": "/lovable-uploads/c3bf4e20-9cf8-4828-a0ee-db4708464a43.png"
    };
    return fallbackImages[name];
  };

  const specialImage = isSpecial ? "/lovable-uploads/39d7dd3d-0eec-4bde-b60b-54563ce13b60.png" : "/lovable-uploads/412247f5-934b-49ae-911b-ecbc9d0176a7.png";

  const getCurrentImageSrc = () => {
    if (isSpecial) {
      return specialImage;
    } else {
      return getImageForLayout() || "/images/placeholder.jpg";
    }
  };

  const handleImageError = () => {
    const currentSrc = getCurrentImageSrc();
    console.log(`❌ Image failed to load: ${currentSrc}`);
    setHasErrored(true);
  };

  const handleImageLoad = () => {
    const currentSrc = getCurrentImageSrc();
    const totalItems = layoutContext?.totalItems || 1;
    console.log(`✅ Successfully loaded ${totalItems}-dish layout: ${currentSrc}`);
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
