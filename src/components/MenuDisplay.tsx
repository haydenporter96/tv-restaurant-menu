
import React from 'react';
import DishCard from './DishCard';

interface MenuDisplayProps {
  activeDishes: string[];
  specialText: string;
  isSpecialActive: boolean;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ activeDishes, specialText, isSpecialActive }) => {
  const getLayoutClasses = (count: number) => {
    switch (count) {
      case 1:
        return 'grid grid-cols-1 place-items-center';
      case 2:
        return 'grid grid-cols-2 gap-8 place-items-center';
      case 3:
        return 'grid grid-cols-3 gap-6 place-items-center';
      case 4:
        return 'grid grid-cols-2 gap-6 place-items-center';
      case 5:
        return 'grid grid-cols-3 gap-4 place-items-center';
      case 6:
        return 'grid grid-cols-3 gap-4 place-items-center';
      default:
        return 'grid grid-cols-1 place-items-center';
    }
  };

  const getCardSize = (count: number) => {
    switch (count) {
      case 1:
        return 'xlarge';
      case 2:
        return 'large';
      case 3:
        return 'medium';
      case 4:
        return 'medium';
      case 5:
        return 'small';
      case 6:
        return 'small';
      default:
        return 'medium';
    }
  };

  const displayDishes = [...activeDishes];
  if (isSpecialActive) {
    displayDishes.push('special');
  }

  const totalCount = displayDishes.length;
  const cardSize = getCardSize(totalCount);

  if (totalCount === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-600 mb-4">No Dishes Available</h2>
          <p className="text-xl text-gray-500">Please check back later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className={`${getLayoutClasses(totalCount)} min-h-full`}>
        {activeDishes.map((dish, index) => (
          <DishCard
            key={index}
            name={dish}
            size={cardSize}
          />
        ))}
        {isSpecialActive && (
          <DishCard
            name="Special"
            isSpecial={true}
            specialText={specialText}
            size={cardSize}
          />
        )}
      </div>
    </div>
  );
};

export default MenuDisplay;
