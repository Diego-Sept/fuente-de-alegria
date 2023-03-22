import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';

import { StoresComponent } from './stores.component';
import { StoreAddComponent } from './store-add/store-add.component';

const routes = [
  {
    path: '',
    component: StoresComponent
  },
    {
      path: 'stores',
      component: StoresComponent
    },
    {
      path: 'store-edit',
      redirectTo: 'store-edit/:id' // Redirection
    }
  ];

@NgModule({
  declarations: [
    StoresComponent, 
    StoreAddComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
  ],
  exports: [
    StoresComponent,
    StoreAddComponent
  ]
})
export class StoresModule { }
