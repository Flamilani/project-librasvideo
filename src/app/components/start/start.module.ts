import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { FooterComponent } from './footer/footer.component';
import { StartRoutingModule } from './start-routing.module';


@NgModule({
  declarations: [
    StartComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule
  ]
})
export class StartModule { }
