import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreationComponent } from './user-creation.component';
import { UserCreationService } from './user-creation.service';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: UserCreationComponent
  },
];

@NgModule({
  declarations: [
    UserCreationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    UserCreationService
  ],
  exports: [
    UserCreationComponent
  ]
})
export class UserCreationModule { }
