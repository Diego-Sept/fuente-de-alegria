import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreCommonModule } from '@core/common.module';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ErrorComponent } from './error/error.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';



// routing
const routes: Routes = [
  {
    path: 'miscellaneous/coming-soon',
    component: ComingSoonComponent
  },
  {
    path: 'miscellaneous/not-authorized',
    component: NotAuthorizedComponent
  },
  {
    path: 'miscellaneous/maintenance',
    component: MaintenanceComponent
  },
  {
    path: 'miscellaneous/error',
    component: ErrorComponent
  }
];

@NgModule({
  declarations: [ComingSoonComponent, NotAuthorizedComponent, MaintenanceComponent, ErrorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CoreCommonModule]
})
export class MiscellaneousModule {}
