import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

import EventEmitter from '@site/src/EventEmitter';

const firebase_config = {
    apiKey: 'AIzaSyCJhLo__GsvoEcP3Tp8G5jAhMo0OLPuBec',
    authDomain: 'jcubic-1500107003772.firebaseapp.com',
    databaseURL: 'https://jcubic-1500107003772.firebaseio.com',
    projectId: 'jcubic-1500107003772',
    storageBucket: 'jcubic-1500107003772.appspot.com',
    messagingSenderId: '1005897028349',
    appId: '1:1005897028349:web:fc2d0f5524864d5d17e494'
};

export const firebase = initializeApp(firebase_config);

const database = getDatabase(firebase);
