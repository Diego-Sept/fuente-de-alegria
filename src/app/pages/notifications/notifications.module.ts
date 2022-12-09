import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { RouterModule } from '@angular/router';
import { NotificationsService } from './notifications.service';

const routes = [
  {
    path: '',
    component: NotificationsComponent
  },
];

@NgModule({
  declarations: [
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    NotificationsService
  ],
  exports: [
    NotificationsComponent
  ]
})
export class NotificationsModule { }
