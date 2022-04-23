import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entrace',
  templateUrl: './entrace.component.html',
  styleUrls: ['./entrace.component.scss']
})
export class EntraceComponent implements OnInit {

  imageUser = environment.imageUser;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  get isLoggedIn() {
    if (this.authService.isLoggedIn != true) {
      return this.router.navigate(['home/login']);
    } else {
      return true;
    }
  }

  profile() {
    this.router.navigateByUrl('home/filmes');
  }

}
