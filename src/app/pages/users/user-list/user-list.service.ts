import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interface/user.interface';

@Injectable()
export class UserListService implements Resolve<any> {
  public rows: User[] = [];
  public onUserListChanged: BehaviorSubject<any>;
  public baseUrl = `http://localhost:3000/users` ;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onUserListChanged = new BehaviorSubject({});
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
  getDataTableRows(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get<User[]>(`${ this.baseUrl }/`).subscribe((response: User[]) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

    /**
   * Get User Id
   */
  getUserId(id: number): Observable<User>{
    return this._httpClient.get<User>(`${ this.baseUrl }/${id}`);
  }
  
  /**
   * Add User
   */
  addUser(user: User): Observable<User>{
    return this._httpClient.post<User>(`${ this.baseUrl }`, user);
  }

  /**
   * Delete User
   */
  deleteUser(id: string): Observable<{}>{
    console.log("Se elimino el usuario");
    return this._httpClient.delete<{}>(`${ this.baseUrl }/${id}`);
  }

  /* GET users whose name contains search term */
searchUsername(term: string): Observable<User[]> {
  if (!term.trim()) {
    // if not search term, return empty user array.
    return of([]);
  }
  return this._httpClient.get<User[]>(`${this.baseUrl}/?username=${term}`);
}


}
