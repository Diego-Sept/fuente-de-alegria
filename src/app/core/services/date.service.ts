import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root',
})
export class DateService {
   constructor() { }

   public formatDate = (date: Date): string => {

      if (date !== null && date !== undefined) {
         const day = date.getDate();
         const month = date.getMonth() + 1;
         const year = date.getFullYear();
         return `${year}-${month <= 9 ? `0${month}` : month}-${day <= 9 ? `0${day}` : day}`;
      }
      return '-';
   };
}
