
import React from 'react';
import DishCard from './DishCard';

interface MenuDisplayProps {
  activeDishes: string[];
  specialText: string;
  isSpecialActive: boolean;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ activeDishes, specialText, isSpecialActive }) => {
  const hasHandPulledNoodles = activeDishes.includes("Hand Pulled Noodles");
  const otherDishes = activeDishes.filter(dish => dish !== "Hand Pulled Noodles");
  const specialActive = isSpecialActive;
  
  const totalOtherItems = otherDishes.length + (specialActive ? 1 : 0);
  const totalItems = activeDishes.length + (specialActive ? 1 : 0);

  const getLayoutClasses = () => {
    if (totalItems === 0) return '';
    
    if (hasHandPulledNoodles) {
      // Hand Pulled Noodles gets priority layout
      if (totalOtherItems === 0) {
        // Only Hand Pulled Noodles
        return 'grid grid-cols-1 h-full';
      } else if (totalOtherItems === 1) {
        // Hand Pulled Noodles + 1 other (50/50 split)
        return 'grid grid-cols-2 gap-8 h-full';
      } else if (totalOtherItems === 2) {
        // Hand Pulled Noodles takes half, other 2 split the other half
        return 'grid grid-cols-4 gap-4 h-full';
      } else if (totalOtherItems === 3) {
        // Hand Pulled Noodles takes half, other 3 in grid on other half
        return 'grid grid-cols-4 gap-4 h-full';
      } else if (totalOtherItems === 4) {
        // Hand Pulled Noodles takes half, other 4 in 2x2 grid
        return 'grid grid-cols-4 gap-4 h-full';
      } else {
        // 5+ items total, Hand Pulled Noodles takes half, others split remaining
        return 'grid grid-cols-6 gap-2 h-full';
      }
    } else {
      // No Hand Pulled Noodles, regular grid
      switch (totalItems) {
        case 1:
          return 'grid grid-cols-1 h-full';
        case 2:
          return 'grid grid-cols-2 gap-8 h-full';
        case 3:
          return 'grid grid-cols-3 gap-6 h-full';
        case 4:
          return 'grid grid-cols-2 gap-6 h-full';
        case 5:
          return 'grid grid-cols-3 gap-4 h-full';
        case 6:
          return 'grid grid-cols-3 gap-4 h-full';
        default:
          return 'grid grid-cols-1 h-full';
      }
    }
  };

  const getHandPulledNoodlesSize = () => {
    if (totalOtherItems === 0) return 'xlarge'; // 512x384px
    if (totalOtherItems <= 2) return 'half'; // Half container space
    return 'half'; // Still half for more items
  };

  const getOtherDishSize = () => {
    if (!hasHandPulledNoodles) {
      // No Hand Pulled Noodles, use regular sizing
      switch (totalItems) {
        case 1: return 'xlarge'; // 512x384px
        case 2: return 'large';  // 448x320px
        case 3: return 'medium'; // 384x256px
        case 4: return 'medium'; // 384x256px
        case 5: return 'small';  // 320x192px
        case 6: return 'small';  // 320x192px
        default: return 'medium';
      }
    } else {
      // With Hand Pulled Noodles, others are smaller
      if (totalOtherItems <= 2) return 'quarter'; // Quarter container space
      return 'quarter'; // Still quarter for more items
    }
  };

  const getHandPulledNoodlesColSpan = () => {
    if (totalOtherItems === 0) return 'col-span-1';
    if (totalOtherItems === 1) return 'col-span-1';
    if (totalOtherItems <= 4) return 'col-span-2';
    return 'col-span-3';
  };

  if (totalItems === 0) {
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
      <div className={`${getLayoutClasses()} min-h-full`}>
        {hasHandPulledNoodles && (
          <div className={`${getHandPulledNoodlesColSpan()}`}>
            <DishCard
              name="Hand Pulled Noodles"
              size={getHandPulledNoodlesSize()}
            />
          </div>
        )}
        
        {otherDishes.map((dish, index) => (
          <DishCard
            key={index}
            name={dish}
            size={getOtherDishSize()}
          />
        ))}
        
        {specialActive && (
          <DishCard
            name="Special"
            isSpecial={true}
            specialText={specialText}
            size={getOtherDishSize()}
          />
        )}
      </div>
    </div>
  );
};

export default MenuDisplay;
