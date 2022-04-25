import { environment } from 'src/environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../../../../shared/services/auth.service';
import { User } from './../../../../shared/models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  users: any;
  user!: User;
  loading!: boolean;
  profileId: any;
  imagePath = environment.imagePath;
  imageSmallPath = environment.imageSmallPath;
  imageUser = environment.imageUser;

  isAuth = false;
  authSubscription!: Subscription;

  onToggleSidenav() {
		this.sidenavToggle.emit();
	}

  constructor(
    public authService: AuthService,
    private afAuth: AngularFireAuth,
    private userService: UserService
    ) {
   }

  ngOnInit(): void {
    this.loadUser();
    this.loading = true;
    setTimeout (() => {
      this.loading = false;
    }, 2050);
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
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

}
