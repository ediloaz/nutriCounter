import { CATEGORIES } from '../constants/categories';

export const getCategoryNameById = (id) => {
  const category = CATEGORIES.find(cat => cat.id === id);
  return category ? category.name : null;
}