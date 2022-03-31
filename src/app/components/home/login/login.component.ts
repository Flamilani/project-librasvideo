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

  get viewContent(): LoginViewContent {
    return this.loginViewData.content;
  }

  get viewFooter(): LoginViewFooter {
    return this.loginViewData.footer;
  }

  navigate() {
    this.router.navigateByUrl('home/cadastro');
  }

  login() {
    try {
      this.authService.login({
        email: this.formLogin.value.email,
        password: this.formLogin.value.password,
        admin: false
      });
    } catch (error) {
      console.log(error);
    }

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
