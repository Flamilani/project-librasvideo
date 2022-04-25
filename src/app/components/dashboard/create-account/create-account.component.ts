import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_VIEW_DATA } from './../../../shared/constants/login.constant';
import { LoginViewContent, LoginViewData, LoginViewFooter, LoginViewHeader } from './../../../shared/interfaces/login.interface';
import { AuthAdminService } from './../../../shared/services/auth-admin.service';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
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

  createAccount(){
    this.auth.signUp(this.formLogin.value.email, this.formLogin.value.password);
  }

}
