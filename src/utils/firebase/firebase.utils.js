import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD2nc84MeUPMpAvdqnqdz4uLtMOBYFvAos",
  authDomain: "crwn-clothing-db-5bd7b.firebaseapp.com",
  projectId: "crwn-clothing-db-5bd7b",
  storageBucket: "crwn-clothing-db-5bd7b.appspot.com",
  messagingSenderId: "65979392320",
  appId: "1:65979392320:web:aa52dbee49c37406a41aa5"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  console.log(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object)=>{
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef,object);
  });

  await batch.commit();
}

export const createUserDocumentFromAuth = async (userAuth, additionalData) =>{

  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(
        userDocRef,
        {
          displayName,
          email,
          createdAt,
         ...additionalData
    });
    console.log('create account successfully');
    }catch(error){
      console.log('error creating the user',error.message);
    }
  }else{
    console.log('account exists')
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() =>{
  await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
}

export const getCategoriesAndDocuments = async () =>{
  const collectionRef = collection(db, 'catagories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  })
  return categoryMap;
}