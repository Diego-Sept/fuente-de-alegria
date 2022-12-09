import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { RouterModule } from '@angular/router';
import { CalendarEventSidebarComponent } from './calendar-sidebar/calendar-event-sidebar/calendar-event-sidebar.component';
import { CalendarMainSidebarComponent } from './calendar-sidebar/calendar-main-sidebar/calendar-main-sidebar.component';
import { FormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]);

const routes = [
  {
    path: '**',
    component: CalendarComponent,
    resolve: {
      data: CalendarService
    },
    data: { animation: 'calendar' }
  },
];

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarEventSidebarComponent,
    CalendarMainSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    CoreSidebarModule,
    FormsModule,
    Ng2FlatpickrModule,
    NgSelectModule,
    NgbModule,
    FullCalendarModule
  ],
  providers: [
    CalendarService
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
