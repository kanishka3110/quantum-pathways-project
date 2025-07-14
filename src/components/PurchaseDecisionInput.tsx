import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Sparkles, RotateCcw } from 'lucide-react';

interface PurchaseDecision {
  itemName: string;
  category: string;
  cheapPrice: number;
  qualityPrice: number;
}

interface PurchaseDecisionInputProps {
  onDecisionSubmit: (decision: PurchaseDecision) => void;
  onReset: () => void;
  isLoading: boolean;
}

const predefinedScenarios = [
  {
    name: 'Office Chair',
    category: 'furniture',
    cheapPrice: 50,
    qualityPrice: 400
  },
  {
    name: 'Laptop',
    category: 'electronics',
    cheapPrice: 300,
    qualityPrice: 1200
  },
  {
    name: 'Running Shoes',
    category: 'fitness',
    cheapPrice: 40,
    qualityPrice: 150
  },
  {
    name: 'Coffee Maker',
    category: 'appliances',
    cheapPrice: 25,
    qualityPrice: 200
  },
  {
    name: 'Winter Coat',
    category: 'clothing',
    cheapPrice: 60,
    qualityPrice: 300
  }
];

export const PurchaseDecisionInput = ({
  onDecisionSubmit,
  onReset,
  isLoading
}: PurchaseDecisionInputProps) => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [cheapPrice, setCheapPrice] = useState<number>(0);
  const [qualityPrice, setQualityPrice] = useState<number>(0);
  const [useCustom, setUseCustom] = useState(false);

  const handlePresetSelect = (scenario: typeof predefinedScenarios[0]) => {
    setItemName(scenario.name);
    setCategory(scenario.category);
    setCheapPrice(scenario.cheapPrice);
    setQualityPrice(scenario.qualityPrice);
    setUseCustom(false);
  };

  const handleSubmit = () => {
    if (!itemName || !category || cheapPrice <= 0 || qualityPrice <= 0) {
      return;
    }

    onDecisionSubmit({
      itemName,
      category,
      cheapPrice,
      qualityPrice
    });
  };

  const handleReset = () => {
    setItemName('');
    setCategory('');
    setCheapPrice(0);
    setQualityPrice(0);
    setUseCustom(false);
    onReset();
  };

  const isFormValid = itemName && category && cheapPrice > 0 && qualityPrice > 0;

  return (
    <Card className="quantum-card p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-xl bg-quantum-primary/20">
          <ShoppingCart className="w-5 h-5 text-quantum-primary" />
        </div>
        <div>
          <h3 className="quantum-subtitle">Purchase Decision</h3>
          <p className="text-sm text-muted-foreground">
            Compare cheap vs. quality choices to see your future
          </p>
        </div>
      </div>

      {!useCustom && (
        <div className="space-y-3">
          <Label className="quantum-label">Quick Scenarios</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {predefinedScenarios.map((scenario) => (
              <Card
                key={scenario.name}
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors quantum-glass"
                onClick={() => handlePresetSelect(scenario)}
              >
                <div className="text-sm font-medium">{scenario.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  ${scenario.cheapPrice} vs ${scenario.qualityPrice}
                </div>
              </Card>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setUseCustom(true)}
            className="w-full"
          >
            Create Custom Scenario
          </Button>
        </div>
      )}

      {(useCustom || itemName) && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemName" className="quantum-label">Item Name</Label>
            <Input
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., Office Chair, Laptop..."
              className="quantum-glass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="quantum-label">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="quantum-glass">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="appliances">Appliances</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cheapPrice" className="quantum-label">Budget Option ($)</Label>
              <Input
                id="cheapPrice"
                type="number"
                value={cheapPrice || ''}
                onChange={(e) => setCheapPrice(Number(e.target.value))}
                placeholder="50"
                className="quantum-glass"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualityPrice" className="quantum-label">Quality Option ($)</Label>
              <Input
                id="qualityPrice"
                type="number"
                value={qualityPrice || ''}
                onChange={(e) => setQualityPrice(Number(e.target.value))}
                placeholder="400"
                className="quantum-glass"
              />
            </div>
          </div>

          {useCustom && (
            <Button
              variant="outline"
              onClick={() => setUseCustom(false)}
              className="w-full"
            >
              Back to Presets
            </Button>
          )}
        </div>
      )}

      <div className="flex space-x-3">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className="quantum-button flex-1"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Visualizing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Visualize Future</span>
            </div>
          )}
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          disabled={isLoading}
          className="px-4"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};