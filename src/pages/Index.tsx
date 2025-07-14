import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PurchaseDecisionInput } from '@/components/PurchaseDecisionInput';
import { FutureSelfVisualizer } from '@/components/FutureSelfVisualizer';
import { LifeImpactDashboard } from '@/components/LifeImpactDashboard';
import { useToast } from '@/hooks/use-toast';
import { 
  Sparkles, 
  BarChart3, 
  Users, 
  Clock, 
  ArrowLeftRight,
  Brain
} from 'lucide-react';

interface PurchaseDecision {
  itemName: string;
  category: string;
  cheapPrice: number;
  qualityPrice: number;
}

interface LifeImpactData {
  health: { cheap: number; quality: number };
  financial: { cheap: number; quality: number };
  social: { cheap: number; quality: number };
  career: { cheap: number; quality: number };
  wellbeing: { cheap: number; quality: number };
  productivity: { cheap: number; quality: number };
}

const Index = () => {
  const [currentDecision, setCurrentDecision] = useState<PurchaseDecision | null>(null);
  const [lifeImpactData, setLifeImpactData] = useState<LifeImpactData | null>(null);
  const [currentScenario, setCurrentScenario] = useState<'cheap' | 'quality' | 'comparison'>('comparison');
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>('');
  const { toast } = useToast();

  // Simulate quantum decision engine calculation
  const calculateLifeImpact = (decision: PurchaseDecision): LifeImpactData => {
    const priceDiff = decision.qualityPrice - decision.cheapPrice;
    const priceRatio = decision.cheapPrice / decision.qualityPrice;
    
    // Base impact calculations (simplified for demo)
    const qualityBonus = Math.min(30, priceDiff / 10);
    const cheapPenalty = (1 - priceRatio) * 25;

    return {
      health: {
        cheap: Math.max(20, 65 - cheapPenalty),
        quality: Math.min(95, 75 + qualityBonus)
      },
      financial: {
        cheap: Math.max(30, 80 - (cheapPenalty * 0.5)), // Less immediate impact
        quality: Math.min(90, 70 + (qualityBonus * 0.7))
      },
      social: {
        cheap: Math.max(25, 60 - cheapPenalty),
        quality: Math.min(90, 70 + qualityBonus)
      },
      career: {
        cheap: Math.max(30, 65 - (cheapPenalty * 0.8)),
        quality: Math.min(95, 75 + (qualityBonus * 1.2))
      },
      wellbeing: {
        cheap: Math.max(15, 55 - cheapPenalty),
        quality: Math.min(95, 80 + qualityBonus)
      },
      productivity: {
        cheap: Math.max(25, 60 - (cheapPenalty * 1.1)),
        quality: Math.min(95, 80 + (qualityBonus * 1.1))
      }
    };
  };

  const generateAIInsight = (decision: PurchaseDecision, data: LifeImpactData): string => {
    const avgCheap = Object.values(data).reduce((acc, cat) => acc + cat.cheap, 0) / 6;
    const avgQuality = Object.values(data).reduce((acc, cat) => acc + cat.quality, 0) / 6;
    const difference = avgQuality - avgCheap;

    if (difference > 25) {
      return `Investing in a quality ${decision.itemName} could significantly transform your future. The analysis shows a ${Math.round(difference)}% improvement across life areas, particularly in productivity and wellbeing. This choice compounds into better opportunities and reduced stress over time.`;
    } else if (difference > 15) {
      return `A quality ${decision.itemName} offers moderate but meaningful improvements. While the budget option meets basic needs, the premium choice enhances your daily experience and creates positive momentum in ${data.career.quality > data.career.cheap + 20 ? 'career' : 'health'} areas.`;
    } else {
      return `For this ${decision.itemName}, both options lead to similar outcomes. The budget choice maximizes value without significantly impacting your future trajectory. Consider allocating savings toward higher-impact purchases.`;
    }
  };

  const handleDecisionSubmit = async (decision: PurchaseDecision) => {
    setIsLoading(true);
    setCurrentDecision(decision);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const impactData = calculateLifeImpact(decision);
      const insight = generateAIInsight(decision, impactData);

      setLifeImpactData(impactData);
      setAiInsight(insight);
      setCurrentScenario('comparison');

      toast({
        title: "Future Analysis Complete",
        description: "Your quantum decision analysis is ready for exploration.",
      });
    } catch (error) {
      toast({
        title: "Analysis Error",
        description: "Failed to generate future analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentDecision(null);
    setLifeImpactData(null);
    setCurrentScenario('comparison');
    setAiInsight('');
  };

  const getEmotionalState = () => {
    if (!lifeImpactData) return 'neutral';
    
    const scenario = currentScenario === 'comparison' ? 'quality' : currentScenario;
    const avgImpact = Object.values(lifeImpactData).reduce((acc, cat) => 
      acc + cat[scenario], 0) / 6;
    
    if (avgImpact > 75) return 'happy';
    if (avgImpact < 50) return 'regret';
    return 'neutral';
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 rounded-2xl bg-quantum-primary/20 quantum-glow">
              <Brain className="w-8 h-8 text-quantum-primary" />
            </div>
            <h1 className="quantum-title">QuantumShop</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualize your future self through the lens of purchasing decisions. 
            Discover how today's choices shape tomorrow's reality.
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-quantum-primary" />
              <span>78% Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-quantum-primary" />
              <span>&lt;2s Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-quantum-primary" />
              <span>50K+ Decisions</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            <PurchaseDecisionInput
              onDecisionSubmit={handleDecisionSubmit}
              onReset={handleReset}
              isLoading={isLoading}
            />

            {currentDecision && (
              <Card className="quantum-card p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-quantum-primary" />
                  <h3 className="quantum-subtitle">Current Analysis</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Item: </span>
                    <span className="font-medium">{currentDecision.itemName}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Budget: </span>
                    <span className="font-medium">${currentDecision.cheapPrice}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Quality: </span>
                    <span className="font-medium">${currentDecision.qualityPrice}</span>
                  </div>
                </div>

                {lifeImpactData && (
                  <div className="flex space-x-2">
                    <Button
                      variant={currentScenario === 'cheap' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentScenario('cheap')}
                      className="flex-1"
                    >
                      Budget Path
                    </Button>
                    <Button
                      variant={currentScenario === 'comparison' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentScenario('comparison')}
                      className="px-3"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={currentScenario === 'quality' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentScenario('quality')}
                      className="flex-1"
                    >
                      Quality Path
                    </Button>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Center Panel - 3D Visualization */}
          <div className="space-y-6">
            <Card className="quantum-card p-6">
              <div className="aspect-square">
                <FutureSelfVisualizer
                  scenario={currentScenario}
                  isActive={!!currentDecision}
                  emotionalState={getEmotionalState()}
                />
              </div>
            </Card>

            {aiInsight && (
              <Card className="quantum-card p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-quantum-primary/20">
                    <Brain className="w-4 h-4 text-quantum-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">AI Quantum Insight</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{aiInsight}</p>
              </Card>
            )}
          </div>

          {/* Right Panel - Life Impact */}
          <div>
            <LifeImpactDashboard
              data={lifeImpactData}
              activeScenario={currentScenario}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground border-t pt-8">
          <p>
            QuantumShop • Future Self Dashboard • Powered by AI-driven decision analysis
          </p>
          <p className="mt-2">
            This demo uses simulated quantum decision algorithms. Real implementation would integrate ML models and external APIs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
