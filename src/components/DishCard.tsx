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
    const hasHandPulledNoodles = layoutContext?.hasHandPulledNoodles || false;
    
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
    } else if (totalItems === 3 && !hasHandPulledNoodles) {
      // 3-dish layout without Hand Pulled Noodles
      const threeDishNoNoodlesImages: { [key: string]: string } = {
        "Dumplings": "/lovable-uploads/6e8581da-3f91-4a68-ae75-cce60badfdc4.png",
        "Jasmine Rice": "/lovable-uploads/9d334e22-7c50-4a55-803e-0fa0081a7dc9.png",
        "Pork Belly & Spinach with Rice": "/lovable-uploads/ce0a796b-78b4-47c5-bbcc-c53b11654ea3.png",
        "Smashed Cucumber Salad": "/lovable-uploads/d45655f1-f0ab-4dbb-9ccd-74b0555568eb.png"
      };
      return threeDishNoNoodlesImages[name];
    } else if (totalItems === 3) {
      // 3-dish layout with noodles
      const threeDishImages: { [key: string]: string } = {
        "Hand Pulled Noodles": "/lovable-uploads/abadaf3e-3a31-41bb-8a28-5531120a77b6.png",
        "Dumplings": "/lovable-uploads/9e2a908c-1aaf-47f3-b3d8-e8a7180e70e4.png",
        "Jasmine Rice": "/lovable-uploads/025f79e1-d5d2-46a1-a72e-1279a0a6cb24.png",
        "Pork Belly & Spinach with Rice": "/lovable-uploads/b4cb4b4f-f0ac-4dc9-8edc-fc460f3ff65d.png",
        "Smashed Cucumber Salad": "/lovable-uploads/64dbb69c-93f3-4b34-b257-16687aad0857.png"
      };
      return threeDishImages[name];
    } else if (totalItems === 4 && !hasHandPulledNoodles) {
      // 4-dish layout without noodles
      const fourDishImages: { [key: string]: string } = {
        "Dumplings": "/lovable-uploads/2f2ab513-3463-456f-8cba-f95a411301ce.png",
        "Jasmine Rice": "/lovable-uploads/a754c612-7ef1-49b8-b312-47c2f536069a.png",
        "Pork Belly & Spinach with Rice": "/lovable-uploads/e34f54f7-cfdf-41d0-bda1-35d45fcce085.png",
        "Smashed Cucumber Salad": "/lovable-uploads/079eefb4-9612-4952-991b-c6d895450080.png"
      };
      return fourDishImages[name];
    } else if (totalItems === 4 && hasHandPulledNoodles) {
      // 4-dish layout with Hand Pulled Noodles - Use 3-dish with HPN images for better fitting when dumplings is off
      const fourDishWithNoodlesImages: { [key: string]: string } = {
        "Hand Pulled Noodles": "/lovable-uploads/abadaf3e-3a31-41bb-8a28-5531120a77b6.png", // Use 3-dish HPN image
        "Dumplings": "/lovable-uploads/a280166a-fe37-449e-aabf-a9cbd216597c.png",
        "Jasmine Rice": "/lovable-uploads/025f79e1-d5d2-46a1-a72e-1279a0a6cb24.png", // Use 3-dish HPN image
        "Pork Belly & Spinach with Rice": "/lovable-uploads/b4cb4b4f-f0ac-4dc9-8edc-fc460f3ff65d.png", // Use 3-dish HPN image
        "Smashed Cucumber Salad": "/lovable-uploads/64dbb69c-93f3-4b34-b257-16687aad0857.png" // Use 3-dish HPN image
      };
      return fourDishWithNoodlesImages[name];
    } else if (totalItems === 5 && !hasHandPulledNoodles) {
      // 5-dish layout without Hand Pulled Noodles
      const fiveDishImages: { [key: string]: string } = {
        "Dumplings": "/lovable-uploads/a10c8dca-eb0d-4ee5-8ed0-944e23110653.png",
        "Jasmine Rice": "/lovable-uploads/98383cb4-b658-4eb0-92a7-0cf535c67c6b.png",
        "Pork Belly & Spinach with Rice": "/lovable-uploads/f0931fb6-727a-4c73-9436-94d77190b73b.png",
        "Smashed Cucumber Salad": "/lovable-uploads/16e314c3-3e5a-4c71-9103-a414b84714ac.png"
      };
      return fiveDishImages[name];
    } else if (totalItems === 5 && hasHandPulledNoodles) {
      // 5-dish layout with Hand Pulled Noodles
      const fiveDishWithNoodlesImages: { [key: string]: string } = {
        "Hand Pulled Noodles": "/lovable-uploads/085444fa-b18c-4398-bac1-79eeb210b380.png",
        "Dumplings": "/lovable-uploads/3c13576c-122a-462d-80ae-f801093a7af2.png",
        "Jasmine Rice": "/lovable-uploads/fbabe265-d39f-4386-8741-4171f7b038be.png",
        "Pork Belly & Spinach with Rice": "/lovable-uploads/b72c830c-01dd-4287-acf0-726b1e302b25.png",
        "Smashed Cucumber Salad": "/lovable-uploads/43d6bb64-b0d0-47ce-9324-3046c16b2992.png"
      };
      return fiveDishWithNoodlesImages[name];
    } else if (totalItems === 6) {
      // 6-dish layout 
      const sixDishImages: { [key: string]: string } = {
        "Hand Pulled Noodles": "/lovable-uploads/ff1d1425-a90d-4cc9-920c-3d3af7ca745b.png",
        "Dumplings": "/lovable-uploads/b1716ff4-2bde-4f8c-be76-6c1ffe8cfc13.png",
        "Jasmine Rice": "/lovable-uploads/274417c6-abaa-418f-a12a-5b85f645ce3a.png",
        "Pork Belly & Spinach with Rice": "/lovable-uploads/6d291047-e239-4269-885d-4a7f76078c45.png",
        "Smashed Cucumber Salad": "/lovable-uploads/9109adbf-037f-4ee1-bb2f-315819791065.png"
      };
      return sixDishImages[name];
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

  const getSpecialImageForLayout = () => {
    const totalItems = layoutContext?.totalItems || 1;
    const hasHandPulledNoodles = layoutContext?.hasHandPulledNoodles || false;
    
    if (totalItems === 2) {
      return "/lovable-uploads/ff81af7b-1f85-427d-89a7-a335137919b4.png";
    } else if (totalItems === 3 && !hasHandPulledNoodles) {
      return "/lovable-uploads/f6242254-0726-413d-a767-fb84cfdb90bc.png";
    } else if (totalItems === 4 && !hasHandPulledNoodles) {
      return "/lovable-uploads/65d3a28f-8ad1-455a-9157-86ce7d8be3e5.png";
    } else if (totalItems === 4 && hasHandPulledNoodles) {
      // Use 3-dish with HPN special image for better fitting
      return "/lovable-uploads/39d7dd3d-0eec-4bde-b60b-54563ce13b60.png";
    } else if (totalItems === 3) {
      return "/lovable-uploads/39d7dd3d-0eec-4bde-b60b-54563ce13b60.png";
    } else if (totalItems === 5 && !hasHandPulledNoodles) {
      return "/lovable-uploads/c1f7135d-34bb-41d1-919d-c112ca6a56e5.png";
    } else if (totalItems === 5 && hasHandPulledNoodles) {
      return "/lovable-uploads/6dc7ad6e-dc63-4749-b08f-15735a21931e.png";
    } else if (totalItems === 6) {
      return "/lovable-uploads/ae9be7e1-3b0b-4625-a9f4-5e26d5830fe1.png";
    }
    // Fallback to default special image for other layouts
    return "/lovable-uploads/412247f5-934b-49ae-911b-ecbc9d0176a7.png";
  };

  const getCurrentImageSrc = () => {
    if (isSpecial) {
      return getSpecialImageForLayout();
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
