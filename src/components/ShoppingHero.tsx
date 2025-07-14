import React from 'react';
import { ShoppingBag, Search, Heart, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ShoppingHero: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Apple-style Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/70 border-b border-gray-200/50">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-gray-900">QuantumShop</h1>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Products</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Categories</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Deals</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Future Vision</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Search products..." 
              className="w-64 pl-10 bg-white/80 border-gray-200"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-apple-fade-in">
          <h2 className="hero-title mb-6">
            See Your Future Self
            <br />
            <span className="text-blue-500">Before You Buy</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-powered shopping intelligence that shows you how every purchase shapes your tomorrow. 
            Make decisions that build the life you want.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="shop-button">
              Start Future Vision
            </Button>
            <Button variant="outline" className="px-8 py-4 rounded-full">
              See How It Works
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="apple-card p-8 text-center animate-apple-scale-in">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Product Analysis</h3>
            <p className="text-gray-600">
              Our AI analyzes quality, durability, and long-term value to predict how each purchase affects your future.
            </p>
          </div>

          <div className="apple-card p-8 text-center animate-apple-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Future Self Visualization</h3>
            <p className="text-gray-600">
              See two paths: your future self with cheap vs. quality purchases. Watch how choices compound over time.
            </p>
          </div>

          <div className="apple-card p-8 text-center animate-apple-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Life Impact Modeling</h3>
            <p className="text-gray-600">
              Track how purchases influence your health, finances, relationships, and career trajectory.
            </p>
          </div>
        </div>

        {/* Quick Action */}
        <div className="mt-20 text-center">
          <div className="apple-glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Try It Now</h3>
            <p className="text-gray-600 mb-6">
              Enter any product you're considering and see your future selves side by side.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input 
                placeholder="e.g., office chair, laptop, running shoes..." 
                className="flex-1"
              />
              <Button className="apple-button">
                Visualize Future
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingHero;