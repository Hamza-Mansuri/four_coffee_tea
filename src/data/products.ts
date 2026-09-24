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
    healthBenefits: 'Mocha Feast - Coffee & Chocolate Protein Fusion designed for athletes and fitness enthusiasts to deliver protein, energy, and antioxidants to support muscle recovery, strength, and focus.',
    description: 'Premium cocoa powder, instant coffee extract, whey protein isolate, stevia, natural chocolate flavor, added digestive enzymes.',
    directions: 'Step 1: Mix 1 serving with 250-300 ml cold water or milk. Step 2: Shake well and consume pre-workout or in the morning for an energy boost.',
    storage: 'Store in a cool, dry place. Keep tightly closed. Protect from sunlight and moisture.',
    nutrition: {
      Energy: '120 kcal',
      Protein: '20g',
      Carbohydrates: '5g',
      Fat: '1.5g',
      Fiber: '2g',
      'Vitamin C': '10mg',
      Iron: '2mg',
      Resveratrol: '0mg'
    },
    perfectForImage: '/assets/images/cp3.webp',
    perfectForItems: [
      { title: 'Breakfast', desc: 'Kickstart your morning with a powerful caffeine and protein boost.' },
      { title: 'Lunch', desc: 'A quick meal replacement when you are on the go.' },
      { title: 'Weight Management', desc: 'Low in carbs and packed with protein to support lean muscle.' },
      { title: 'Gaming Sessions', desc: 'Enhances focus and reaction time with natural caffeine.' },
      { title: 'Intense Work Periods', desc: 'Beats the afternoon slump and keeps you sharp.' },
      { title: 'Pre/Post Workout', desc: 'Perfect pre-workout energy or post-workout muscle recovery.' }
    ],
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
    title: 'Chai Feast',
    subtitle: 'Authentic Indian chai flavor combined with essential vitamins and minerals.',
    price: '₹950',
    originalPrice: '₹1200',
    stockStatus: 'In stock',
    images: [
      '/assets/images/tea-480.webp',
      '/assets/images/elaichi_glass.webp',
      '/assets/images/masala_kulhad.webp'
    ],
    healthBenefits: 'Chai Feast - Authentic Indian chai flavor combined with essential vitamins, minerals, and adaptogens for daily immunity, stress relief, and gentle energy without the crash.',
    description: 'Black tea extract, cardamom, ginger root powder, skimmed milk powder, fortified vitamin blend, natural sweeteners.',
    directions: 'Step 1: Mix 1 serving with 150-200 ml hot water (do not boil the powder). Step 2: Stir well and enjoy as your morning or evening tea.',
    storage: 'Store in a cool, dry place. Keep tightly closed. Protect from sunlight and moisture.',
    nutrition: {
      Energy: '90 kcal',
      Protein: '10g',
      Carbohydrates: '8g',
      Fat: '1g',
      Fiber: '1g',
      'Vitamin C': '15mg',
      Iron: '1mg',
      Resveratrol: '0mg'
    },
    perfectForImage: '/assets/images/tea-p.webp',
    perfectForItems: [
      { title: 'Breakfast', desc: 'A soothing start to your day with authentic Indian spices.' },
      { title: 'Lunch', desc: 'A perfect post-meal digestive and refresher.' },
      { title: 'Weight Management', desc: 'Low calorie option that satisfies cravings.' },
      { title: 'Gaming Sessions', desc: 'Gentle, crash-free energy for long sessions.' },
      { title: 'Intense Work Periods', desc: 'Relieves stress and provides a moment of calm focus.' },
      { title: 'Pre/Post Workout', desc: 'Hydrates and provides antioxidants for recovery.' }
    ],
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
