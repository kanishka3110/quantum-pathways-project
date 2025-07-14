import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Brain,
  Shield
} from 'lucide-react';

interface LifeImpactData {
  health: { cheap: number; quality: number };
  financial: { cheap: number; quality: number };
  social: { cheap: number; quality: number };
  career: { cheap: number; quality: number };
  wellbeing: { cheap: number; quality: number };
  productivity: { cheap: number; quality: number };
}

interface LifeImpactDashboardProps {
  data: LifeImpactData | null;
  activeScenario: 'cheap' | 'quality' | 'comparison';
}

const impactCategories = [
  {
    key: 'health' as keyof LifeImpactData,
    label: 'Health Impact',
    icon: Heart,
    description: 'Physical and mental wellbeing',
    color: 'text-pink-400'
  },
  {
    key: 'financial' as keyof LifeImpactData,
    label: 'Financial Health',
    icon: DollarSign,
    description: 'Long-term financial stability',
    color: 'text-green-400'
  },
  {
    key: 'social' as keyof LifeImpactData,
    label: 'Social Influence',
    icon: Users,
    description: 'Relationships and social status',
    color: 'text-blue-400'
  },
  {
    key: 'career' as keyof LifeImpactData,
    label: 'Career Growth',
    icon: TrendingUp,
    description: 'Professional development',
    color: 'text-purple-400'
  },
  {
    key: 'wellbeing' as keyof LifeImpactData,
    label: 'Mental Wellbeing',
    icon: Brain,
    description: 'Stress levels and satisfaction',
    color: 'text-indigo-400'
  },
  {
    key: 'productivity' as keyof LifeImpactData,
    label: 'Productivity',
    icon: Shield,
    description: 'Efficiency and performance',
    color: 'text-yellow-400'
  }
];

export const LifeImpactDashboard = ({ data, activeScenario }: LifeImpactDashboardProps) => {
  if (!data) {
    return (
      <Card className="quantum-card p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-quantum-primary/20 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-quantum-primary" />
          </div>
          <div>
            <h3 className="quantum-subtitle">Life Impact Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Submit a purchase decision to see predicted life impacts
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const getScenarioValue = (category: LifeImpactData[keyof LifeImpactData]) => {
    if (activeScenario === 'cheap') return category.cheap;
    if (activeScenario === 'quality') return category.quality;
    return (category.cheap + category.quality) / 2; // Average for comparison
  };

  const getScenarioColor = (category: LifeImpactData[keyof LifeImpactData]) => {
    const cheapValue = category.cheap;
    const qualityValue = category.quality;
    
    if (activeScenario === 'cheap') {
      return cheapValue < 50 ? 'text-emotion-regret' : 
             cheapValue < 75 ? 'text-emotion-neutral' : 'text-emotion-happy';
    }
    
    if (activeScenario === 'quality') {
      return qualityValue < 50 ? 'text-emotion-regret' : 
             qualityValue < 75 ? 'text-emotion-neutral' : 'text-emotion-happy';
    }
    
    // Comparison mode - show the difference
    const diff = qualityValue - cheapValue;
    return diff > 20 ? 'text-emotion-happy' : 
           diff > 0 ? 'text-emotion-neutral' : 'text-emotion-regret';
  };

  return (
    <Card className="quantum-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="quantum-subtitle">Life Impact Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Predicted 5-year trajectory analysis
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-quantum-primary">
            {activeScenario === 'cheap' ? 'Budget Path' :
             activeScenario === 'quality' ? 'Quality Path' : 'Comparison'}
          </div>
          <div className="text-xs text-muted-foreground">
            78% accuracy
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {impactCategories.map((category) => {
          const categoryData = data[category.key];
          const value = getScenarioValue(categoryData);
          const colorClass = getScenarioColor(categoryData);
          const Icon = category.icon;

          return (
            <div key={category.key} className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-muted/50 ${category.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {category.label}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {category.description}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Impact</span>
                  <span className={`text-sm font-medium ${colorClass}`}>
                    {Math.round(value)}%
                  </span>
                </div>
                <Progress 
                  value={value} 
                  className="h-2"
                />
                
                {activeScenario === 'comparison' && (
                  <div className="flex justify-between text-xs">
                    <span className="text-emotion-regret">
                      Budget: {categoryData.cheap}%
                    </span>
                    <span className="text-emotion-happy">
                      Quality: {categoryData.quality}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {activeScenario === 'comparison' && (
        <div className="border-t pt-4">
          <div className="text-center space-y-2">
            <div className="text-sm font-medium">Overall Quality Advantage</div>
            <div className="text-2xl font-bold text-quantum-primary">
              +{Math.round(
                Object.values(data).reduce((acc, category) => 
                  acc + (category.quality - category.cheap), 0
                ) / Object.keys(data).length
              )}%
            </div>
            <div className="text-xs text-muted-foreground">
              Average improvement across all life areas
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};