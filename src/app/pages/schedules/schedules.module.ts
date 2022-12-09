import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesComponent } from './schedules.component';
import { SchedulesService } from './schedules.service';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: SchedulesComponent
  },
];

@NgModule({
  declarations: [
    SchedulesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    SchedulesService
  ],
  exports: [
    SchedulesComponent
  ]
})
export class SchedulesModule { }
