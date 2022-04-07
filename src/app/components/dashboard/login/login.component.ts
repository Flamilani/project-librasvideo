import { LOGIN_VIEW_DATA } from './constants/login.constant';
import { LoginViewData, LoginViewHeader, LoginViewContent, LoginViewFooter } from './interface/login.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  readonly loginViewData: LoginViewData = LOGIN_VIEW_DATA;
  imagePath = environment.imagePath;


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
/*
  login() {
    this.authService.autenticar(this.email, this.senha).subscribe(
      () => {
        this.router.navigate(['animais']);
      },
      (error) => {
        alert('Usuário ou senha inválido');
        console.log(error);
      }
    );
  } */

}
