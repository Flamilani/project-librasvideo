import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { User } from './../../../shared/models/user';
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  imageUser = environment.imageUser;
  profileId: any;
  public providerId: string = 'null';


  constructor(
      public authService: AuthService
    ) {}

  ngOnInit(): void {
  }

  currentUser() {
    this.authService.isAuth()
  }

  getUserLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

}
