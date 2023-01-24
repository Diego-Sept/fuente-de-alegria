import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientViewService } from './client-view.service';


@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientViewComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data;

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {ClientViewService} _clientViewService
   */
  constructor(private router: Router, private _clientViewService: ClientViewService) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  redirectToClientList(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._clientViewService.onClientViewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.data = response;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
