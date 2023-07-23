import { CATEGORIES } from '../constants/categories';

export const getCategoryNameById = (id) => {
  const category = CATEGORIES.find(cat => cat.id === id);
  return category ? category.name : null;
}

const getCategoryObjectById = (id) => {
  const category = CATEGORIES.find(cat => cat.id === id);
  return category ? category : null;
}

export const calcCategoryCalc = (id, quantity = 1) => {
  const category = getCategoryObjectById(id)
  
  return category?.kcal * quantity
}
