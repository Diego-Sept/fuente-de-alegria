import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCreationComponent } from './admin-creation.component';
import { AdminCreationService } from './admin-creation.service';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: AdminCreationComponent
  },
];

@NgModule({
  declarations: [
    AdminCreationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    AdminCreationService
  ],
  exports: [
    AdminCreationComponent
  ]
})
export class AdminCreationModule { }
