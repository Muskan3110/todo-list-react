import React from 'react';
import firebase from 'firebase/compat/app'
import GoogleIcon from '@mui/icons-material/Google';
import "./login.css";

const Login = () => {
    // Function to handle sign-in with Google
    const SignedInWithFirebase =()=>{
        const google_provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google_provider)
        .then((re)=>{
            console.log(re); // Log the response on successful sign-in
        })
        .catch((err)=>{
            console.log(err); // Log any errors
        })
    }
    return( 
       <div id="login-page">
           <div id="login-card">
               <h2>Welcome to Todo List!</h2>
               <div className="login-button google"
                  onClick={SignedInWithFirebase}
               >
                    {/* <button onClick={SignedInWithFirebase}>Sign In with Google</button> */}
                    <GoogleIcon  style={{ display:"inline-flex",lineHeight: "24px", verticalAlign: "top" }}/>
                    {/* <GoogleIcon /> */}
                    Sign in with Google   
               </div>
           </div>

       </div>
        
    );
}

export default Login