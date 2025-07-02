import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

function loadLocal<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

function saveLocal<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

interface ManagerPanelProps {
  activeDishes: string[];
  setActiveDishes: (dishes: string[]) => void;
  specialText: string;
  setSpecialText: (text: string) => void;
  isSpecialActive: boolean;
  setIsSpecialActive: (active: boolean) => void;
  onClose: () => void;
}

const ManagerPanel: React.FC<ManagerPanelProps> = ({
  activeDishes,
  setActiveDishes,
  specialText,
  setSpecialText,
  isSpecialActive,
  setIsSpecialActive,
  onClose
}) => {
  const availableDishes = [
    "Hand Pulled Noodles",
    "Dumplings",
    "Jasmine Rice",
    "Pork Belly & Spinach with Rice",
    "Smashed Cucumber Salad"
  ];

  useEffect(() => {
    const savedDishes = loadLocal<string[]>("activeDishes");
    const savedSpecialText = loadLocal<string>("specialText");
    const savedIsSpecial = loadLocal<boolean>("isSpecialActive");

    if (savedDishes) setActiveDishes(savedDishes);
    if (savedSpecialText) setSpecialText(savedSpecialText);
    if (savedIsSpecial !== null) setIsSpecialActive(savedIsSpecial);
  }, []);

  const toggleDish = (dish: string) => {
    if (activeDishes.includes(dish)) {
      const updated = activeDishes.filter(d => d !== dish);
      setActiveDishes(updated);
      saveLocal("activeDishes", updated);
    } else {
      const updated = [...activeDishes, dish];
      setActiveDishes(updated);
      saveLocal("activeDishes", updated);
    }
  };

  const totalActive = activeDishes.length + (isSpecialActive ? 1 : 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-xl">Manager Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Special Text</Label>
              <Textarea
                value={specialText}
                onChange={(e) => {
                  setSpecialText(e.target.value);
                  saveLocal("specialText", e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label>Enable Special</Label>
              <Switch
                checked={isSpecialActive}
                onCheckedChange={(value) => {
                  setIsSpecialActive(value);
                  saveLocal("isSpecialActive", value);
                }}
              />
            </div>
            <div>
              <Label>Available Dishes</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableDishes.map(dish => (
                  <Button
                    key={dish}
                    variant={activeDishes.includes(dish) ? 'default' : 'outline'}
                    onClick={() => toggleDish(dish)}
                  >
                    {dish}
                  </Button>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-500 mt-2">
              Total Items Displayed: {totalActive}
            </div>
            <Button className="mt-4 w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerPanel;
