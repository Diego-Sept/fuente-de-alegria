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
import { CoreSidebarModule } from '@core/components';

import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditService } from './user-edit/user-edit.service';
import { NewUserSidebarComponent } from './user-list/new-user-sidebar/new-user-sidebar.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListService } from './user-list/user-list.service';
import { UserViewComponent } from './user-view/user-view.component';
import { UserViewService } from './user-view/user-view.service';
import { UserService } from './user-service';

// routing
const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    resolve: {
      uls: UserListService
    },
  },
  {
    path: 'user-list',
    component: UserListComponent,
    resolve: {
      uls: UserListService
    },
    data: { animation: 'UserListComponent' }
  },
  {
    path: 'user-view/:id',
    component: UserViewComponent,
    resolve: {
      data: UserViewService,
    },
    data: { path: 'view/:id', animation: 'UserViewComponent' }
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    resolve: {
      ues: UserEditService
    },
    data: { animation: 'UserEditComponent' }
  },
  {
    path: 'user-view/',
    redirectTo: 'user-edit/:id' // Redirection
  },
  {
    path: 'user-edit',
    redirectTo: 'user-view/:id' // Redirection
  }
];

@NgModule({
  declarations: [UserListComponent, UserViewComponent, UserEditComponent, NewUserSidebarComponent],
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
    InvoiceModule,
    CoreSidebarModule,
  ],
  providers: [UserListService, UserViewService, UserEditService, UserService],
  exports: [
    UserEditComponent,
    UserListComponent,
    UserEditComponent,
    NewUserSidebarComponent,
  ]
})
export class UserModule {}
