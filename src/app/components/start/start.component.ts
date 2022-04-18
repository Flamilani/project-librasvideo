import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGIN_VIEW_DATA } from './../../shared/constants/login.constant';
import { LoginViewData, LoginViewFooter } from './../../shared/interfaces/login.interface';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  readonly loginViewData: LoginViewData = LOGIN_VIEW_DATA;

  loading!: boolean;

  imgLoading = environment.imgLoading;

  imagePath = environment.imagePath;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout (() => {
      this.loading = false;
    }, 2000);
  }

  get viewFooter(): LoginViewFooter {
    return this.loginViewData.footer;
  }

  navigate() {
    this.router.navigateByUrl('home/login');
  }

}
