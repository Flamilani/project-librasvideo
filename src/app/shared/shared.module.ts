import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortByPipe } from './pipes/sort-by.pipe';

@NgModule({
  declarations: [
    DialogComponent,
    SortByPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule
  ],
  exports: [
  ]
})
export class SharedModule { }
