import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyBmEWdDsinfQVv0t53wdBrJFjx_lUhRHH0",
  authDomain: "poin-ufba.firebaseapp.com",
  // ...
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function SignInScreen() {
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen;

// export default function Login() {

//     return (
//         <div className={styles.container} >
//             <h1>Login</h1>
//             <div className={styles.main}>
//                 <label for="uname"><b>Username</b></label>
//                 <input type="text" placeholder="Enter Username" name="uname" required />

//                 <label for="psw"><b>Password</b></label>
//                 <input type="password" placeholder="Enter Password" name="psw" required />

//                 <button type="submit">Login</button>
//                 <Link href='/'>
//                     <button type="submit">Cancel</button>
//                 </Link>
//                 <label>
//                 <input className={styles.input} type="checkbox" name="remember" /> Remember me
//                 </label>
//             </div>
//         </div>
//     )
// }
