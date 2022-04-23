import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
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
  users: any;

  imageUser = environment.imageUser;
  profileId: any;
  public providerId: string = 'null';


  constructor(
      public authService: AuthService,
      private router: Router,
      private afAuth: AngularFireAuth,
      private userService: UserService
    ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.afAuth.authState.subscribe((user) => {
    this.userService.getProfile(user?.uid).subscribe((user) => {
      this.users = user;
      this.profileId = user?.uid;
      console.log(this.users);
      console.log('profileId', this.profileId);
    });
  });
  }

  currentUser() {
    this.authService.isAuth()
  }

  getUserLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

}
