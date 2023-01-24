import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { MustMatch } from 'app/main/forms/form-validation/_helpers/must-match.validator';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-new-user-sidebar',
  templateUrl: './new-user-sidebar.component.html'
})
export class NewUserSidebarComponent implements OnInit {


  public ReactiveUserDetailsForm: FormGroup;
  public ReactiveUDFormSubmitted = false;
  public mergedPwdShow = false;

  // Reactive User Details form data
  public UDForm = {
    username: '',
    password: '',
    confPassword: '',
    fullname: '',
    dni: '',
    cuit: '',
    email: '',
    telephone: '',
    userType: ''
  };
  
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private userService: UserListService, private formBuilder: UntypedFormBuilder) {}

// getter for easy access to form fields
get ReactiveUDForm() {
  return this.ReactiveUserDetailsForm.controls;
}

ReactiveUDFormOnSubmit() {
  this.ReactiveUDFormSubmitted = true;
  // stop here if form is invalid
  if (this.ReactiveUserDetailsForm.invalid) {
    return console.log(this.UDForm);;
  }
  this.userService.addUser(this.UDForm).subscribe( resp => {
    console.log('Response', resp);
  })
  this.toggleSidebar('new-user-sidebar');
}
  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  ngOnInit(): void {
    // Reactive form initialization
  this.ReactiveUserDetailsForm = this.formBuilder.group({
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
  }
  );

  }
}
