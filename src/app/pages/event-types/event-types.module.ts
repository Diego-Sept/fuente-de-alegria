import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventTypesComponent } from './event-types.component';
import { EventTypesSidebarComponent } from './event-types-sidebar/event-types-sidebar.component';
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

const routes = [
	{
		path: '',
		component: EventTypesComponent
	},
];

@NgModule({
	declarations: [
		EventTypesComponent,
		EventTypesSidebarComponent
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
		EventTypesComponent,
		EventTypesSidebarComponent
	]
})
export class EventTypesModule { }
