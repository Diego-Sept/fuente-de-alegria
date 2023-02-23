import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Address } from 'src/app/shared/models/address';
import { MatDialog } from '@angular/material/dialog';
import { MoreInfoComponent } from 'src/app/shared/components/more-info/more-info.component';
import * as moment from 'moment';
import { CalendarView } from 'angular-calendar';
import { DateService } from './date.service';
import { HttpBaseResponseErrorTeaPot } from '../../shared/models/httpBaseResponseErrorTeaPot';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ROUTES } from '../enums/routes';

export interface GoBack {
   title: string,
   route: string
}

export interface ButtonsNewDateScheduleNavigator {
   buttonLeftDisabled: boolean,
   buttonRightDisabled: boolean,
   dateToSetCalendar: Date
}
@Injectable({
   providedIn: 'root',
})
export class GeneralService {
   private _message = new Subject<string>();
   private goBack$ = new BehaviorSubject<GoBack>(null);
   public sideNavState$: BehaviorSubject<boolean> = new BehaviorSubject(false);
   private disabledBtnsPeriodSelector$: BehaviorSubject<boolean> = new BehaviorSubject(false);

   constructor(
      private dialogRef: MatDialog,
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer,
      private dateService: DateService
   ) { }

   getMessage(): Observable<string> {
      return this._message.asObservable();
   }

   getNavStateValue(): boolean {
      return this.sideNavState$.getValue();
   }

   sendMessage(message: string) {
      console.log("Enviando mensaje: ", message);
      this._message.next(message);
   }

   clearMessage() {
      this._message.next();
   }

   getGoBack$(): Observable<GoBack> {
      return this.goBack$.asObservable();
   }

   setGoBack(goBack?: GoBack) {
      this.goBack$.next(goBack);
   }

   getGoBack(): GoBack {
      return this.goBack$.value
   }

   getDayName = (date: Date): string => {
      let day = '';
      switch (date.getDay()) {
         case 0:
            day = 'Domingo';
            break;
         case 1:
            day = 'Lunes';
            break;
         case 2:
            day = 'Martes';
            break;
         case 3:
            day = 'Miércoles';
            break;
         case 4:
            day = 'Jueves';
            break;
         case 5:
            day = 'Viernes';
            break;
         case 6:
            day = 'Sábado';
            break;
      }
      return day;
   };

   getRandomColor(): string {
      var color = Math.floor(0x1000000 * Math.random()).toString(16);
      return '#' + ('000000' + color).slice(-6);
   }

   addIcon(nameIcon: string, fileName: string) {


      this.matIconRegistry.addSvgIcon(
         nameIcon,
         this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/' + fileName)
      )
   }

   sanitizeUrl(url) {
      return this.domSanitizer.bypassSecurityTrustUrl(url);
   }

   getSummarizeString(str: string, maxLength: number): string {
      return !!str && str.toString().length > maxLength ?
         `${str.slice(0, maxLength - 3)}...`
         :
         str;
   }

   public getLinkMap(address: Address): string {
      let link = 'https://www.google.com/maps/place/';
      if (!!address) {
         link += address.street ? address.street : '';
         link += ' ' + (address.streetNumber ? address.streetNumber : '');
         link += ',' + (address.location && address.location.name ? address.location.name : '');
         link += ',' + (address.location && address.location.province && address.location.province.name ? address.location.province.name : '');
      }
      return link;
   }

   /**
    * This method is used as argument of the sort (array) function
    * @param propName Property name of the object
    * Example: arr.sort(by('height'));
    */
   public by(propName: string) {
      return function (a, b) {
         return a[propName] - b[propName];
      }
   }

   public normalizeString(str: string): string {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
   }

   public closeAllDialogs() {
      this.dialogRef.closeAll();
   }

   public stringIsNumber(value: string): RegExpMatchArray {
      var numbers = /^[0-9]+$/;
      return value.match(numbers);
   }

   public getSubdomain(index = 0): string {
      const full = window.location.hostname;
      const parts = full.split('.');
      let subdomain;
      if (!!parts[index] && parts[index] != 'www') {
         subdomain = parts[index]
      } else {
         index += 1;
         if (!!parts[index]) {
            subdomain = parts[index]
         }
      }
      return subdomain || '';
   }

