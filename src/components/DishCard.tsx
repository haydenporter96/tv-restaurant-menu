
import React from 'react';

interface DishCardProps {
  name: string;
  isSpecial?: boolean;
  specialText?: string;
  size: 'small' | 'medium' | 'large' | 'xlarge';
}

const DishCard: React.FC<DishCardProps> = ({ name, isSpecial, specialText, size }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-80 h-48'; // 320x192px
      case 'medium':
        return 'w-96 h-64'; // 384x256px
      case 'large':
        return 'w-112 h-80'; // 448x320px
      case 'xlarge':
        return 'w-128 h-96'; // 512x384px
      default:
        return 'w-96 h-64';
    }
  };

  return (
    <div className={`${getSizeClasses()} border-4 border-amber-600 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105`}>
      <div className="h-full flex flex-col justify-center items-center p-6">
        {isSpecial ? (
          <div className="text-center">
            <div className="bg-red-600 text-white px-4 py-2 rounded-full mb-4">
              <span className="text-lg font-bold">TODAY'S SPECIAL</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{specialText || "Special Dish"}</h3>
            <div className="text-sm text-gray-600 bg-white/60 px-3 py-1 rounded">
              Custom Background Here
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{name}</h3>
            <div className="text-sm text-gray-600 bg-white/60 px-3 py-1 rounded">
              Dish Image Placeholder
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DishCard;
