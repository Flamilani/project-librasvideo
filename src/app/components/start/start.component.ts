import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LOGIN_VIEW_DATA } from '../home/login/constants/login.constant';
import { LoginViewData, LoginViewFooter } from '../home/login/interface/login.interface';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  readonly loginViewData: LoginViewData = LOGIN_VIEW_DATA;

  imagePath = environment.imagePath;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  get viewFooter(): LoginViewFooter {
    return this.loginViewData.footer;
  }

  navigate() {
    this.router.navigateByUrl('home/login');
  }

}
