import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LOGIN_VIEW_DATA } from './../../../shared/constants/login.constant';
import { LoginViewContent, LoginViewData, LoginViewFooter, LoginViewHeader } from './../../../shared/interfaces/login.interface';
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  imgGoogle = environment.imgGoogle;

  readonly loginViewData: LoginViewData = LOGIN_VIEW_DATA;

  formLogin!: FormGroup;

  email: string = '';
  password: string = '';
  errorMessage: boolean = false;
  message: string = '';

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  buildForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.buildForm();
    this.isLoggedIn;
  }

  get isLoggedIn() {
    if (this.authService.isLoggedIn == false) {
      return this.router.navigate(['home/login']);
    } else {
      return this.authService.authSuccessfully();
    }
  }

  get viewHeader(): LoginViewHeader {
    return this.loginViewData.header;
  }

  get viewContentEmail(): LoginViewContent {
    return this.loginViewData.content[0];
  }

  get viewContentSenha(): LoginViewContent {
    return this.loginViewData.content[1];
  }

  get viewFooter(): LoginViewFooter {
    return this.loginViewData.footer;
  }

  navigate() {
    this.router.navigateByUrl('home/cadastro');
  }

  goToForgot() {
    this.router.navigateByUrl('home/esqueci-senha');
  }

  onLogin() {
    this.errorMessage = false;
    this.authService.signIn({
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
      admin: false
    }).then(result => {
      this.errorMessage = false;
      this.ngZone.run(() => {
        this.authService.authSuccessfully();
      });
      this.authService.SetUserDataVerified(result.user);
    }).catch((err) => {
      this.errorMessage = true;
      this.message = err.message;
    });
  }

}
