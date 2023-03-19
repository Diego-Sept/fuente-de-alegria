import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: StockComponent
  },
];

@NgModule({
  declarations: [
    StockComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
  ],
  exports: [
    StockComponent
  ]
})
export class StockModule { }
