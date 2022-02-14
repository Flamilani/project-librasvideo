import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  imagePath = '../../../../assets/img/logo-2.png';

  constructor() { }

  ngOnInit(): void {
  }

}
