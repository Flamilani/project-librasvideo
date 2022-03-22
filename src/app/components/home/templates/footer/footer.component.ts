import { Contact, FooterViewData } from './../../../../shared/interfaces/footer.interface';
import { FOOTER_VIEW_DATA } from './../../../../shared/constants/footer.constant';
import { Component, OnInit } from '@angular/core';

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
