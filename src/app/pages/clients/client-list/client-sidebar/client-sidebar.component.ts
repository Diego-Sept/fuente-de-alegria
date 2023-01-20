import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { MustMatch } from 'app/main/forms/form-validation/_helpers/must-match.validator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html'
})
export class ClientSidebarComponent implements OnInit {


  public ReactiveUserDetailsForm: FormGroup;
  public ReactiveUDFormSubmitted = false;
  public mergedPwdShow = false;

  // Reactive User Details form data
  public UDForm = {
    fullname: '',
    dni:'',
    email: '',
    phoneNumber: '',
    phoneNumber2: '',
    adress: '',
    guests: ''
  };

  // select Basic Multi
  public selectMulti: Observable<any[]>;
  public selectMultiSelected = [{ name: 'Karyn Wright' }];
  
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

  this.toggleSidebar('client-sidebar');
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
      this.toggleSidebar('client-sidebar');
    }
  }

  ngOnInit(): void {
    // Reactive form initialization
  this.ReactiveUserDetailsForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    dni: ['', [Validators.required]],  
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(4)]],
    phoneNumber2: ['', [Validators.required, Validators.minLength(4)]],
    adress: [ '', [Validators.required]],
    guests: [ '', [Validators.required]]
  },
  {
    validator: MustMatch('password', 'confPassword')
  }
  );
  }
}
