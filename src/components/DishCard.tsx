
import React from 'react';

interface DishCardProps {
  name: string;
  isSpecial?: boolean;
  specialText?: string;
  size: 'small' | 'medium' | 'large' | 'xlarge' | 'half' | 'quarter';
}

const DishCard: React.FC<DishCardProps> = ({ name, isSpecial, specialText, size }) => {
  // Map dish names to image file names
  const getImagePath = (dishName: string) => {
    const imageMap: { [key: string]: string } = {
      "Hand Pulled Noodles": "/images/hand-pulled-noodles.png",
      "Dumplings": "/images/dumplings.png",
      "Jasmine Rice": "/images/jasmine-rice.png",
      "Pork Belly & Spinach with Rice": "/images/pork-belly-spinach.png",
      "Smashed Cucumber Salad": "/images/cucumber-salad.png",
      "Special": "/images/special.png"
    };
    
    return imageMap[dishName] || "/images/placeholder.png";
  };

  const imagePath = isSpecial ? "/images/special.png" : getImagePath(name);

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
