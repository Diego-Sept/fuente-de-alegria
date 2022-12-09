import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaydesksComponent } from './paydesks.component';
import { PaydesksService } from './paydesks.service';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: PaydesksComponent
  },
];

@NgModule({
  declarations: [
    PaydesksComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    PaydesksService
  ],
  exports: [
    PaydesksComponent
  ]
})
export class PaydesksModule { }
