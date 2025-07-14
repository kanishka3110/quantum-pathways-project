import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  futureImpact: 'positive' | 'neutral' | 'negative';
  description: string;
}

const ProductGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const products: Product[] = [
    {
      id: 1,
      name: "Premium Ergonomic Office Chair",
      price: 599,
      originalPrice: 799,
      rating: 4.8,
      reviews: 2847,
      image: "https://m.media-amazon.com/images/I/61EUUoaKNPL._UF894,1000_QL80_.jpg",
      category: "furniture",
      futureImpact: "positive",
      description: "Professional-grade chair with lumbar support"
    },
    {
      id: 2,
      name: "Budget Office Chair",
      price: 89,
      rating: 3.2,
      reviews: 156,
      image: "https://cdn.shopify.com/s/files/1/0044/1208/0217/files/LSORENCSHMBCHRBLK_900x.jpg?v=1734688979",
      category: "furniture",
      futureImpact: "negative",
      description: "Basic office seating solution"
    },
    {
      id: 3,
      name: "High-Quality Running Shoes",
      price: 180,
      rating: 4.9,
      reviews: 5234,
      image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1741716872-puma-foreverrun-nitro-2-67d07d7915584.jpg?crop=1.00xw:0.668xh;0,0.149xh&resize=980:*",
      category: "sports",
      futureImpact: "positive",
      description: "Professional athletic footwear with advanced cushioning"
    },
    {
      id: 4,
      name: "Cheap Running Shoes",
      price: 35,
      rating: 2.8,
      reviews: 89,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0uqu6lyoTWIRrU_8IKxsbSt1jCKXsLwRUGQ&s",
      category: "sports",
      futureImpact: "negative",
      description: "Basic athletic shoes for casual use"
    },
    {
      id: 5,
      name: "Professional Laptop",
      price: 1299,
      rating: 4.7,
      reviews: 3456,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.itclearance.com.au%2Fproduct%2Fhp-14s-fq0601au-amd-athlon-silver-3050u-laptop-35-6-cm-14-hd-16-gb-ddr4-sdram-512-gb-ssd-wi-fi-5-802-11ac-windows-11-home-silver%2F&psig=AOvVaw3-qnarC6QfRK9izMlyuCrL&ust=1752594995209000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICfqaPbvI4DFQAAAAAdAAAAABAj",
      category: "electronics",
      futureImpact: "positive",
      description: "High-performance laptop for professionals"
    },
    {
      id: 6,
      name: "Budget Laptop",
      price: 299,
      rating: 3.5,
      reviews: 234,
      image: "https://www.livemint.com/lm-img/img/2024/04/05/600x338/laptoopp_1712313862514_1712313872393.PNG",
      category: "electronics",
      futureImpact: "neutral",
      description: "Basic laptop for everyday tasks"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'sports', name: 'Sports & Fitness' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const getFutureImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFutureImpactText = (impact: string) => {
    switch (impact) {
      case 'positive': return 'Future+';
      case 'negative': return 'Future-';
      default: return 'Neutral';
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Category Filter */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Compare Your Future Paths
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-card group cursor-pointer"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100 h-64">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Product Image</span>
              </div>
              
              {/* Future Impact Badge */}
              <Badge 
                className={`absolute top-3 left-3 ${getFutureImpactColor(product.futureImpact)}`}
              >
                {getFutureImpactText(product.futureImpact)}
              </Badge>
              
              {/* Discount Badge */}
              {product.originalPrice && (
                <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}

              {/* Action Buttons */}
              <div className="absolute bottom-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <h3 className="product-title line-clamp-2">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews.toLocaleString()})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="product-price">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-sm">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 apple-button">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="rounded-lg">
                  See Future Impact
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Future Vision CTA */}
      <div className="mt-20 text-center">
        <div className="apple-glass rounded-3xl p-12 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-6">
            Not sure which path to choose?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Use our Future Vision AI to see how each purchase affects your life 5 years from now.
          </p>
          <Button className="shop-button text-lg px-12 py-4">
            Launch Future Vision
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
