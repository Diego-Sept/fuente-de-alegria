import { Injectable } from '@angular/core';
import { Store } from './interface/stores.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  public rows: any;
  public onStoreListChanged: BehaviorSubject<any>;
  public baseUrl = `http://localhost:3000/stores`;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onStoreListChanged = new BehaviorSubject({});
  }

    /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

   /**
   * Get rows
   */
   getDataTableRows(): Promise<Store[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<Store[]>(`${ this.baseUrl }`).subscribe((response: Store[]) => {
        this.rows = response;
        this.onStoreListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }


}
