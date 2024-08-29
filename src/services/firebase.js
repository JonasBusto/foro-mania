import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAKRXcV9QNKvEbBgL2J66A7WJXwHxuJd-0',
  authDomain: 'foromania2024.firebaseapp.com',
  databaseURL: 'https://foromania2024-default-rtdb.firebaseio.com',
  projectId: 'foromania2024',
  storageBucket: 'foromania2024.appspot.com',
  messagingSenderId: '503152319606',
  appId: '1:503152319606:web:65cb231ceb3cbfaf6c5357',
  measurementId: 'G-XKL9PCB9WJ',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
