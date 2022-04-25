import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { UserService } from './../../../shared/services/user.service';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-entrace',
  templateUrl: './entrace.component.html',
  styleUrls: ['./entrace.component.scss']
})
export class EntraceComponent implements OnInit {
  users: any;
  profileId: any;
  imageUser = environment.imageUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  get isLoggedIn() {
    if (this.authService.isLoggedIn != true) {
      return this.router.navigate(['home/login']);
    } else {
      return true;
    }
  }

  loadUser() {
    this.afAuth.authState.subscribe((user) => {
    this.userService.getProfile(user?.uid).subscribe((user) => {
      this.users = user;
      this.profileId = user?.uid;
    });
  });
  }

  profile() {
    this.router.navigateByUrl('home/filmes');
  }

}
