import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client, ClientDto } from '../interface/client.interface';

@Injectable()
export class ClientListService implements Resolve<any> {
  public rows: Client[];
  public onClientListChanged: BehaviorSubject<any>;
  public baseUrl = `http://localhost:3000/clients` ;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onClientListChanged = new BehaviorSubject({});
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
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${ this.baseUrl }`).subscribe((response: Client[]) => {
        this.rows = response;
        this.onClientListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  /**
   * Add Client
   */
  addClient(client: ClientDto): Observable<Client>{
    return this._httpClient.post<Client>(`${ this.baseUrl }`, client);
  }

  /**
   * Delete Client
   */
  deleteClient(id: number): Observable<{}>{
    console.log("Se elimino el usuario");
    return this._httpClient.delete<{}>(`${ this.baseUrl }/${id}`);
  }
}
