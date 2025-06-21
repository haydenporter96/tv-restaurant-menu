
import React from 'react';

interface SpecialTextOverlayProps {
  text: string;
  layoutContext: {
    totalItems: number;
    hasHandPulledNoodles: boolean;
    isFirstOther?: boolean;
  };
}

const SpecialTextOverlay: React.FC<SpecialTextOverlayProps> = ({ text, layoutContext }) => {
  const getSafeZone = () => {
    const { totalItems, hasHandPulledNoodles, isFirstOther } = layoutContext;
    
    // Map your measurements to our layout conditions
    if (totalItems === 1) {
      // SPEC_1_DISH = 1435x566 centre of png
      return { width: '1435px', height: '566px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    } else if (totalItems === 2) {
      // SPEC_2_DISH = 772x536 centre of png
      return { width: '772px', height: '536px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    } else if (totalItems === 3 && !hasHandPulledNoodles) {
      // SPEC_3_DISH_NN = 483x551 centre of png
      return { width: '483px', height: '551px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    } else if (totalItems === 3 && hasHandPulledNoodles) {
      // SPEC_3_DISH_WN = 489x351 centre of png but 177px shifted to the right
      return { width: '489px', height: '351px', left: '50%', top: '50%', transform: 'translate(calc(-50% + 177px), -50%)' };
    } else if (totalItems === 4 && !hasHandPulledNoodles) {
      // SPEC_4_DISH_NN = 489x351 centre of png but 177px shifted to the right
      return { width: '489px', height: '351px', left: '50%', top: '50%', transform: 'translate(calc(-50% + 177px), -50%)' };
    } else if (totalItems === 4 && hasHandPulledNoodles && !isFirstOther) {
      // SPEC_4_DISH_WN = 379x253 centre of png
      return { width: '379px', height: '253px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    } else if (totalItems === 4 && hasHandPulledNoodles && isFirstOther) {
      // SPEC_4_DISH_WN_ND = 489x351 centre of png but 177px shifted to the right
      return { width: '489px', height: '351px', left: '50%', top: '50%', transform: 'translate(calc(-50% + 177px), -50%)' };
    } else if (totalItems === 5 && !hasHandPulledNoodles) {
      // SPEC_5_DISH_NN = 505x204 centre of png
      return { width: '505px', height: '204px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    } else if (totalItems === 5 && hasHandPulledNoodles) {
      // SPEC_5_DISH_WN = 379x253 centre of png
      return { width: '379px', height: '253px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    } else if (totalItems === 6) {
      // SPEC_6_DISH = 245x164 centre of png
      return { width: '245px', height: '164px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
    }
    
    // Fallback
    return { width: '300px', height: '200px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' };
  };

  const safeZone = getSafeZone();

  return (
    <div 
      className="absolute pointer-events-none flex items-center justify-center p-4"
      style={safeZone}
    >
      <div className="text-center text-white font-bold leading-tight">
        <span 
          className="drop-shadow-lg"
          style={{
            fontSize: 'clamp(14px, 2.5vw, 32px)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default SpecialTextOverlay;
