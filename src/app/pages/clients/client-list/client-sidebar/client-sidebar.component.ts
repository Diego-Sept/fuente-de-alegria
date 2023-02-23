import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client, Contact, CreateClientDto, ClientDto } from '../../interface/client.interface';
import { ClientFacade } from '../../../../core/facade/client.facade';
import Swal from 'sweetalert2';
import { forwardRef } from 'preact/compat';
import { CoreTouchspinComponent } from '@core/components/core-touchspin/core-touchspin.component';

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
		identificationNumber: '',
		contactName: '',
		email: '',
		phone: '',
		contactName2: '',
		email2: '',
		phone2: '',
		address: '',
		guestsQuantity: 1
	};

	/**
	 * Constructor
	 *
	 * @param {CoreSidebarService} _coreSidebarService
	 * @param {NgbModal} modalService
	 */
	constructor(
		private _coreSidebarService: CoreSidebarService,
		private modalService: NgbModal,
		private formBuilder: UntypedFormBuilder,
		private clientFacade: ClientFacade
	) { }

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
		let clientData: CreateClientDto = {
			name: this.ClientForm.name,
			surname: this.ClientForm.surname,
			guestsQuantity: this.ClientForm.guestsQuantity,
			identificationNumber: this.ClientForm.identificationNumber,
			address: this.ClientForm.address,
		};

		let contacts: Contact[] = [];
		let mainContact: Contact = {
			name: this.ClientForm.contactName,
			email: this.ClientForm.email,
			phone: this.ClientForm.phone,
			mainContact: true
		}

		let secondaryContact: Contact = {
			name: this.ClientForm.contactName,
			email: this.ClientForm.email,
			phone: this.ClientForm.phone,
			mainContact: false
		}

		contacts.push(mainContact);
		contacts.push(secondaryContact);

		let client: ClientDto = {
			clientData: clientData,
			contacts: contacts,
			roleId: 2
		}

		console.log("Cliente a enviar: ", client);

		this.clientFacade.addClient(client).subscribe(_ => {
			Swal.fire({
				text: 'El cliente se creó exitosamente',
        		icon: 'success'
			})
			this.initForm();
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

	initForm(){
		// Reactive form initialization
		this.ReactiveClientFormSubmitted = false;
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
			guestsQuantity: [1, [Validators.required, Validators.min(1)]]
		});
	}


	// Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */

	ngOnInit(): void {
		this.initForm();
	}
}
