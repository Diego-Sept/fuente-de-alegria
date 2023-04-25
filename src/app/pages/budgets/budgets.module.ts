import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetsComponent } from './budgets.component';
import { RouterModule } from '@angular/router';
import { BudgetService } from 'app/core/services/budget.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { BudgetsSidebarComponent } from './budgets-sidebar/budgets-sidebar.component';


const routes = [
  {
    path: '',
    component: BudgetsComponent
  },
];

@NgModule({
  declarations: [
    BudgetsComponent,
    BudgetsSidebarComponent
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
    CoreSidebarModule
  ],
  providers: [
    BudgetService
  ],
  exports: [
    BudgetsComponent,
    BudgetsSidebarComponent
  ]
})
export class BudgetsModule { }
