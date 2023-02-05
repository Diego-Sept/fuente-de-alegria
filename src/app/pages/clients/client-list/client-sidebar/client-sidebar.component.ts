import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientListService } from '../client-list.service';
import { Client, Contact, CreateClientDto, ClientDto } from '../../interface/client.interface';

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
    contactName: '',
    email: '',
    phone: '',
    contactName2: '',
    email2: '',
    phone2: '',
    address: '',
    guests: 1
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
    return console.log(this.ClientForm);
  }
  let clientData : CreateClientDto = {
    name: this.ClientForm.name,
    surname: this.ClientForm.surname,
    guestsQuantity: this.ClientForm.guests,
    identificationNumber: this.ClientForm.identificationNumber,
    address: this.ClientForm.address,
  };

  let contacts: Contact[] = [];
  let mainContact : Contact = {
    name: this.ClientForm.contactName,
    email: this.ClientForm.email,
    phone: this.ClientForm.phone,
    mainContact: true
  }

  let secondaryContact : Contact = {
    name: this.ClientForm.contactName,
    email: this.ClientForm.email,
    phone: this.ClientForm.phone,
    mainContact: false
  }  
  
  contacts.push(mainContact);
  contacts.push(secondaryContact);

  let client : ClientDto = {
    clientData: clientData,
    contacts: contacts,
    roleId: 2
  }


  console.log("Cliente a enviar: ", client);

  this._clientListService.addClient(client).subscribe( resp => {
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
      contactName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(4)]],
      contactName2: ['', [Validators.required]],
      email2: ['', [Validators.required, Validators.email]],
      phone2: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', Validators.required],
      guests: [ 1, [Validators.required, Validators.min(1)]]
    });
  }
}
