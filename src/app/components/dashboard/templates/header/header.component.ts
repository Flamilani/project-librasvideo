import { AuthAdminService } from './../../../../shared/services/auth-admin.service';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  imagePathAdmin = environment.imagePathAdmin;

  constructor(public auth: AuthAdminService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.auth.logOut();
  }

}
