import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientListService } from '../client-list.service';
import { Contact } from '../../interface/client.interface';

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
    name: '',
    surname: '',
    identificationNumber:'',
    contacts: [{
      email: '',
      phone:'',
      mainContact: true
    }],
    adress: '',
    guestsQuantity: 0
  };

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {NgbModal} modalService
   */
  constructor(private _coreSidebarService: CoreSidebarService, private _clientListService: ClientListService,private modalService: NgbModal,private formBuilder: UntypedFormBuilder) {}

// getter for easy access to form fields
get ReactiveClientForm() {
  return this.ReactiveClientDetailsForm.controls;
}

ReactiveClientFormOnSubmit() {
  this.ReactiveClientFormSubmitted = true;
  // stop here if form is invalid
  if (this.ReactiveClientDetailsForm.invalid) {
    return console.log(this.ClientForm);;
  }
  this._clientListService.addClient(this.ClientForm).subscribe( resp => {
    console.log('Response', resp);
  })
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
    adress: ['', Validators.required],
    guestsQuantity: [ 0, [Validators.required, Validators.min(1)]]
  },
  );
  }
}
