import { LOGIN_VIEW_DATA } from './constants/login.constant';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginViewContent, LoginViewData, LoginViewFooter, LoginViewHeader } from './interface/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  readonly loginViewData: LoginViewData = LOGIN_VIEW_DATA;

  formLogin!: FormGroup;

  email: string = '';
  password: string = '';
  errorMessage: boolean = false;
  message: string = '';

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  buildForm(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.buildForm();
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

  onLogin() {
      this.errorMessage = false;
      this.authService.signIn({
        username: this.formLogin.value.name,
        email: this.formLogin.value.email,
        password: this.formLogin.value.password,
        admin: false
      }).then(() => {
        this.errorMessage = false;
        this.authService.authSuccessfully();
      }).catch((err) => {
        this.errorMessage = true;
        this.message = err.message;
      });


/*     this.authService.autenticar(this.email, this.senha).subscribe(
      () => {
        this.router.navigateByUrl('entrada');
      },
      (error) => {
        alert('Usuário ou senha inválido');
        console.log(error);
      }
    ); */
  }

}
