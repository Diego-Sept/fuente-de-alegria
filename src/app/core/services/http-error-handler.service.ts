import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { ROUTES } from '../enums/routes';
import { BehaviorSubject, Observable } from 'rxjs';
import { RootFacade } from 'src/app/abstraction/root.facade';

@Injectable({
   providedIn: 'root',
})
export class HttpErrorHandlerService {
   private _outOfService = new BehaviorSubject<boolean>(false);
   constructor(private rootFacade: RootFacade, private authService: AuthenticationService, private router: Router) { }

   handleError(httpErrorResponse: HttpErrorResponse) {
      let message: string;
      // aca obtengo si es /login
      // console.log(httpErrorResponse);

      switch (httpErrorResponse.status) {
         case 400: // Bad Request (Business Error)
            message = httpErrorResponse.error.error.message;
            // Show the message in the component from where the call came
            break;
         case 401: // Unauthorized
            this.authService.removeCurrentUser();
            this.rootFacade.cleanStore();
            this.router.navigate([ROUTES.LOGIN]);
            // if (
            //    !!this.authService.userValue &&
            //    !!this.authService.userValue.token &&
            //    !!this.authService.userValue.token.accessToken
            // ) {
            //    console.log('entro')
            //    this.authService.removeCurrentUser();
            //    this.router.navigate([ROUTES.LOGIN]);
            //    this.authService.logout().subscribe(
            //       () => { },
            //       (err) => { },
            //    );
            // } else {
            //    this.authService.removeCurrentUser();

            //    this.router.navigate([ROUTES.LOGIN]);
            // }
            if (!!httpErrorResponse.error.error && httpErrorResponse.error.error.message.includes('Su ses')) {
               message = 'Su sesión ha expirado';
            } else {
               message = !!httpErrorResponse.error.error
                  ? httpErrorResponse.error.error.message
                  : 'Su sesión ha expirado';
            }
            break;
         case 403: // Forbidden
            message = !!httpErrorResponse.error.error
               ? httpErrorResponse.error.error.message
               : 'Acceso prohibido';
            break;
         case 404: // Not Found
            message = 'Póngase en contacto con su administrador ya que ocurrió un error'
            // message = 'Recurso no encontrado'
            // console.log('entro');

            // TO DO
            break;
         case 409: // Conflict
            message = httpErrorResponse.error.error.message;
            // Show the message in the component from where the call came
            break;
         case 418:
            // Nothing to do
            // In this case set message with swal inside affected component
            break;
         case 422: // Unprocessable Entity (parameters invalid)
            // Check how does the response comes
            message = httpErrorResponse.error.error.message;
            // Show the response in the appropiate form fields
            break;
         case 500: // Internal Server Error
            message = 'Póngase en contacto con su administrador ya que ocurrió un error'
            // Show a message telling that the server had a problem
            // TO DO
            // message = 'Error en el servidor, reinténtelo más tarde';
            // Redirect the user to HOME
            // router.navigate([Routes.LOGIN]);
            break;
         case 504:
            if (this.router.url !== '/login') {
               this.authService.logout().subscribe(
                  () => {
                     this.router.navigate([ROUTES.LOGIN]);
                  },
                  (err) => {
                     this.router.navigate([ROUTES.LOGIN]);
                  },
               );
            }
            // TODO: activar bandera de outOfService
            this.setOutOfService(true);
            message = 'Plataforma temporalmente fuera de servicio';
         // TODO: Buscar que error va a tirar, es 0?
         default:

            // Any other possible error status
            message = 'Ha ocurrido un error'
            break;
      }
      return message;
   }

   isOutOfService(): Observable<boolean> {
      return this._outOfService.asObservable();
   }

   setOutOfService(value: boolean) {
      this._outOfService.next(value);
   }
}
