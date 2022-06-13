import {initializeApp} from 'firebase/app'
import {getAuth,signInWithPopup,signInWithRedirect,GoogleAuthProvider,createUserWithEmailAndPassword} from 'firebase/auth'
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

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth= getAuth()
  export const signInWithGooglePopup=()=> signInWithPopup(auth,googleProvider)
  export const signInWithGoogleRedirect=()=>signInWithRedirect(auth, googleProvider)
  export const db= getFirestore()
  
  //create users from auth
  export const createUserDocumentFromAuth= async (userAuth,additionalInformation={}) =>{
    if(!userAuth) return
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
                createdAt,
                ...additionalInformation
            })
        } catch(error){
            console.log('error creating user', error.message)
        }
    }

    return userDocRef
  }

  //Create user with email and passoword
export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth,email,password)
}