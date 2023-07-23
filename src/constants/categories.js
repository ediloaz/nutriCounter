export const CATEGORIES = [
  { 
    id: 'protein',
    name: '🥚 Proteínas',
    kcal: 75,
  },
  { 
    id: 'carb',
    name: '🍞 Harinas',
    kcal: 80,
  },
  { 
    id: 'dairy',
    name: '🍶 Lácteos',
    kcal: 100,
  },
  { 
    id: 'fat',
    name: '🥑 Grasas',
    kcal: 45,
  },
  { 
    id: 'fruit',
    name: '🍍 Frutas',
    kcal: 60,
  },
  { 
    id: 'vegetable',
    name: '🥒 Vegetales',
    kcal: 25,
  },
]

export const CATEGORIES_OBJECT = CATEGORIES.reduce((obj, category) => {
  obj[category.id] = category;
  return obj;
}, {});

export const CUSTOM_FOODS_ID = 'customFoods'
