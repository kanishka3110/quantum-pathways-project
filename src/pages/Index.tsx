import { Toaster } from "@/components/ui/sonner";
import FutureSelfVisualizer from "@/components/FutureSelfVisualizer";
import { PurchaseDecisionInput } from "@/components/PurchaseDecisionInput";
import { LifeImpactDashboard } from "@/components/LifeImpactDashboard";
import ShoppingHero from "@/components/ShoppingHero";
import ProductGrid from "@/components/ProductGrid";
import { useState } from "react";

const Index = () => {
  const [currentScenario, setCurrentScenario] = useState<'cheap' | 'quality' | null>(null);
  const [impactData, setImpactData] = useState({
    health: 0,
    finance: 0,
    happiness: 0,
    career: 0,
    relationships: 0
  });
  const [showFutureVision, setShowFutureVision] = useState(false);

  const handleDecisionMade = (decision: any) => {
    setCurrentScenario('quality');
    setImpactData({
      health: 15,
      finance: 10,
      happiness: 20,
      career: 15,
      relationships: 10
    });
    setShowFutureVision(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Shopping Hero Section */}
      <ShoppingHero />
      
      {/* Product Grid */}
      <ProductGrid />
      
      {/* Future Vision Section */}
      {showFutureVision && (
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="apple-title mb-6">
              Your Future Self Revealed
            </h2>
            <p className="apple-subtitle max-w-3xl mx-auto">
              See how your purchasing decisions create ripple effects across your entire life. 
              Compare both paths and choose wisely.
            </p>
          </div>

          {/* Main Visualization Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Purchase Input */}
            <PurchaseDecisionInput 
              onDecisionSubmit={handleDecisionMade}
              onReset={() => setShowFutureVision(false)}
              isLoading={false}
            />
            
            {/* 3D Visualization */}
            <FutureSelfVisualizer 
              scenario={currentScenario}
              impact={{
                health: impactData.health,
                finance: impactData.finance,
                happiness: impactData.happiness
              }}
            />
          </div>

          {/* Life Impact Dashboard */}
          <LifeImpactDashboard 
            data={null}
            activeScenario="comparison"
          />
        </div>
      )}
      
      <Toaster />
    </div>
  );
};

export default Index;