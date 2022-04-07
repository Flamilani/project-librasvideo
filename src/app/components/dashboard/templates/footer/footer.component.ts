import { Component, OnInit } from '@angular/core';
import { FOOTER_VIEW_DATA } from './../../../../shared/constants/footer.constant';
import { FooterViewData } from './../../../../shared/interfaces/footer.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  readonly footerData = FOOTER_VIEW_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  get viewFooter(): FooterViewData {
    return this.footerData.footer;
  }
}
