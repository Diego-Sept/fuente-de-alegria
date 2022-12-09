import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraduatesComponent } from './graduates.component';
import { GraduatesService } from './graduates.service';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: GraduatesComponent
  },
];

@NgModule({
  declarations: [
    GraduatesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    GraduatesService
  ],
  exports: [
    GraduatesComponent
  ]
})
export class GraduatesModule { }
