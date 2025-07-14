/**
 * QuantumShop MongoDB Schemas
 * Conceptual database design for storing users and purchase predictions
 */

const mongoose = require('mongoose');

// User Collection Schema
const UserSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },

  // User Profile Data for AI Analysis
  profile_data: {
    age: {
      type: Number,
      min: 13,
      max: 120
    },
    
    current_income: {
      type: Number,
      min: 0,
      default: 50000
    },
    
    health_status: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor'],
      default: 'good'
    },
    
    location: {
      country: String,
      state: String,
      city: String,
      zip_code: String
    },
    
    lifestyle_preferences: [{
      type: String,
      enum: ['minimalist', 'luxury', 'sustainable', 'tech-savvy', 'health-focused', 'budget-conscious']
    }],
    
    personality_traits: {
      risk_tolerance: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
      },
      decision_style: {
        type: String,
        enum: ['analytical', 'intuitive', 'collaborative', 'decisive'],
        default: 'analytical'
      },
      values: [{
        type: String,
        enum: ['quality', 'value', 'sustainability', 'innovation', 'status', 'practicality']
      }]
    },
    
    purchase_history: [{
      item: String,
      price: Number,
      category: String,
      date: Date,
      satisfaction_rating: {
        type: Number,
        min: 1,
        max: 10
      },
      regret_level: {
        type: Number,
        min: 1,
        max: 10
      },
      usage_frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'rarely', 'never']
      }
    }],
    
    // Financial Context
    financial_profile: {
      monthly_disposable_income: Number,
      savings_rate: Number,
      debt_to_income_ratio: Number,
      financial_goals: [String],
      risk_appetite: {
        type: String,
        enum: ['conservative', 'moderate', 'aggressive']
      }
    },
    
    // Career Information
    career_info: {
      industry: String,
      position_level: {
        type: String,
        enum: ['entry', 'mid', 'senior', 'executive', 'entrepreneur']
      },
      career_stage: {
        type: String,
        enum: ['starting', 'growing', 'established', 'transitioning', 'retiring']
      },
      professional_image_importance: {
        type: Number,
        min: 1,
        max: 10
      }
    }
  },

  // AI Learning Data
  ml_preferences: {
    prediction_accuracy_feedback: [{
      prediction_id: mongoose.Schema.Types.ObjectId,
      actual_outcome: Number,
      feedback_date: Date
    }],
    
    decision_patterns: {
      typical_research_time: String, // e.g., "thorough", "quick", "minimal"
      price_sensitivity: Number, // 1-10 scale
      brand_loyalty: Number, // 1-10 scale
      early_adopter_tendency: Number // 1-10 scale
    }
  },

  // Account Management
  created_at: {
    type: Date,
    default: Date.now
  },
  
  updated_at: {
    type: Date,
    default: Date.now
  },
  
  last_login: Date,
  
  account_status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  
  subscription_tier: {
    type: String,
    enum: ['free', 'premium', 'enterprise'],
    default: 'free'
  }
});

// Purchase Predictions Collection Schema
const PurchasePredictionSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  
  // Reference to user
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous predictions
  },
  
  // Purchase Decision Input
  itemName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 200
  },
  
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'furniture', 'clothing', 'fitness', 'appliances', 'automotive', 'home', 'personal', 'other']
  },
  
  // Price Options
  cheapChoice: {
    price: {
      type: Number,
      required: true,
      min: 0
    },
    
    product_details: {
      brand: String,
      model: String,
      features: [String],
      quality_indicators: {
        build_quality: Number, // 1-10
        durability_rating: Number, // 1-10
        user_reviews_avg: Number // 1-5
      }
    },
    
    predicted_outcomes: {
      health_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      financial_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      social_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      career_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      wellbeing_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      productivity_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      satisfaction_score: {
        type: Number,
        min: 0,
        max: 100
      },
      regret_probability: {
        type: Number,
        min: 0,
        max: 100
      },
      longevity_years: Number,
      maintenance_cost_annual: Number
    }
  },
  
  qualityChoice: {
    price: {
      type: Number,
      required: true,
      min: 0
    },
    
    product_details: {
      brand: String,
      model: String,
      features: [String],
      quality_indicators: {
        build_quality: Number, // 1-10
        durability_rating: Number, // 1-10
        user_reviews_avg: Number // 1-5
      }
    },
    
    predicted_outcomes: {
      health_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      financial_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      social_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      career_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      wellbeing_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      productivity_impact: {
        type: Number,
        min: 0,
        max: 100
      },
      satisfaction_score: {
        type: Number,
        min: 0,
        max: 100
      },
      regret_probability: {
        type: Number,
        min: 0,
        max: 100
      },
      longevity_years: Number,
      maintenance_cost_annual: Number
    }
  },

  // AI Analysis Results
  quantum_analysis: {
    confidence_score: {
      type: Number,
      min: 0,
      max: 1,
      required: true
    },
    
    model_versions: {
      health_model: String,
      financial_model: String,
      social_model: String,
      career_model: String,
      wellbeing_model: String,
      productivity_model: String
    },
    
    uncertainty_factors: [{
      factor: String,
      impact_level: {
        type: String,
        enum: ['low', 'medium', 'high']
      }
    }],
    
    data_quality_score: {
      type: Number,
      min: 0,
      max: 1
    }
  },
  
  // Generated Insights
  ai_insight: {
    type: String,
    required: true,
    maxLength: 1000
  },
  
  key_differentiators: [{
    category: String,
    cheap_outcome: String,
    quality_outcome: String,
    significance: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    }
  }],
  
  // Recommendation
  recommendation: {
    suggested_choice: {
      type: String,
      enum: ['cheap', 'quality', 'neither'],
      required: true
    },
    
    confidence_level: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    
    reasoning: String,
    
    alternative_suggestions: [String]
  },

  // User Interaction Data
  user_feedback: {
    accuracy_rating: {
      type: Number,
      min: 1,
      max: 10
    },
    
    helpful_rating: {
      type: Number,
      min: 1,
      max: 10
    },
    
    comments: {
      type: String,
      maxLength: 500
    },
    
    actual_choice_made: {
      type: String,
      enum: ['cheap', 'quality', 'neither', 'different_option']
    },
    
    feedback_date: Date
  },
  
  // Follow-up Data (for learning)
  followup_data: {
    satisfaction_after_1_month: Number,
    satisfaction_after_6_months: Number,
    satisfaction_after_1_year: Number,
    actual_regret_level: Number,
    would_choose_differently: Boolean,
    lessons_learned: String
  },

  // Metadata
  timestamp: {
    type: Date,
    default: Date.now
  },
  
  processing_time_ms: Number,
  
  session_id: String,
  
  ip_address: String,
  
  user_agent: String,
  
  // External Data Sources Used
  external_data_sources: [{
    source: String, // e.g., "walmart_api", "review_aggregator"
    data_timestamp: Date,
    reliability_score: Number
  }]
});

