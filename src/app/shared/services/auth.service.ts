import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthData } from '../auth/auth-data.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './../models/user';
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  errorMessage = '';

  constructor(
    public afs: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth,
    private ngZone: NgZone,
    ) {
       this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
    }

    signUp(authData: AuthData) {
      return this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password);
    }

    signIn(authData: AuthData) {
      return this.afAuth.signInWithEmailAndPassword(authData.email, authData.password);
    }

    forgotPassword(email: string) {
      return this.afAuth.sendPasswordResetEmail(email);
    }

    async GoogleAuth() {
      const res = await this.AuthLogin(new auth.GoogleAuthProvider());
      if (res!) {
        this.authSuccessfully();
      }
    }

  // Auth logic to run auth providers
  async AuthLogin(provider: any) {
    try {
      const result = await this.afAuth
        .signInWithPopup(provider);
      this.ngZone.run(() => {
        this.authSuccessfully();
      });
      this.setUserData(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

/*  updateProfile(profileData: Partial<User>): Observable<any> {
    const user = this.afAuth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not authenticated');

        return updateUser(user, profileData);
      })
    );
  } */

    updateProfile(profileId: string, changes: Partial<User>): Observable<any> {
      return from(this.afs.doc(`users/${profileId}`).update(changes));
    }

/*     signIn(email: string, password: string) {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.ngZone.run(() => {
            this.authSuccessfully();
          });
          this.setUserData(result.user);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    } */

    registerUser(authData: AuthData) {
      this.afAuth
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
          this.setUserData(result.user);
          this.authPayment();
        })
        .catch(error => {
          window.alert(error.message);
        });
    }

    login(authData: AuthData) {
      this.afAuth
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
          this.ngZone.run(() => {
            this.authSuccessfully();
          });
          this.SetUserDataVerified(result.user);
        })
        .catch(error => {
          this.errorMessage = "Erro autenticação";
          console.log(error.message);
          alert('Erro ao Acessar');
        });
    }

    async logout() {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.authChange.next(false);
      this.router.navigateByUrl('home/login');
      this.isAuthenticated = false;
    }

    isAuth() {
      return this.isAuthenticated;
    }

    isSignedIn(): boolean {
      if (!localStorage.getItem('user')) {
        return false;
      }
      return true;
    }

    public authSuccessfully() {
      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigateByUrl('home/entrada');
    }

    public authPayment() {
      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigateByUrl('home/pagamento');
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      return (user !== null && user.emailVerified !== false) ? true : false;
    }

    // get isLoggedIn(): boolean {
    //   const user = JSON.parse(localStorage.getItem('user')!);
    //   if (user === null) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }

    SendVerificationMail() {
      return this.afAuth.currentUser
        .then((u: any) => u.sendEmailVerification())
        .then(() => {
          this.router.navigateByUrl('home/verificar-email');
        });
    }

    setUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        emailVerified: user.emailVerified
      };
      return userRef.set(userData, {
        merge: true,
      });
    }

    SetUserDataVerified(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      const userData: User = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified
      };
      return userRef.set(userData, {
        merge: true,
      });
    }
}
