import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetsComponent } from './budgets.component';
import { RouterModule } from '@angular/router';
import { BudgetsService } from './budgets.service';

const routes = [
  {
    path: '',
    component: BudgetsComponent
  },
];

@NgModule({
  declarations: [
    BudgetsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    BudgetsService
  ],
  exports: [
    BudgetsComponent
  ]
})
export class BudgetsModule { }
