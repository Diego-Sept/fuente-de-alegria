import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'app/main/forms/form-validation/_helpers/must-match.validator';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { UserEditService } from './user-edit.service';
import { UserService } from '../user-service';
import { User } from '../interface/user.interface';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserEditComponent implements OnInit, OnDestroy {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public rows: User[] = [];
  public currentRow: User;
  public tempRow: User[];
  public ReactiveUserEditDetailsForm: FormGroup;
  public ReactiveUserEditFormSubmitted = false;
  public mergedPwdShow = false;

  // Reactive User Details form data
  public UserEditForm = {
    username: '',
    password: '',
    confPassword: '',
    fullname: '',
    dni:'',
    cuit: '',
    email: '',
    telephone: '',
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
   * @param {UserEditService} _userEditService
   */
  constructor(private router: Router,private _userService: UserService ,private _userEditService: UserEditService, private activatedRoute: ActivatedRoute, private formBuilder: UntypedFormBuilder) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  // getter for easy access to form fields
get ReactiveUserEditForm() {
  return this.ReactiveUserEditDetailsForm.controls;
}

ReactiveEditFormOnSubmit() {
  this.ReactiveUserEditFormSubmitted = true;
  // stop here if form is invalid
  if (this.ReactiveUserEditDetailsForm.invalid) {
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

  saveUser(){
    this._userEditService.editUser( this.UserEditForm ).subscribe( user => console.log( "Editando", user ));
   
  }
  
  redirectToUserList(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap( ({id}) => this._userEditService.getUserId(id))).subscribe( user => this.UserEditForm = user);

    this.ReactiveUserEditDetailsForm = this.formBuilder.group({
      username: ['', Validators.required],
      fullname: ['', Validators.required],
      dni: ['', [Validators.required]],
      cuit: ['', [Validators.required,Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confPassword: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.minLength(4)]],
      userType: [ '', [Validators.required]]
    },
    {
      validator: MustMatch('password', 'confPassword')
    });

    this._userEditService.onUserEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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
