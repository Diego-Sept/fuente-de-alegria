import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FractionService } from 'app/core/services/fraction.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Fraction } from '../interface/fraction.interface';


@Component({
  selector: "app-fractions-view",
  templateUrl: "./fractions-view.component.html",
  styleUrls: ["./fractions-view.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class FractionsViewComponent implements OnInit, OnDestroy {
  // public
  public url = this.router.url;
  public lastValue;
  public data: Fraction;
  public baseUrl = `http://localhost:3000/fractions/`;
  public fractionId: number;

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {FractionService} _fractionService
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _fractionService: FractionService
  ) {
    this._unsubscribeAll = new Subject();
    this.lastValue = this.url.substr(this.url.lastIndexOf("/") + 1);
  }

  redirectToFractions(pageName: string) {
    this.router.navigate([`${pageName}`]);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.fractionId = +params["id"];
      this._fractionService
        .getFractionById(this.fractionId)
        .subscribe((response) => {
          this.data = response;
        });
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
