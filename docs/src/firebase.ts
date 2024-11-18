import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebase_config = {
    apiKey: 'AIzaSyCJhLo__GsvoEcP3Tp8G5jAhMo0OLPuBec',
    authDomain: 'jcubic-1500107003772.firebaseapp.com',
    databaseURL: 'https://jcubic-1500107003772.firebaseio.com',
    projectId: 'jcubic-1500107003772',
    storageBucket: 'jcubic-1500107003772.appspot.com',
    messagingSenderId: '1005897028349',
    appId: '1:1005897028349:web:fc2d0f5524864d5d17e494'
};

const vapid_key = 'BCwx3BcH1YFCjBfWy3qmEZyVukPf-cLZUfVe9j3j1bwRcYi1aVhiEHPZqBvAcnvSyfznGoRHQrv3I2fDyBfULxk';

export const firebase = initializeApp(firebase_config);

const messaging = getMessaging(firebase);

function getTokenWrapper() {
    return getToken(messaging, { vapidKey: vapid_key });
}

export { getTokenWrapper as getToken };
