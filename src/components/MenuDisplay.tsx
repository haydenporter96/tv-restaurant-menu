import React from 'react';
import DishCard from './DishCard';

interface MenuDisplayProps {
  activeDishes: string[];
  specialText: string;
  isSpecialActive: boolean;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ activeDishes, specialText, isSpecialActive }) => {
  const hasHandPulledNoodles = activeDishes.includes("Hand Pulled Noodles");
  
  // Sort other dishes with Dumplings first to ensure it gets priority sizing
  const sortOtherDishes = (dishes: string[]) => {
    const otherDishes = dishes.filter(dish => dish !== "Hand Pulled Noodles");
    const dumplings = otherDishes.find(dish => dish === "Dumplings");
    const remainingDishes = otherDishes.filter(dish => dish !== "Dumplings");
    
    // Put Dumplings first if it exists, then add remaining dishes
    return dumplings ? [dumplings, ...remainingDishes] : remainingDishes;
  };
  
  const otherDishes = sortOtherDishes(activeDishes);
  const specialActive = isSpecialActive;
  
  const totalOtherItems = otherDishes.length + (specialActive ? 1 : 0);
  const totalItems = activeDishes.length + (specialActive ? 1 : 0);

  // Layout context for passing to DishCard components
  const layoutContext = {
    totalItems,
    hasHandPulledNoodles
  };

  const getLayoutClasses = () => {
    if (totalItems === 0) return '';
    
    // Special case: exactly 2 total items including Hand Pulled Noodles
    if (hasHandPulledNoodles && totalItems === 2) {
      return 'grid grid-cols-2 h-full';
    }
    
    if (hasHandPulledNoodles) {
      // Hand Pulled Noodles gets priority layout - always takes left half
      if (totalOtherItems === 1) {
        // This case is now handled above as special case
        return 'grid grid-cols-2 h-full';
      } else if (totalOtherItems === 2) {
        // HPN takes left half, other 2 stack vertically on right half  
        return 'grid grid-cols-2 grid-rows-2 h-full';
      } else if (totalOtherItems === 3) {
        // HPN takes left half, other 3 in right half (1 top, 2 bottom)
        return 'grid grid-cols-4 grid-rows-2 h-full';
      } else if (totalOtherItems === 4) {
        // HPN takes left half, other 4 in 2x2 grid on right half
        return 'grid grid-cols-4 grid-rows-2 h-full';
      } else if (totalOtherItems === 5) {
        // HPN takes left half, other 5 in right half
        return 'grid grid-cols-6 grid-rows-2 h-full';
      } else {
        // Only HPN
        return 'grid grid-cols-1 h-full';
      }
    } else {
      // No Hand Pulled Noodles, regular balanced grid
      switch (totalItems) {
        case 1:
          return 'grid grid-cols-1 h-full';
        case 2:
          return 'grid grid-cols-2 h-full';
        case 3:
          return 'grid grid-cols-3 h-full';
        case 4:
          return 'grid grid-cols-2 grid-rows-2 h-full';
        case 5:
          return 'grid grid-cols-3 grid-rows-2 h-full';
        case 6:
          return 'grid grid-cols-3 grid-rows-2 h-full';
        default:
          return 'grid grid-cols-1 h-full';
      }
    }
  };

  const getHandPulledNoodlesColSpan = () => {
    // Special case: exactly 2 total items including Hand Pulled Noodles
    if (totalItems === 2) return 'col-span-1 row-span-1';
    
    if (totalOtherItems === 0) return 'col-span-1 row-span-2';
    if (totalOtherItems === 1) return 'col-span-1 row-span-2';
    if (totalOtherItems === 2) return 'col-span-1 row-span-2';
    if (totalOtherItems === 3) return 'col-span-2 row-span-2';
    if (totalOtherItems === 4) return 'col-span-2 row-span-2';
    if (totalOtherItems === 5) return 'col-span-3 row-span-2';
    return 'col-span-1 row-span-2';
  };

  const getOtherDishSpan = (index: number) => {
    // Special case: exactly 2 total items including Hand Pulled Noodles
    if (hasHandPulledNoodles && totalItems === 2) {
      return 'col-span-1 row-span-1';
    }
    
    if (!hasHandPulledNoodles) {
      // Regular layouts without HPN
      if (totalItems === 5) {
        // First item spans 2 columns for balance
        return index === 0 ? 'col-span-2' : 'col-span-1';
      }
      return 'col-span-1';
    } else {
      // With HPN layouts
      if (totalOtherItems === 3) {
        // First item spans 2 columns, others span 1
        return index === 0 ? 'col-span-2' : 'col-span-1';
      }
      if (totalOtherItems === 5) {
        // First item spans 2 columns for balance
        return index === 0 ? 'col-span-2' : 'col-span-1';
      }
      return 'col-span-1';
    }
  };

  if (totalItems === 0) {
    return (
      <div 
        className="flex-1 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('lovable-uploads/40680c7b-f861-4a00-9539-85052dadddc8.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">No Dishes Available</h2>
          <p className="text-xl text-white drop-shadow-lg">Please check back later</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="flex-1 p-0 overflow-hidden"
      style={{
        backgroundImage: "url('lovable-uploads/40680c7b-f861-4a00-9539-85052dadddc8.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className={`${getLayoutClasses()} w-full h-full gap-0`}>
        {hasHandPulledNoodles && (
          <div className={`${getHandPulledNoodlesColSpan()} overflow-hidden`}>
            <DishCard
              name="Hand Pulled Noodles"
              size="half"
              layoutContext={layoutContext}
            />
          </div>
        )}
        
        {otherDishes.map((dish, index) => (
          <div key={index} className={`${getOtherDishSpan(index)} overflow-hidden`}>
            <DishCard
              name={dish}
              size="quarter"
              layoutContext={{
                ...layoutContext,
                isFirstOther: index === 0
              }}
            />
          </div>
        ))}
        
        {specialActive && (
          <div className={`${getOtherDishSpan(otherDishes.length)} overflow-hidden`}>
            <DishCard
              name="Special"
              isSpecial={true}
              specialText={specialText}
              size="quarter"
              layoutContext={{
                ...layoutContext,
                isFirstOther: otherDishes.length === 0
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuDisplay;
