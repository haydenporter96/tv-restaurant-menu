
import React, { useState } from 'react';
import Header from '@/components/Header';
import MenuDisplay from '@/components/MenuDisplay';
import ManagerPanel from '@/components/ManagerPanel';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeDishes, setActiveDishes] = useState<string[]>([
    "Hand Pulled Noodles",
    "Dumplings",
    "Jasmine Rice"
  ]);
  const [specialText, setSpecialText] = useState("Kung Pao Chicken with Cashews");
  const [isSpecialActive, setIsSpecialActive] = useState(true);
  const [showManagerPanel, setShowManagerPanel] = useState(false);

  // Secret key combination to open manager panel
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        setShowManagerPanel(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-orange-100">
      <Header />
      
      <MenuDisplay 
        activeDishes={activeDishes}
        specialText={specialText}
        isSpecialActive={isSpecialActive}
      />

      {/* Hidden manager access button for testing */}
      <Button
        className="fixed bottom-4 right-4 opacity-10 hover:opacity-100 transition-opacity"
        onClick={() => setShowManagerPanel(true)}
        variant="outline"
        size="sm"
      >
        Manager
      </Button>

      {showManagerPanel && (
        <ManagerPanel
          activeDishes={activeDishes}
          setActiveDishes={setActiveDishes}
          specialText={specialText}
          setSpecialText={setSpecialText}
          isSpecialActive={isSpecialActive}
          setIsSpecialActive={setIsSpecialActive}
          onClose={() => setShowManagerPanel(false)}
        />
      )}
    </div>
  );
};

export default Index;
