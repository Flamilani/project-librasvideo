import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entrace',
  templateUrl: './entrace.component.html',
  styleUrls: ['./entrace.component.scss']
})
export class EntraceComponent implements OnInit {

  imageUser = environment.imageUser;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  profile() {
    this.router.navigateByUrl('home/filmes');
  }

}
