
import React from 'react';

interface DishCardProps {
  name: string;
  isSpecial?: boolean;
  specialText?: string;
  size: 'small' | 'medium' | 'large' | 'xlarge' | 'half' | 'quarter';
}

const DishCard: React.FC<DishCardProps> = ({ name, isSpecial, specialText, size }) => {
  return (
    <div className="w-full h-full border-4 border-amber-600 rounded-none bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      <div className="h-full flex flex-col justify-center items-center p-6 overflow-hidden">
        {isSpecial ? (
          <div className="text-center overflow-hidden">
            <div className="bg-red-600 text-white px-4 py-2 rounded-full mb-4">
              <span className="text-lg font-bold">TODAY'S SPECIAL</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 break-words">{specialText || "Special Dish"}</h3>
            <div className="text-sm text-gray-600 bg-white/60 px-3 py-1 rounded">
              Custom Background Here
            </div>
          </div>
        ) : (
          <div className="text-center overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 break-words">{name}</h3>
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
