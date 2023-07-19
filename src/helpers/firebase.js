import moment from "moment";
import { doc, setDoc, updateDoc } from "firebase/firestore";

import { EMPTY_DAILY } from "../constants/daily";

const DAILY_COLLECTION = 'daily'

export const addNewFood = async (db, { daily, current, history }, dailyName) => {
  const ref = doc(db, DAILY_COLLECTION, dailyName);

  const currentTime = current?.hour?._d || new Date()
  const hour = moment(currentTime).format('h:mm a');

  const newDaily = {
    ...daily,
    history: [
      ...history,
      {
        ...current,
        hour,
      }
    ]
  }


  await updateDoc(ref, newDaily);
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