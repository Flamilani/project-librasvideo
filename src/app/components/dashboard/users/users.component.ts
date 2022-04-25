import { User } from './../../../shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  imgLoading = environment.imgLoading;
  loading!: boolean;
  users!: User[];
  order: any;

  constructor(
    private router: Router,
    public userService: UserService,
    private notifyService : NotificationService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout (() => {
      this.loading = false;
      this.listUsers();
   }, 1000);
  }

  listUsers() {
    this.userService.loadUsers().subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }


}
