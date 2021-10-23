import { Injectable } from '@angular/core';
import {
  Auth, createUserWithEmailAndPassword, getAuth, getIdToken, GoogleAuthProvider,
  onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword,
  signInWithPopup, signOut, User,
} from 'firebase/auth';
import { DatabaseService } from './database.service';

const googleProvider = new GoogleAuthProvider();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private auth: Auth = getAuth();

  constructor(private databaseService: DatabaseService) { }

  getCurrentUserId(): string | undefined {
    return this.auth.currentUser?.uid;
  }

  getCurrentUserEmail(): string | undefined | null {
    return this.auth.currentUser?.email;
  }

  isUserLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        if (user) {
          getIdToken(user).then(() => {
            resolve(true);
          }, () => {
            resolve(false);
          });
        } else {
          resolve(false);
        }
      });
    });
  };

  subscribe(callback: (user?: User) => any): void {
    onAuthStateChanged(this.auth, (user) => {
      console.log(user);
      if (user) {
        callback(user);
      } else {
        callback(undefined);
      }
    });
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<boolean> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  }

  signInWithPopupGoogle(): void {
    signInWithPopup(this.auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
          const token = credential.accessToken;
          const user = result.user;
          console.log(token);
          console.log(user);
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  signOutUser(): Promise<void> {
    return signOut(this.auth);
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<boolean> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  canAccess(link: string): boolean {
    let uid = this.getCurrentUserId();
    let role = this.databaseService.getRoleCache(uid || '');

    switch (link) {
      case 'dashboard':
      case 'users':
        return role === 'Admin';
      case 'raise-incident':
        return role !== 'Admin';
      default:
        return true;
    }
  }
}
