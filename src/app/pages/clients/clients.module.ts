import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';

import { ClientListComponent } from './client-list/client-list.component';
import { ClientSidebarComponent } from './client-list/client-sidebar/client-sidebar.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { ClientEditComponent } from './client-edit/client-edit.component';


const routes = [
  {
    path: '',
    component: ClientListComponent,
  },
  {
    path: 'client-list',
    component: ClientListComponent
  },
  {
    path: 'client-view/:id',
    component: ClientViewComponent
  },
  {
    path: 'client-edit/:id',
    component: ClientEditComponent
  },
  {
    path: 'client-view',
    redirectTo: 'client-view/:id' // Redirection
  },
  {
    path: 'client-edit',
    redirectTo: 'client-edit/:id' // Redirection
  }
];

@NgModule({
  declarations: [ ClientListComponent, ClientViewComponent, ClientEditComponent, ClientSidebarComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ContentHeaderModule,
    NgxDatatableModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule
  ],
  exports: [
    ClientListComponent, 
    ClientSidebarComponent,
    ClientViewComponent,
    ClientEditComponent,
  ]
})
export class ClientsModule { }
