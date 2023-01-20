import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { MustMatch } from 'app/main/forms/form-validation/_helpers/must-match.validator';

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
    userName: '',
    password: '',
    confPassword: '',
    firstName: '',
    lastName: '',
    dni:'',
    cuit: '',
    email: '',
    phoneNumber: '',
    userType: ''
  };
  
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private formBuilder: UntypedFormBuilder) {}

// getter for easy access to form fields
get ReactiveUDForm() {
  return this.ReactiveUserDetailsForm.controls;
}

ReactiveUDFormOnSubmit() {
  this.ReactiveUDFormSubmitted = true;
  // stop here if form is invalid
  if (this.ReactiveUserDetailsForm.invalid) {
    return;
  }

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

  /**
   * Submit
   *
   * @param form
   */
  submit(form) {
    if (form.valid) {
      this.toggleSidebar('new-user-sidebar');
    }
  }

  ngOnInit(): void {
    // Reactive form initialization
  this.ReactiveUserDetailsForm = this.formBuilder.group({
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
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
  }
  );
  }
}
