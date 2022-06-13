// import { useEffect } from 'react';
// import {getRedirectResult} from 'firebase/auth'
import {
    // auth, g
    signInWithGooglePopup,
    // signInWithGoogleRedirect, 
    createUserDocumentFromAuth
    } from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () =>{
    //Sign in with Redirect
    // useEffect( () => {
    //     async function redirect(){            
    //     const response = await getRedirectResult(auth)
    //     if(response){
    //         const userDocRef = await createUserDocumentFromAuth(response.user)
    //     }
    //     }
    //     redirect()

    // },[])
    const logGoogleUser =async ()=>{
        const {user} = await signInWithGooglePopup();
         const userDocRef = await createUserDocumentFromAuth(user)
    }
    
  return (
    <div>
        <h1>Sign in page</h1>
        <button onClick={logGoogleUser}>
            Sign in with google Popup
        </button>
        <SignUpForm/>
        {/* <button onClick={signInWithGoogleRedirect}>
            Sign in with google Redirect
        </button> */}
    </div>
  )
}

export default SignIn
