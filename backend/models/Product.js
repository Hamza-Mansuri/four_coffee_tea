const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  originalPrice: {
    type: Number
  },
  stockStatus: {
    type: String,
    default: 'In stock'
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    required: true
  },
  keywords: {
    type: String
  },
  ingredients: {
    type: String
  },
  // Additional flexible data based on product type
  healthBenefitsData: [{
    title: String,
    desc: String
  }],
  directionsData: [{
    title: String,
    desc: String
  }],
  nutritionTable: [{
    name: String,
    per100: String,
    perServing: String,
    rda: String
  }],
  keyBenefits: [{
    type: String
  }],
  claims: {
    nutritional: [String],
    functional: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
