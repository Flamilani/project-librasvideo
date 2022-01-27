import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { REGISTER_VIEW_DATA } from './constants/register.constant';
import { RegisterViewContent, RegisterViewData, RegisterViewFooter, RegisterViewHeader } from './interface/login.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  readonly registerViewData: RegisterViewData = REGISTER_VIEW_DATA;

  email: string = '';
  senha: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  get viewHeader(): RegisterViewHeader {
    return this.registerViewData.header;
  }

  get viewContent(): RegisterViewContent {
    return this.registerViewData.content;
  }

  get viewFooter(): RegisterViewFooter {
    return this.registerViewData.footer;
  }

  cadastrar() {
    console.log("Cadastro");
  }

  navigate() {
    this.router.navigateByUrl('home/login');
  }

}
