import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { ClientsService } from './clients.service';
import { RouterModule } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CsvModule } from '@ctrl/ngx-csv';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
  {
    path: '',
    component: ClientsComponent,
    resolve: {
      datatables: ClientsService
    },
  },
];

@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    CoreCommonModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
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
