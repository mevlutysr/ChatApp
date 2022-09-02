import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)});

export const db = getFirestore(app);