import { Router } from '@angular/router';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthData } from '../auth/auth-data.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

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

    registerUser(authData: AuthData) {
      this.afAuth
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
          this.authPayment();
          this.SetUserData(result.user);
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
            console.log(result);
            this.authSuccessfully();
          });
          this.SetUserData(result.user);
        })
        .catch(error => {
          this.errorMessage = "Erro autenticação";
          alert('Erro ao Acessar');
        });
    }

    logout() {
      this.authChange.next(false);
      this.router.navigateByUrl('home/login');
      this.isAuthenticated = false;
    }

    isAuth() {
      return this.isAuthenticated;
    }

    private authSuccessfully() {
      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigateByUrl('home/entrada');
    }

    private authPayment() {
      this.isAuthenticated = true;
      this.authChange.next(true);
      this.router.navigateByUrl('home/pagamento');
    }

    SetUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      return userRef.set(userData, {
        merge: true,
      });
    }
}
