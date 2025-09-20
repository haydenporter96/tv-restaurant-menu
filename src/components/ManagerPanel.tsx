
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

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

  const toggleDish = (dish: string) => {
    if (activeDishes.includes(dish)) {
      setActiveDishes(activeDishes.filter(d => d !== dish));
    } else {
      setActiveDishes([...activeDishes, dish]);
    }
  };

  const totalActive = activeDishes.length + (isSpecialActive ? 1 : 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Manager Panel</span>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu Status</h3>
            <p className="text-sm text-gray-600 mb-2">
              Currently showing {totalActive} items on the menu
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Regular Dishes</h3>
            <div className="space-y-3">
              {availableDishes.map((dish) => (
                <div key={dish} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Switch
                    checked={activeDishes.includes(dish)}
                    onCheckedChange={() => toggleDish(dish)}
                  />
                  <Label className="flex-1 cursor-pointer">{dish}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Today's Special</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Switch
                  checked={isSpecialActive}
                  onCheckedChange={setIsSpecialActive}
                />
                <Label className="cursor-pointer">Enable Special</Label>
              </div>
              
              {isSpecialActive && (
                <div>
                  <Label htmlFor="special-text">Special Description</Label>
                  <Textarea
                    id="special-text"
                    value={specialText}
                    onChange={(e) => setSpecialText(e.target.value)}
                    placeholder="Enter today's special..."
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t">
            <h4 className="font-semibold mb-2">Layout Information:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• 1 item: 512×384px boxes (XLarge)</p>
              <p>• 2 items: 448×320px boxes (Large)</p>
              <p>• 3-4 items: 384×256px boxes (Medium)</p>
              <p>• 5-6 items: 320×192px boxes (Small)</p>
              <p>• Header: 1920×120px (Full width TV display)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerPanel;
