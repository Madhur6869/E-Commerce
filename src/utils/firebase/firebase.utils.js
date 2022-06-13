import {initializeApp} from 'firebase/app'
import {getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCViR_dDS8befwIeNF49MPldmMILyBs6gA",  
    authDomain: "e-commerce-db-66051.firebaseapp.com",  
    projectId: "e-commerce-db-66051",  
    storageBucket: "e-commerce-db-66051.appspot.com",  
    messagingSenderId: "513000733413",  
    appId: "1:513000733413:web:a924162e09c2c78ab8320c"  
  };
  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth= getAuth()
  export const signInWithGooglePopup=()=> signInWithPopup(auth,provider)

  export const db= getFirestore()
  
  export const createUserDocumentFromAuth= async (userAuth) =>{
    const userDocRef = await doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    //If user does not exists
    if(!userSnapshot.exists()){
        const {displayName, email}= userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt
            })
        } catch(error){
            console.log('error creating user', error.message)
        }
    }

    return userDocRef
  }