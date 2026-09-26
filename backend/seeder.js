require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');

// Import the hardcoded data from frontend
const productsData = [
  {
    id: "mocha",
    title: "Mocha Feast",
    subtitle: "Premium Mocha Protein Blend",
    description: "Start your day with the rich, indulgent taste of Mocha Feast. A perfect blend of real coffee and cocoa, packed with premium protein and no added sugar.",
    price: 1200,
    originalPrice: 1500,
    stockStatus: "In stock",
    images: ["/assets/images/mocha_feast.webp"],
    category: "drinks",
    keywords: "coffee chocolate cocoa caffeine drink energy beverage",
    ingredients: "Skimmed Milk Powder, Whey Protein Concentrate, Cocoa Powder, Instant Coffee Powder, Digestive Enzymes, Natural Sweeteners.",
    keyBenefits: ["Rich Mocha Flavour", "Zero Added Sugar", "High Dairy Protein", "Smooth & Creamy Texture", "Real Coffee & Cocoa"],
    claims: {
      nutritional: ["No Added Sugar", "Low Fat", "Low Calorie", "Source of Quality Protein"],
      functional: ["Instant Energy", "Digestive Health", "Sustained Focus"]
    },
    healthBenefitsData: [
      { title: "Sustained Energy", desc: "Provides a steady release of energy without the crash." },
      { title: "Muscle Recovery", desc: "Packed with quality protein to support muscle repair." }
    ],
    directionsData: [
      { title: "Hot Mocha", desc: "Add one serving (14g) into a mug. Pour 120-150ml of hot water and stir." },
      { title: "Iced Mocha", desc: "Dissolve one serving in 50ml normal water, then pour over 100ml cold water and ice." }
    ]
  },
  {
    id: "tea",
    title: "Chai Feast",
    subtitle: "Instant Spiced Milk Tea",
    description: "Experience the authentic taste of Indian masala chai with Chai Feast. A perfectly balanced blend of premium tea extracts and traditional spices.",
    price: 950,
    originalPrice: 1200,
    stockStatus: "In stock",
    images: ["/assets/images/tea_feast.webp"],
    category: "drinks",
    keywords: "tea chai masala milk sweet immunity spices ginger cardamom beverage",
    ingredients: "Skimmed Milk Powder, Black Tea Extract, Cardamom, Ginger, Cinnamon, Natural Sweeteners.",
    keyBenefits: ["Authentic Masala Taste", "Zero Added Sugar", "Immunity Boosting Spices", "Rich Aroma", "Quick & Easy"],
    claims: {
      nutritional: ["No Added Sugar", "Low Calorie", "Rich in Antioxidants"],
      functional: ["Immunity Support", "Digestive Aid", "Stress Relief"]
    },
    healthBenefitsData: [
      { title: "Immunity Boost", desc: "Natural spices like ginger and cardamom support a healthy immune system." },
      { title: "Stress Relief", desc: "The soothing aroma and warm spices help relax the mind and body." }
    ],
    directionsData: [
      { title: "Hot Chai", desc: "Add one serving (12g) into a mug. Pour 100-120ml of hot water and stir well." },
      { title: "Iced Chai", desc: "Dissolve one serving in 40ml warm water, add cold milk/water and ice cubes." }
    ]
  },
  {
    id: "atta",
    title: "Atta Feast",
    subtitle: "Premium Functional Flour",
    description: "A revolutionary daily flour blend engineered for peak wellness. Atta Feast brings superior nutrition to your everyday meals.",
    price: 450,
    originalPrice: 600,
    stockStatus: "In stock",
    images: ["/assets/images/atta_feast.webp"],
    category: "food",
    keywords: "flour wheat roti chapati daily nutrition baking bread",
    ingredients: "Whole Wheat Flour, Multi-grain Blend, Added Vitamins and Minerals.",
    keyBenefits: ["High Fiber", "Low GI", "Rich in Protein", "Soft Roti Guarantee", "Nutrient Dense"],
    claims: {
      nutritional: ["High in Dietary Fiber", "Source of Protein", "Fortified with Iron"],
      functional: ["Digestive Wellness", "Sustained Energy", "Heart Health"]
    },
    healthBenefitsData: [
      { title: "Digestive Health", desc: "High fiber content supports a healthy gut and regular digestion." },
      { title: "Energy Balance", desc: "Low Glycemic Index ensures steady energy release throughout the day." }
    ],
    directionsData: [
      { title: "Daily Use", desc: "Use just like regular flour for soft, nutritious rotis, parathas, or bread." }
    ]
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log('Existing products removed.');
    
    await Product.insertMany(productsData);
    console.log('Products seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
