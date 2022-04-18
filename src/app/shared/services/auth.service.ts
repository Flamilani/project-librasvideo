import { Router } from '@angular/router';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthData } from '../auth/auth-data.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from './../models/user';
import { concatMap } from 'rxjs/operators';

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
    private ngZone: NgZone
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

/*  updateProfile(profileData: Partial<User>): Observable<any> {
    const user = this.afAuth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not authenticated');

        return updateUser(user, profileData);
      })
    );
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

/*     get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return (user !== null && user.emailVerified !== false) ? true : false;
    } */

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user')!);
      if (user === null) {
        return false;
      } else {
        return true;
      }
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
        phoneNumber: user.phoneNumber

      };
      return userRef.set(userData, {
        merge: true,
      });
    }
}
