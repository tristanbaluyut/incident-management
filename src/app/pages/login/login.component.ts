import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, Auth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private authToken: string = ''
  private auth: Auth = getAuth();

  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        alert("Login Successful");
      } else {
        // User is signed out
        // ...
      }
    });
  }

  onClick(): void {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        alert("Login Failed");
      });
  }

  onGoogleClick(): void {
    signInWithPopup(this.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
          const token = credential.accessToken;

          // The signed-in user info.

          const user = result.user;
          // ...
          console.log(token);
          console.log(user);
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...      
        console.log(error);
        alert("Login Failed");
      });
  }
}
