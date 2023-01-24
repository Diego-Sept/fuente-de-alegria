import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'app/main/forms/form-validation/_helpers/must-match.validator';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { MyDataService } from './myData.service';


@Component({
  selector: 'app-myData',
  templateUrl: './myData.component.html',
  styleUrls: ['./myData.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyDataComponent implements OnInit, OnDestroy {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public rows;
  public currentRow;
  public tempRow;
  public avatarImage: string;
  public ReactiveMyDataDetailsForm: FormGroup;
  public ReactiveMyDataFormSubmitted = false;
  public mergedPwdShow = false;

  // Reactive User Details form data
  public MyDataForm = {
    userName: '',
    password: '',
    confPassword: '',
    fullname: '',
    dni:'',
    cuit: '',
    email: '',
    phoneNumber: '',
    userType: ''
  };

  public selectMultiLanguages = ['English', 'Spanish', 'French', 'Russian', 'German', 'Arabic', 'Sanskrit'];
  public selectMultiLanguagesSelected = [];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserEditService} _myDataService
   */
  constructor(private router: Router, private _myDataService: MyDataService, private formBuilder: UntypedFormBuilder) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  // getter for easy access to form fields
get ReactiveUserEditForm() {
  return this.ReactiveMyDataDetailsForm.controls;
}

ReactiveEditFormOnSubmit() {
  this.ReactiveMyDataFormSubmitted = true;
  // stop here if form is invalid
  if (this.ReactiveMyDataDetailsForm.invalid) {
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

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this._myDataService.onMyDataChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

      this.ReactiveMyDataDetailsForm = this.formBuilder.group({
        userName: ['', Validators.required],
        fullname: ['', Validators.required],
        dni: ['', [Validators.required]],
        cuit: ['', [Validators.required,Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confPassword: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', [Validators.required, Validators.minLength(4)]],
        userType: [ '', [Validators.required]]
      },
      {
        validator: MustMatch('password', 'confPassword')
      });
      

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
