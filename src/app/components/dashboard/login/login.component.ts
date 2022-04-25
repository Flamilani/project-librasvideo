import { AuthAdminService } from './../../../shared/services/auth-admin.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { environment } from './../../../../environments/environment';
import { LoginViewContent, LoginViewData, LoginViewFooter, LoginViewHeader } from 'src/app/shared/interfaces/login.interface';
import { LOGIN_VIEW_DATA } from 'src/app/shared/constants/login.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  readonly loginViewData: LoginViewData = LOGIN_VIEW_DATA;
  imagePath = environment.imagePath;
  formLogin!: FormGroup;
  email: string = '';
  senha: string = '';
  errorMessage: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthAdminService,
    private router: Router
  ) { }

   buildForm(): void {
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

  login(){
    this.auth.login(this.formLogin.value.email, this.formLogin.value.password);
  }
/*
  login() {
    this.authService.autenticar(this.email, this.senha).subscribe(
      () => {
        this.router.navigate(['animais']);
      },
      (error) => {
        alert('Usuário ou senha inválido');
      }
    );
  } */

}
