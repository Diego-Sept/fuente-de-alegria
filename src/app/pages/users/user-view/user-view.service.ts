import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable()
export class UserViewService implements Resolve<any> {
  public apiData: any;
  public onUserViewChanged: BehaviorSubject<any>;
  public baseUrl = `http://localhost:3000/users`;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onUserViewChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let currentId = Number(route.paramMap.get('id'));
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData(currentId)]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get API Datas
   */
  getApiData(id: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${ this.baseUrl }/${ id }`).subscribe((response: any) => {
        this.apiData = response;
        this.onUserViewChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  /**
   * Get User Id
   */
  getUserId(id: number): Observable<User>{
    return this._httpClient.get<User>(`${ this.baseUrl }/${id}`);
  }

}
