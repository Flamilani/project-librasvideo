import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { FooterComponent } from './footer/footer.component';
import { StartRoutingModule } from './start-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    StartComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    StartRoutingModule
  ]
})
export class StartModule { }
