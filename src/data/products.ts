export const productsData = {
  atta: {
    id: 'atta',
    title: 'Atta Feast',
    subtitle: 'Premium wholesome daily flour blend for balanced nutrition and sustained energy.',
    price: '₹450',
    originalPrice: '₹600',
    stockStatus: 'In stock',
    images: [
      '/assets/images/atta-480.webp',
      '/assets/images/atta_feast.webp',
      '/assets/images/atta-p2.webp'
    ],
    healthBenefits: 'Atta Feast - Premium wholesome daily flour blend designed for balanced nutrition, sustained energy, and digestive health. Perfect for daily consumption by fitness enthusiasts and families alike.',
    description: 'Whole wheat flour, multigrain blend (soy, oats, chickpeas), fortified vitamins and minerals. No added preservatives.',
    directions: 'Step 1: Use as regular flour for making rotis, parathas, or baking. Step 2: Knead with warm water for best results.',
    storage: 'Store in a cool, dry place. Keep tightly closed in an airtight container. Protect from direct sunlight and moisture.',
    nutrition: {
      Energy: '340 kcal',
      Protein: '12g',
      Carbohydrates: '70g',
      Fat: '2g',
      Fiber: '10g',
      'Vitamin C': '0mg',
      Iron: '4mg',
      Resveratrol: '0mg'
    },
    perfectForImage: '/assets/images/atta-p1.webp',
    perfectForItems: [
      { title: 'Breakfast', desc: 'Start your day right with rotis or parathas for sustained energy.' },
      { title: 'Lunch', desc: 'Provides a hearty, wholesome meal packed with fiber.' },
      { title: 'Weight Management', desc: 'High fiber content keeps you full longer, helping you avoid snacking.' },
      { title: 'Gaming Sessions', desc: 'Steady energy release to keep you focused.' },
      { title: 'Intense Work Periods', desc: 'Nutrient-rich to support cognitive function during long hours.' },
      { title: 'Pre/Post Workout', desc: 'Complex carbs fuel your workouts and aid recovery.' }
    ],
    testimonials: [
      { name: 'Sanjay M.', review: 'Since switching to Atta Feast, my digestion has improved immensely. The rotis come out soft and perfect!', dp: 'https://i.pravatar.cc/150?img=11' },
      { name: 'Kavita R.', review: 'A true game changer for our family. Knowing that every paratha is packed with extra nutrients gives me peace of mind.', dp: 'https://i.pravatar.cc/150?img=5' },
      { name: 'Anil P.', review: 'Great taste and energy that lasts all day. Highly recommended for anyone wanting a wholesome staple.', dp: 'https://i.pravatar.cc/150?img=8' }
    ],
    faqImage: '/assets/images/attap3.webp',
    faqs: [
      { question: 'Is Atta Feast suitable for diabetics?', answer: 'Yes, its high fiber content and complex carbs ensure a slow release of energy.' },
      { question: 'Does it taste different from regular atta?', answer: 'It retains the authentic taste of traditional whole wheat but with a slightly nuttier profile due to the multigrain blend.' },
      { question: 'Can I use it for baking?', answer: 'Absolutely! Atta Feast works perfectly for baking healthy breads and cookies.' }
    ]
  },
  mocha: {
    id: 'mocha',
    title: 'Mocha Feast',
    subtitle: 'Rich chocolate and coffee flavor packed with nutrients to fuel your workouts.',
    price: '₹1200',
    originalPrice: '₹1500',
    stockStatus: 'In stock',
    images: [
      '/assets/images/mocha-480.webp',
      '/assets/images/mocha_feast.webp',
      '/assets/images/kaapi_mug.webp'
    ],
    ingredients: 'Milk Solids, Coffee Powder, Sodium Caseinate, Nature Identical Flavouring Substance, Cocoa Powder, Acidity Regulator [INS 331 (iii), INS 500 (ii)], Thickener [INS 415, INS 412], Sweetener [INS 955].',
    description: 'This Instant Mocha Coffee Premix is a rich, velvety blend crafted to deliver café-quality iced or hot mocha in seconds. Blending bold coffee powder with a touch of cocoa powder and rich skimmed milk, it provides a perfectly balanced, bittersweet chocolate-coffee profile with a full-bodied texture. Formulated with zero added sugars, it delivers a smooth, indulgent coffee experience without compromising on your daily nutrition goals.',
    healthBenefitsData: [
      { title: 'Rich in Dairy Protein', desc: 'Supplies 4.4 g of intact dairy protein per serving from skimmed milk powder and sodium caseinate to support daily nutrition.' },
      { title: 'Zero Added Sugar', desc: 'Sweetened exclusively with non-caloric sucralose, making it suitable for low-sugar and calorie-conscious diets.' },
      { title: 'Natural Coffee Boost', desc: 'Delivers an authentic caffeine lift from real coffee powder to enhance focus and physical energy.' }
    ],
    directionsData: [
      { title: 'Hot Mocha Coffee', desc: 'Add one serving (14 g) into a mug. Pour 120–150 ml of hot water (80°C–85°C) and stir well until completely dissolved.' },
      { title: 'Iced Mocha Coffee', desc: 'Dissolve one serving (14 g) in 50 ml of normal water, mix until smooth, then pour over 100 ml of cold water and ice cubes.' }
    ],
    storage: 'Store in a cool, dry place away from direct sunlight, ambient heat, and moisture. Ensure the pouch or container is tightly sealed after each use to prevent clumping of the milk and coffee powders.',
    nutritionInfo: {
      servingSize: '14 g',
      recommendedUse: '1–2 servings per day. Each 14 g serving provides a balanced combination of premium dairy protein, authentic coffee, and smooth cocoa at just 45 calories.'
    },
    nutritionTable: [
      { name: 'Energy (kcal)', per100: '323.6', perServing: '45.3', rda: '2.30%' },
      { name: 'Protein (g)', per100: '31.4', perServing: '4.4', rda: '8.10%' },
      { name: 'Total Carbohydrates (g)', per100: '44.3', perServing: '6.2', rda: '**' },
      { name: 'Total Sugars (g)', per100: '37.1', perServing: '5.2', rda: '**' },
      { name: 'Added Sugars (g)', per100: '0', perServing: '0', rda: '0.00%' },
      { name: 'Dietary Fiber (g)', per100: '1.4', perServing: '0.2', rda: '**' },
      { name: 'Total Fat (g)', per100: '1', perServing: '0.14', rda: '0.21%' },
      { name: 'Sodium (mg)', per100: '838', perServing: '117.3', rda: '5.90%' }
    ],
    keyBenefits: [
      'Rich Mocha Flavour',
      'Zero Added Sugar',
      'High Dairy Protein',
      'Smooth & Creamy Texture',
      'Real Coffee & Cocoa'
    ],
    perfectForImage: '/assets/images/cp3.webp',
    perfectForItems: [
      { title: 'Morning Energy', desc: 'A quick, protein-backed mocha cup to start your day with focus and stamina.' },
      { title: 'Afternoon Slump', desc: 'Provides a smooth caffeine lift paired with cocoa to beat mid-day fatigue.' },
      { title: 'Fitness & Calorie-Conscious Lifestyles', desc: 'Offers a guilt-free alternative to sugar-laden coffee house beverages.' }
    ],
    claims: {
      nutritional: [
        'No Added Sugar',
        'Low Fat / Fat-Free',
        'Low Calorie (<50 kcal per serving)',
        'Source of Quality Protein'
      ],
      functional: [
        'Made with Real Coffee & Cocoa',
        'Enhanced Creaminess Profile',
        'Contains No Free Amino Acids (100% Intact Protein)',
        'Vegetarian Formulation'
      ]
    },
    testimonials: [
      { name: 'Vikram S.', review: 'Mocha Feast is exactly what I need before hitting the gym. Amazing coffee flavor with zero crash!', dp: 'https://i.pravatar.cc/150?img=12' },
      { name: 'Pooja T.', review: 'I used to struggle with protein digestion, but this blend sits perfectly and tastes like a premium cafe mocha.', dp: 'https://i.pravatar.cc/150?img=9' },
      { name: 'Rohan D.', review: 'The best tasting sports supplement I have ever used. Hits the perfect balance of chocolate and coffee.', dp: 'https://i.pravatar.cc/150?img=13' }
    ],
    faqImage: '/assets/images/cp2.webp',
    faqs: [
      { question: 'How much caffeine is in one serving?', answer: 'Each serving contains approximately 80mg of caffeine, equivalent to a standard cup of coffee.' },
      { question: 'Can I take it at night?', answer: 'Due to the caffeine content, we recommend taking it earlier in the day or as a pre-workout.' },
      { question: 'Is it safe for daily use?', answer: 'Yes, it is formulated with natural ingredients and digestive enzymes for safe, daily consumption.' }
    ]
  },
  tea: {
    id: 'tea',
    title: 'Instant Spiced Milk Tea (Masala Chai) Premix',
    subtitle: 'Authentic full-bodied taste of traditional street-style chai in seconds.',
    price: '₹950',
    originalPrice: '₹1200',
    stockStatus: 'In stock',
    images: [
      '/assets/images/tea-480.webp',
      '/assets/images/elaichi_glass.webp',
      '/assets/images/masala_kulhad.webp'
    ],
    ingredients: 'Milk Solids, Instant Tea Extract, Sodium Caseinate, Acidity Regulator [INS 331 (iii), INS 500 (ii)], Spices and Condiments (Cardamom, Ginger, Cinnamon), Stabilizer [INS 415, INS 412], Sweetener [INS 955].',
    description: 'This Instant Spiced Milk Tea (Masala Chai) Premix is a premium, convenient blend crafted to deliver the authentic, full-bodied taste of traditional street-style chai in seconds. Expertly formulated with real ground cardamom, ginger, and cinnamon alongside rich skimmed milk powder and tea extract, it offers a perfectly balanced spice profile with a creamy, comforting mouthfeel. Designed for modern lifestyle needs with zero added sugar, it lets you enjoy a smooth, aromatic cup of spiced milk tea anytime without worrying about excess calories. Simply mix with hot water for a satisfying, café-quality chai experience wherever you are.',
    healthBenefitsData: [
      { title: 'Dairy Protein', desc: 'Delivers a substantial 4.6g of intact dairy protein per serving from SMP and Sodium Caseinate, supporting daily amino acid requirements.' },
      { title: 'Antioxidant Support', desc: 'Offers the antioxidant properties of natural tea polyphenols and warming spices (Ginger, Cardamom, Cinnamon) to support digestion and metabolic health.' },
      { title: 'Zero Added Sugar', desc: 'Formulated entirely without added sugars, utilizing high-intensity sucralose to support active weight management, ketogenic transitions, and low-glycemic diets without sacrificing flavour.' }
    ],
    directionsData: [
      { title: 'Hot Spiced Milk Tea', desc: 'Empty one serving (14 g) into a mug. Add 120–150 ml of hot water and stir briskly until fully dissolved. Formulation insight: Ensure the water is hot (approx. 75°C – 85°C) but not rapidly boiling. Boiling water can thermally shock the hydrocolloid blend (causing "fish-eye" clumping of the gums) and prematurely denature the dairy proteins before the buffer system can stabilize the pH.' }
    ],
    storage: 'Store the container or individual sachets in a cool, dry environment away from strong odours and moisture. Both the Instant Tea Extract and Skimmed Milk Powder are highly hygroscopic; exposure to ambient humidity will result in rapid caking, lumping, and degradation of the natural spice volatiles. Keep hermetically sealed.',
    nutritionInfo: {
      servingSize: '14 g',
      recommendedUse: '1-3 servings per day. Each single serving delivers authentic tea extract, real aromatic spices, and a robust 4.6g of functional dairy protein. A single 14 g dose contains only 46.5 calories and 0g of added sugar, relying exclusively on the naturally occurring lactose in the milk powder.'
    },
    nutritionTable: [
      { name: 'Energy (kcal)', per100: '332', perServing: '46.5', rda: '2.30%' },
      { name: 'Protein (g)', per100: '32.8', perServing: '4.6', rda: '8.50%' },
      { name: 'Total Carbohydrates (g)', per100: '48.5', perServing: '6.8', rda: '**' },
      { name: 'Total Sugars (g)', per100: '39.3', perServing: '5.5', rda: '**' },
      { name: 'Added Sugars (g)', per100: '0', perServing: '0', rda: '0.00%' },
      { name: 'Dietary Fiber (g)', per100: '1.5', perServing: '0.2', rda: '**' },
      { name: 'Total Fat (g)', per100: '0.8', perServing: '0.1', rda: '0.15%' },
      { name: 'Sodium (mg)', per100: '883', perServing: '123.6', rda: '6.20%' }
    ],
    keyBenefits: [
      'Authentic Masala Chai Flavour',
      'Zero Added Sugar',
      'Rich in Intact Dairy Protein',
      'Creamy & Smooth Mouthfeel',
      'Contains Real Botanical Spices'
    ],
    perfectForImage: '/assets/images/tea-p.webp',
    perfectForItems: [
      { title: 'Morning Routine', desc: 'A rapid, comforting, protein-enriched start to the day without the sugar crash associated with traditional instant teas.' },
      { title: 'The Afternoon Slump', desc: 'Provides a mild caffeine lift from the instant tea extract, balanced by the digestive warmth of ginger and cardamom.' },
      { title: 'Travel & On-the-Go', desc: 'Delivers café-quality milk tea anywhere, requiring only hot water. The stabilizing gums ensure it maintains its texture even if consumed slowly.' },
      { title: 'Diabetic & Keto-Conscious Consumers', desc: 'Satisfies the sweet craving for milk tea while keeping added sugars strictly at zero.' }
    ],
    claims: {
      nutritional: [
        'No Added Sugar',
        'Low Fat',
        'Low Calorie (<50 kcal per serving)',
        'Source of High-Quality Dairy Protein'
      ],
      functional: [
        'Made with Real Spices (Cardamom, Ginger, Cinnamon)',
        'Enhanced Creaminess Profile',
        'Contains No Free Amino Acids (100% Intact Protein)',
        'Vegetarian Formulation'
      ]
    },
    testimonials: [
      { name: 'Aarti K.', review: 'Chai Feast has completely replaced my regular evening tea. It relaxes me and tastes incredibly authentic.', dp: 'https://i.pravatar.cc/150?img=10' },
      { name: 'Rajesh N.', review: 'Finally, a healthy tea that actually tastes like Indian masala chai. Love the subtle cardamom kick.', dp: 'https://i.pravatar.cc/150?img=14' },
      { name: 'Neha V.', review: 'I feel so much more balanced and less stressed after switching to Chai Feast.', dp: 'https://i.pravatar.cc/150?img=16' }
    ],
    faqImage: '/assets/images/teap2.webp',
    faqs: [
      { question: 'Does Chai Feast contain sugar?', answer: 'No, it is sweetened with natural, zero-calorie stevia extract.' },
      { question: 'Do I need to boil it with milk?', answer: 'Not at all! Just mix with hot water. The premium milk solids are already included in the blend.' },
      { question: 'What makes it good for immunity?', answer: 'Our blend is fortified with ginger root extract, Vitamin C, and adaptogens which support natural immune health.' }
    ]
  }
};
