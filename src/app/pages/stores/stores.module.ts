import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresComponent } from './stores.component';
import { StoresService } from './stores.service';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: StoresComponent
  },
];

@NgModule({
  declarations: [
    StoresComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    StoresService
  ],
  exports: [
    StoresComponent
  ]
})
export class StoresModule { }
