import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { ClientsService } from './clients.service';
import { RouterModule } from '@angular/router';
import { DatatablesModule } from 'app/main/tables/datatables/datatables.module';
import { TablesModule } from 'app/main/tables/tables.module';

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
    DatatablesModule,
    TablesModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ClientsService,
  ],
  exports: [
    ClientsComponent, 
  ]
})
export class ClientsModule { }
