import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const PLANNS_COLLECTION = 'planns'
const DAILY_COLLECTION = 'daily'
const USERS_COLLECTION = 'users'

const Firebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyC_n2bsR70xGw3OerwcdtoKo9X-tlH4-Z8",
    authDomain: "nutricounter-a6065.firebaseapp.com",
    projectId: "nutricounter-a6065",
    storageBucket: "nutricounter-a6065.appspot.com",
    messagingSenderId: "1009725241661",
    appId: "1:1009725241661:web:17fdc6b5cd94eed622ed54",
    measurementId: "G-W34GKC2W0S"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const getUsers = async (id = null) => {
    const col = collection(db, USERS_COLLECTION);
    const snapshot = await getDocs(col);

    if (id) return snapshot.docs.find(doc => doc.id === id)?.data();
    
    return snapshot.docs.map(doc => doc.data());
  }

  
  const getPlanns = async (id = null) => {
    const col = collection(db, PLANNS_COLLECTION);
    const snapshot = await getDocs(col);

    if (id) return snapshot.docs.find(doc => doc.id === id)?.data();

    return snapshot.docs.map(doc => doc.data());
  }

  const getDaily = async (id = null) => {
    const col = collection(db, DAILY_COLLECTION);
    const snapshot = await getDocs(col);

    if (id) return snapshot.docs.find(doc => doc.id === id)?.data();

    return snapshot.docs.map(doc => doc.data());
  }

  return {
    db,
    getUsers,
    getDaily,
    getPlanns,
  }
}

export default Firebase