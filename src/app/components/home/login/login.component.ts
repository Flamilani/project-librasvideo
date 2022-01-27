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

  form!: FormGroup;

  email: string = '';
  senha: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  buildForm(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.minLength(3)])
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
    this.router.navigateByUrl('entrada');
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
