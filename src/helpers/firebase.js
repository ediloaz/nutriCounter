import { doc, setDoc, updateDoc } from "firebase/firestore";

const DAILY_COLLECTION = 'daily'

const EMPTY_DAILY = {
  protein: 0,
  carb: 0,
  dairy: 0,
  fat: 0,
  fruit: 0,
  vegetable: 0,
}

export const addNewFood = async (db, food, daily) => {
  const ref = doc(db, DAILY_COLLECTION, daily);

  await updateDoc(ref, food);
}

const createEmptyDaily = async (db, dailyName) => {
  const ref = doc(db, DAILY_COLLECTION, dailyName);

  
  await setDoc(ref, EMPTY_DAILY);
}

export const createDailyIfNotExists = async (db, getDaily, dailyName) => {
  
  // eslint-disable-next-line no-console
  console.log('	🎮 db, getDaily, dailyName', db, getDaily, dailyName)
  
  getDaily(dailyName).then((data) => console.log('data', data) || (!data && createEmptyDaily(db, dailyName)))

  
  // // eslint-disable-next-line no-console
  // console.log('	🎮 daily', daily)
  

  // if (!daily) createDaily(db, dailyName)
}