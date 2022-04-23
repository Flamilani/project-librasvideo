import { environment } from 'src/environments/environment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './../../../../shared/services/auth.service';
import { User } from './../../../../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  user!: User;

  imagePath = environment.imagePath;
  imageSmallPath = environment.imageSmallPath;
  imageUser = environment.imageUser;

  isAuth = false;
  authSubscription!: Subscription;

  onToggleSidenav() {
		this.sidenavToggle.emit();
	}

  constructor(public authService: AuthService) {
   }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

}
