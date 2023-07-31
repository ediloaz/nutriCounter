import { some, isArray } from 'lodash'

export const getRandomItemFromArray = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const hasNonZeroValue = (obj) => {
  return some(obj, (value) => {
    return value !== 0 || (isArray(value) && value.length > 0);
  });
}

export const findPositionOfTrue = (arr) => {
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === true) {
      count += 1
    } else {
      return count || null
    }
  }
  return count || null
}
