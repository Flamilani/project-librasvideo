import { Component, OnInit } from '@angular/core';
import { User } from './../../../shared/models/user';
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: User;
  constructor(public authService: AuthService) {

   }

  ngOnInit(): void {
  }

  getUserLoggedIn() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

}
