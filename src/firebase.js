import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB2l8lPDDu2T9JW9n1I_pNSPazFK0mqYAs",
  authDomain: "fir-app-1-72fb2.firebaseapp.com",
  projectId: "fir-app-1-72fb2",
  storageBucket: "fir-app-1-72fb2.appspot.com",
  messagingSenderId: "362037786497",
  appId: "1:362037786497:web:c63a3246d9d3ba6cd05a80"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const firestore = getFirestore(app);
const db = collection(firestore, "favs")


export function getFavs(uid) {
   return db.doc(uid).get()
       .then(snap => {
          return snap.data().array
       })
}



export function updateDB(array, uid) {
  const docRef = doc(db, uid);
  return setDoc(docRef, { array });
}



const provider = new GoogleAuthProvider();

export function LoginWithGoogle() {
  return signInWithPopup(auth, provider)
      .then((snap) => snap.user);
}

export function LogoutWithGoogle() {
  if (auth.currentUser?.providerData[0]?.providerId === 'google.com') {
    return auth.signOut().then(() => {
      console.log('User logged out from Google');
    });
  } else {
    // Use generic `auth.signOut()` if not logged in with Google
    return auth.signOut();
  }
}

