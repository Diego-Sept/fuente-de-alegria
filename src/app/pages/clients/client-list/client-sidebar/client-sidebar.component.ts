import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html'
})
export class ClientSidebarComponent implements OnInit {


  public ReactiveClientDetailsForm: FormGroup;
  public ReactiveClientFormSubmitted = false;
  public mergedPwdShow = false;

  // Reactive User Details form data
  public ClientForm = {
    fullname: '',
    dni:'',
    email: '',
    phoneNumber: '',
    phoneNumber2: '',
    adress: '',
    guests: ''
  };

  
  
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {NgbModal} modalService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private modalService: NgbModal,private formBuilder: UntypedFormBuilder) {}

// getter for easy access to form fields
get ReactiveClientForm() {
  return this.ReactiveClientDetailsForm.controls;
}

ReactiveClientFormOnSubmit() {
  this.ReactiveClientFormSubmitted = true;
  // stop here if form is invalid
  if (this.ReactiveClientDetailsForm.invalid) {
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

  // ng-select in model
  modalSelectOpen(modalSelect) {
    this.modalService.open(modalSelect, {
      windowClass: 'modal'
    });
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  ngOnInit(): void {
  // Reactive form initialization
  this.ReactiveClientDetailsForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    dni: ['', [Validators.required]],  
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(4)]],
    phoneNumber2: ['', [Validators.required, Validators.minLength(4)]],
    adress: [ '', [Validators.required]],
    guests: [ '', [Validators.required]]
  },
  );
  }
}