// Quantum Insights Collection (for aggregated learning)
const QuantumInsightSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  
  // Pattern Recognition
  pattern_type: {
    type: String,
    enum: ['category_trend', 'price_point_analysis', 'user_segment_behavior', 'temporal_pattern']
  },
  
  category: String,
  
  price_range: {
    min: Number,
    max: Number
  },
  
  user_segment: {
    age_range: String,
    income_range: String,
    lifestyle: String
  },
  
  // Discovered Insights
  key_finding: String,
  
  statistical_significance: Number,
  
  sample_size: Number,
  
  confidence_interval: {
    lower: Number,
    upper: Number
  },
  
  // Business Intelligence
  business_impact: {
    revenue_potential: String,
    market_opportunity: String,
    user_satisfaction_impact: Number
  },
  
  created_at: {
    type: Date,
    default: Date.now
  },
  
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Create Models
const User = mongoose.model('User', UserSchema);
const PurchasePrediction = mongoose.model('PurchasePrediction', PurchasePredictionSchema);
const QuantumInsight = mongoose.model('QuantumInsight', QuantumInsightSchema);

// Indexes for Performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ 'profile_data.age': 1, 'profile_data.current_income': 1 });
UserSchema.index({ created_at: -1 });

PurchasePredictionSchema.index({ userId: 1, timestamp: -1 });
PurchasePredictionSchema.index({ category: 1, timestamp: -1 });
PurchasePredictionSchema.index({ 'quantum_analysis.confidence_score': -1 });
PurchasePredictionSchema.index({ timestamp: -1 });

QuantumInsightSchema.index({ pattern_type: 1, category: 1 });
QuantumInsightSchema.index({ created_at: -1 });

// Example CRUD Operations
const ExampleOperations = {
  
  // Create a new user
  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  },
  
  // Store a new prediction
  async storePrediction(predictionData) {
    const prediction = new PurchasePrediction(predictionData);
    return await prediction.save();
  },
  
  // Get user's prediction history
  async getUserPredictions(userId, limit = 50) {
    return await PurchasePrediction.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .populate('userId', 'name email');
  },
  
  // Get predictions by category for analysis
  async getPredictionsByCategory(category, timeframe = '30d') {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(timeframe));
    
    return await PurchasePrediction.find({
      category: category,
      timestamp: { $gte: startDate }
    }).sort({ timestamp: -1 });
  },
  
  // Update user feedback
  async updateFeedback(predictionId, feedback) {
    return await PurchasePrediction.findByIdAndUpdate(
      predictionId,
      { user_feedback: feedback },
      { new: true }
    );
  },
  
  // Aggregate insights for ML training
  async getInsightsForTraining(category, minConfidence = 0.7) {
    return await PurchasePrediction.aggregate([
      {
        $match: {
          category: category,
          'quantum_analysis.confidence_score': { $gte: minConfidence },
          'user_feedback.accuracy_rating': { $exists: true }
        }
      },
      {
        $group: {
          _id: '$category',
          avgAccuracy: { $avg: '$user_feedback.accuracy_rating' },
          totalPredictions: { $sum: 1 },
          avgConfidence: { $avg: '$quantum_analysis.confidence_score' }
        }
      }
    ]);
  }
};

module.exports = {
  User,
  PurchasePrediction,
  QuantumInsight,
  ExampleOperations
};