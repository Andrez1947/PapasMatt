import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
apiKey: "AIzaSyD4wR3CWH0KMsSDTVx-AtM0AKahRPHIBsw",
authDomain: "papasmatt-7ae9a.firebaseapp.com",
databaseURL: "https://papasmatt-7ae9a-default-rtdb.firebaseio.com",
projectId: "papasmatt-7ae9a",
storageBucket: "papasmatt-7ae9a.appspot.com",
messagingSenderId: "832175292275",
appId: "1:832175292275:web:c1f5f954aca3d5afb30f06"
};

const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };