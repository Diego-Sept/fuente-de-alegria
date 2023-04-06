import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreTouchspinModule } from '@core/components/core-touchspin/core-touchspin.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { FractionsComponent } from './fractions.component';
import { FractionsSidebarComponent } from './fractions-sidebar/fractions-sidebar.component';
import { FractionsViewComponent } from './fractions-view/fractions-view.component';

const routes = [
  {
    path: '',
    component: FractionsComponent
  },
  {
    path: 'fractions-view/:id',
    component: FractionsViewComponent
  },
  {
    path: 'fractions-view',
    redirectTo: 'fractions-view/:id'
  },
];

@NgModule({
  declarations: [
    FractionsComponent,
    FractionsViewComponent,
    FractionsSidebarComponent
  ],
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
    CoreSidebarModule,
    CoreTouchspinModule,
  ],
  exports: [
    FractionsComponent,
    FractionsViewComponent,
    FractionsSidebarComponent
  ]
})
export class FractionsModule { }
