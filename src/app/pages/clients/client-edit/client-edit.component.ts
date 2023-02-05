import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';


import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { ClientEditService } from './client-edit.service';



@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientEditComponent implements OnInit, OnDestroy {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public rows;
  public currentRow;
  public tempRow;
  public ReactiveClientEditDetailsForm: FormGroup;
  public ReactiveClientEditFormSubmitted = false;

    // Reactive User Details form data
    public ClientEditForm = {
      name: '',
      surname: '',
      identificationNumber:'',
      contacts: [{
        email: '',
        phone:'',
        mainContact: true
      }],
      guestsQuantity: 0
    };

  public birthDateOptions: FlatpickrOptions = {
    altInput: true
  };

  public selectMultiLanguages = ['English', 'Spanish', 'French', 'Russian', 'German', 'Arabic', 'Sanskrit'];
  public selectMultiLanguagesSelected = [];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserEditService} _userEditService
   */
  constructor(private router: Router, private _clientEditService: ClientEditService, private activatedRoute: ActivatedRoute,private formBuilder: UntypedFormBuilder) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  // getter for easy access to form fields
get ReactiveClientEditForm() {
  return this.ReactiveClientEditDetailsForm.controls;
}

  ReactiveClientEditFormOnSubmit() {
    this.ReactiveClientEditFormSubmitted = true;
    // stop here if form is invalid
    if (this.ReactiveClientEditDetailsForm.invalid) {
      return;
    }
  }

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      console.log('Submitted...!');
    }
  }

  saveClient(){
    this._clientEditService.editClient( this.ClientEditForm ).subscribe( client => console.log( "Editando", client ));
   
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

    this.activatedRoute.params.pipe(switchMap( ({id}) => this._clientEditService.getClientId(id))).subscribe( user => this.ClientEditForm = user);

    this._clientEditService.onUserEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

      this.ReactiveClientEditDetailsForm = this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        identificationNumber: ['', [Validators.required]],  
        contacts: [
          {
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.minLength(4)]],
            mainContact: ['', [Validators.required]],
          }
        ],
        guestsQuantity: [ 0, [Validators.required, Validators.min(1)]]
      },
      );

      this.rows = response;
      this.rows.map(row => {
        if (row.id == this.urlLastValue) {
          this.currentRow = row;
          this.tempRow = cloneDeep(row);
        }
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
