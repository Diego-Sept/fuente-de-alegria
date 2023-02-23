import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AlertErrorComponent } from 'src/app/shared/components/utils/alert-error/alert-error.component';

@Injectable({
   providedIn: 'root',
})
export class AlertService {

   horizontalPosition: MatSnackBarHorizontalPosition = 'center';
   verticalPosition: MatSnackBarVerticalPosition = 'top';

   constructor( private _alertError: MatSnackBar ) {}

   openError( message: string ) {

      // Custom config to ERROR
      let config = new MatSnackBarConfig();
      config.data = { message, icon:'error' };
      config.duration = 5000;
      config.panelClass = ['mat-snack-bar-container-error'];
      config.horizontalPosition = this.horizontalPosition;
      config.verticalPosition = this.verticalPosition;

      this._alertError.openFromComponent(AlertErrorComponent, config);
   }

   openInfo( message: string ) {

      // Custom config to INFO
      let config = new MatSnackBarConfig();
      config.data = { message:message, icon:'info' };
      config.duration = 5000;
      config.panelClass = ['mat-snack-bar-container-info'];
      config.horizontalPosition = this.horizontalPosition;
      config.verticalPosition = this.verticalPosition;

      this._alertError.openFromComponent(AlertErrorComponent, config);
   }
}