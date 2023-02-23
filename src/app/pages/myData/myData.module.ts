import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { MyDataComponent } from './myData.component';
import { MyDataService } from './myData.service';

// routing
const routes: Routes = [
  {
    path: '',
    component: MyDataComponent,
    resolve: {
      uls: MyDataService
    },
  },
  {
    path: 'myData',
    component: MyDataComponent,
    resolve: {
      uls: MyDataService
    },
    data: { animation: 'myDataComponent' }
  },
];

@NgModule({
  declarations: [ MyDataComponent ],
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
    CoreDirectivesModule
  ],
  providers: [ MyDataService ],
  exports: [
    MyDataComponent,
  ]
})
export class MyDataModule {}
