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

  const getDynamicFontSize = () => {
    const { totalItems, hasHandPulledNoodles, isFirstOther } = layoutContext;
    const textLength = text.length;
    
    // Better balanced font sizes based on actual safe zone dimensions
    let baseFontSize = 40;
    
    if (totalItems === 1) {
      baseFontSize = 90; // Huge space (1435x566) - much larger
    } else if (totalItems === 2) {
      baseFontSize = 68; // Big space (772x536) - larger
    } else if (totalItems === 3) {
      baseFontSize = 48; // Medium space
    } else if (totalItems === 4) {
      // Different sizes based on safe zone area
      if (hasHandPulledNoodles && !isFirstOther) {
        baseFontSize = 38; // Smaller safe zone (379x253) - increased
      } else {
        baseFontSize = 44; // Larger safe zone (489x351)
      }
    } else if (totalItems === 5) {
      if (!hasHandPulledNoodles) {
        baseFontSize = 32; // Very narrow space (505x204) - increased
      } else {
        baseFontSize = 38; // Small square space (379x253) - increased
      }
    } else if (totalItems === 6) {
      baseFontSize = 28; // Smallest space (245x164) - increased
    }
    
    // Adjust font size based on text length
    let fontMultiplier = 1;
    if (textLength > 80) {
      fontMultiplier = 0.7;
    } else if (textLength > 50) {
      fontMultiplier = 0.8;
    } else if (textLength > 30) {
      fontMultiplier = 0.9;
    } else if (textLength < 15) {
      fontMultiplier = 1.1;
    }
    
    const finalSize = Math.round(baseFontSize * fontMultiplier);
    
    // Set minimum and maximum bounds
    return Math.max(20, Math.min(finalSize, 120));
  };

  const safeZone = getSafeZone();
  const fontSize = getDynamicFontSize();

  return (
    <div 
      className="absolute pointer-events-none flex items-center justify-center p-4"
      style={safeZone}
    >
      <div className="text-center text-black font-bold leading-tight">
        <span 
          className="drop-shadow-lg"
          style={{
            fontSize: `${fontSize}px`,
            textShadow: '2px 2px 4px rgba(255,255,255,0.8)',
            lineHeight: '1.2'
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default SpecialTextOverlay;