   static cuilValidator(cuil: string): boolean {
      if (cuil.length !== 11) {
         return false;
      }

      const [checkDigit, ...rest] = cuil
         .split('')
         .map(Number)
         .reverse();

      const total = rest.reduce(
         (acc, cur, index) => acc + cur * (2 + (index % 6)),
         0,
      );

      const mod11 = 11 - (total % 11);

      if (mod11 === 11) {
         return checkDigit === 0;
      }

      if (mod11 === 10) {
         return false;
      }

      return checkDigit === mod11;
   }

   // a and b are javascript Date objects
   dateDiffInDays(a: Date, b: Date) {
      const _MS_PER_DAY = 1000 * 60 * 60 * 24;
      // Discard the time and time-zone information.

      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      return Math.floor((utc2 - utc1) / _MS_PER_DAY);
      // return 9;
   }

   dateDiffInMinutes(a: Date, b: Date) {
      const _MS_PER_MINUTE = 1000 * 60;
      // Discard the time and time-zone information.

      const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes());
      const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate(), b.getHours(), b.getMinutes());
      return Math.floor((utc2 - utc1) / _MS_PER_MINUTE);
      // return 9;
   }


   isObject(obj): boolean {
      return Object.prototype.toString.call(obj) === '[object Object]';
   }

   compareObjects(obj1, obj2) {

      if (!obj1 || !obj2)
         return false;

      let keys1 = Object.keys(obj1);
      let keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) return false;

      for (let key of keys1) {
         let val1 = obj1[key];
         let val2 = obj2[key];
         let areObjects = this.isObject(val1) && this.isObject(val2);

         if ((areObjects && !this.compareObjects(val1, val2)) || (!areObjects && val1 !== val2))
            return false;
      }
      return true;
   }

   calculateColor(cant: number, total: number) {

      // 0:                Verde    #21a35c
      // 1 a 10%:          Amarillo #ffb800
      // 10% a 20%:        Naranja  #FF5F3C
      // 20% o superior:   Rojo     red

      if (!(total > 0))
         return '#21A35C' // Save div by zero

      const porcentage = cant / total * 100

      switch (true) {
         case porcentage == 0:
            return '#21A35C';

         case porcentage > 1 && porcentage <= 10:
            return '#FFB800';

         case porcentage > 10 && porcentage <= 20:
            return '#FF5F3C';

         case porcentage > 20:
            return 'red';

         default:
            return 'red'
      }
   }

   public showMoreInfoSideBarRight(title: string, template: TemplateRef<any>) {

      const dialogRef = this.dialogRef.open(MoreInfoComponent, {
         data: { template, title },
         position: { top: '0', right: '0' },
         height: '100%', minWidth: '27%',
         panelClass: 'custom-modalbox-more-info-side-bar-right',
         disableClose: false,
         autoFocus: false,
         // hasBackdrop: false,
      })
   }

   getCurrentMonthFirst() {
      var date = new Date();
      date.setDate(1);
      date.setHours(0);
      return date;
   }

   getCurrentMonthLast() {
      var date = new Date();
      var currentMonth = date.getMonth();
      var nextMonth = ++currentMonth;
      let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
      return moment(nextMonthFirstDay).subtract(1, 'days');
   }

   getFirstDayOfMonth(date: Date) {
      date.setDate(1);
      date.setHours(0);
      return date;
   }

   getLastDayOfMonth(date: Date) {
      var currentMonth = date.getMonth();
      var nextMonth = ++currentMonth;
      let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
      return moment(nextMonthFirstDay).subtract(1, 'days');
   }

   validateDateBetween(from, to, check) {
      let fDate, tDate, cDate;
      fDate = Date.parse(from);
      tDate = Date.parse(to);
      cDate = Date.parse(check);
      if ((!!tDate && cDate <= tDate && cDate >= fDate) || (!tDate && cDate >= fDate))
         return true
      return false;
   }


   private controlDisabledPreviousButton(dateFromCalendar: Date, dateFrom: Date): boolean {
      dateFromCalendar = moment(moment(dateFromCalendar).format('YYYY-MM-DD')).toDate();
      return moment(dateFromCalendar).isSameOrBefore(moment(dateFrom).toDate());
   }

   private controlDisabledNextButton(dateFromCalendar: Date, dateTo: Date): boolean {
      dateFromCalendar = moment(moment(dateFromCalendar).format('YYYY-MM-DD')).toDate();
      return moment(dateFromCalendar).isSameOrAfter(moment(dateTo).toDate());
   }

   controlCalendarView( startDate:Date, endDate:Date, view:CalendarView, dateFromCalendar?: Date ): ButtonsNewDateScheduleNavigator {

      let buttonLeftDisabled: boolean = true;
      let buttonRightDisabled: boolean = true;
      let dateToSetCalendar: Date;

      switch (view) {
         case CalendarView.Month:
            dateToSetCalendar = !!dateFromCalendar ? dateFromCalendar : startDate;
            buttonLeftDisabled = this.controlDisabledPreviousButton(dateToSetCalendar, startDate);
            buttonRightDisabled = this.controlDisabledNextButton(moment(dateToSetCalendar).endOf('M').toDate(), endDate)
            break;

         case CalendarView.Week:
            if (!dateFromCalendar) {
               if (this.dateService.isCalendarMonth(startDate, endDate) && moment(startDate).month() == moment().month()) {
                  dateToSetCalendar = moment().toDate();
               } else {
                  dateToSetCalendar = moment(startDate).startOf('isoWeek').toDate();
               }
            } else {
               dateToSetCalendar = moment(dateFromCalendar).startOf('isoWeek').toDate();
            }
            buttonLeftDisabled = this.controlDisabledPreviousButton(dateToSetCalendar, startDate);
            buttonRightDisabled = this.controlDisabledNextButton(moment(dateToSetCalendar).endOf('isoWeek').toDate(), endDate)
            break;

         case CalendarView.Day:
            if (!dateFromCalendar) {
               if (this.dateService.isCalendarMonth(startDate, endDate) && moment(startDate).month() == moment().month()) {
                  dateToSetCalendar = moment().toDate();
               } else {
                  dateToSetCalendar = startDate
               }
            } else {
               dateToSetCalendar = dateFromCalendar;
            }
            buttonLeftDisabled = this.controlDisabledPreviousButton(moment(dateToSetCalendar).toDate(), startDate);
            buttonRightDisabled = this.controlDisabledNextButton(moment(dateToSetCalendar).toDate(), endDate)
            break;

         default:
            break;
      }
      return { buttonLeftDisabled, buttonRightDisabled, dateToSetCalendar }
   }

   // Period selector
   getDisabledBtnsPeriodSelector$(): Observable<boolean> {
      return this.disabledBtnsPeriodSelector$.asObservable();
   }

   setDisabledBtnsPeriodSelector( disabled: boolean ) {
      this.disabledBtnsPeriodSelector$.next( disabled );
   }

   /**
    * Show http status code = 418
    */
   processErrorTeaPot( errorContent: HttpBaseResponseErrorTeaPot, fx:any, msgType?: SweetAlertIcon ): Promise<boolean> {

      return new Promise( (res, rej) => {
         let swalWithCustomizeButtons = Swal.mixin({
            customClass: {
             confirmButton: 'btnSwalConfirm',
             cancelButton: 'btnSwalCancel'
            },
            buttonsStyling: true
         })
   
         if ( !errorContent.data.force ) {
            swalWithCustomizeButtons.fire({
               title: errorContent.message,
               icon: !!msgType ? msgType : 'error',
               html: fx(errorContent.data.message)
            }).then( _ => {
               res(false)
            });
         } else {
            swalWithCustomizeButtons.fire({
               title: errorContent.message,
               icon: 'question',
               html: fx(errorContent.data.message),
               showCancelButton: true,
               confirmButtonText: 'CONFIRMAR',
               cancelButtonText: 'CANCELAR',
               reverseButtons: true
             }).then( result => {
               res(result.isConfirmed);
            })
         }
      })
   }

   checkRouteGoToAdmissions( actualUrl: string ): string {
      return ROUTES.ADMISSIONS_LIST === actualUrl ? ROUTES.ADMISSIONS_LIST : ROUTES.ADMISSIONS;
   }
}