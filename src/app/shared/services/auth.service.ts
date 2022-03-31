import { Router } from '@angular/router';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthData } from '../auth/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  errorMessage = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth
    ) {}

    registerUser(authData: AuthData) {
      this.afAuth
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
          console.log(result);
          this.authSuccessfully();
        })
        .catch(error => {
          console.log(error);
        });
    }

    login(authData: AuthData) {
      this.afAuth
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
          console.log(result);
          this.authSuccessfully();
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
}
