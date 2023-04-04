import { Injectable } from '@angular/core';
import { environment } from "environments/environment";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestUtilitiesService } from './rest-utilities.service';
import { CreateStoreDto, Store, StoreDto } from 'app/pages/stores/interface/stores.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoresService {
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private http: HttpClient, private restUtilitiesService: RestUtilitiesService) { }

  getStores(qps?): Observable<Store[]> {

    const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
    const queryParams: HttpParams = qps ? this.restUtilitiesService.createAndAppendQps(this.restUtilitiesService.formatQPs(qps)) : null;
    return this.http
        .get<any>(`${environment.apiUrl}/stores`, {
            headers: queryHeaders,
            observe: 'response',
            params: queryParams,
        })
        .pipe<any>(
            map<HttpResponse<any>, any>((response) => {
                return response.body;
            }),
        );
}

getStoreById(id): Observable<Store> {
  const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
  return this.http
      .get<any>(`${environment.apiUrl}/stores/${id}`, {
          headers: queryHeaders,
          observe: 'response',
      })
      .pipe<any>(
          map<HttpResponse<any>, any>((response) => {
              return response.body;
          }),
      );
}

postStore(store: CreateStoreDto): Observable<Store> {
  const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
  return this.http
      .post<any>(`${environment.apiUrl}/stores`, JSON.stringify(store), {
          headers: queryHeaders,
          observe: 'response',
      })
      .pipe<any>(
          map<HttpResponse<any>, any>((response) => {
              return response.body;
          }),
      );
}

deleteStore(id: number) {
  const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
  return this.http
      .delete<any>(`${environment.apiUrl}/stores/${id}`, {
          headers: queryHeaders,
          observe: 'response',
      })
      .pipe<any>(
          map<HttpResponse<any>, any>((response) => {
              return response;
          }),
      );
}

patchStore(id: number, storeDto: CreateStoreDto) {
  console.log("Entro acáaaa!!!");
  console.log("Ruta: " + `${environment.apiUrl}/stores/${id}`);
  console.log("Payload: ", JSON.stringify(storeDto));
  const queryHeaders = new HttpHeaders().append('Content-Type', 'application/json');
  return this.http
      .patch<any>(
          `${environment.apiUrl}/stores/${id}`,
          JSON.stringify(storeDto),
          {
              headers: queryHeaders,
              observe: 'response',
          },
      )
      .pipe<any>(
          map<HttpResponse<any>, any>((response) => {
              return response.body;
          }),
      );
}

}
