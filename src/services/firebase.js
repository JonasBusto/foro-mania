import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyCXO1Cn5DdZco4cbfWzDvcjIqttnWGiOPY',
	authDomain: 'foromania.firebaseapp.com',
	projectId: 'foromania',
	storageBucket: 'foromania.appspot.com',
	databaseURL:
		'https://foromania-default-rtdb.firebaseio.com',
	messagingSenderId: '1084858394833',
	appId: '1:1084858394833:web:35653ef47eb910c8cdbdf0',
	measurementId: 'G-3M27ZVTJJY',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
