import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaloonsComponent } from './saloons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { SaloonsSideBarComponent } from './saloons-sidebar/saloons-sidebar.component';

const routes = [
	{
		path: '',
		component: SaloonsComponent
	},
];

@NgModule({
	declarations: [
		SaloonsComponent,
		SaloonsSideBarComponent
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
		SaloonsComponent,
		SaloonsSideBarComponent
	]
})
export class SaloonsModule { }
