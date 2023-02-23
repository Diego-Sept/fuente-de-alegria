import { Injectable } from '@angular/core';
import _ from 'lodash'
import { HttpParams } from '@angular/common/http';
import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})
export class RestUtilitiesService {

  constructor(private dateService: DateService) { }

  formatQPs = (qps: {}): { param: string, value: string }[] => {
    return _.map(qps, (value, key): { param: string, value: string } => {
      if (value instanceof Date) value = this.dateService.formatDate(value);
      if (Array.isArray(value)) value = value.join(',');
      return {
        param: key,
        value: value?.toString()
      };
    });
  }

  createAndAppendQps = (qpsProcessed: { param: string, value: string }[]): HttpParams => {
    let queryParams = new HttpParams();
    qpsProcessed.forEach(qp => {
      queryParams = queryParams.append(qp.param, qp.value);
    })
    return queryParams;
  }

  appendQps = (qpsProcessed: { param: string, value: string }[], queryParams: HttpParams): HttpParams => {
    qpsProcessed.forEach(qp => {
      queryParams = queryParams.append(qp.param, qp.value);
    })
    return queryParams;
  }

}
