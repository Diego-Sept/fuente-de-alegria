import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { ClientsService } from './clients.service';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    component: ClientsComponent
  },
];

@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ClientsService,
  ],
  exports: [
    ClientsComponent
  ]
})
export class ClientsModule { }
