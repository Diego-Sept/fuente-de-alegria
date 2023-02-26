import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';


import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { cloneDeep } from 'lodash';
import { ClientEditService } from './client-edit.service';
import { Client, ClientDto, Contact, CreateClientDto } from '../interface/client.interface';
import { ClientService } from '../../../core/services/client.service';
import { ClientFacade } from 'app/core/facade/client.facade';
import Swal from 'sweetalert2';



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
	clientId: number;

	// Reactive User Details form data
	public ClientEditForm = {
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
	constructor(
		private router: Router,
		private clientFacade: ClientFacade,
		private clientService: ClientService,
		private activatedRoute: ActivatedRoute,
		private formBuilder: UntypedFormBuilder) {
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
			return console.log(this.ClientEditForm);
		}
		this.saveClient();
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

	saveClient() {
		let clientData: CreateClientDto = {
			name: this.ClientEditForm.name,
			surname: this.ClientEditForm.surname,
			guestsQuantity: this.ClientEditForm.guestsQuantity,
			identificationNumber: this.ClientEditForm.identificationNumber,
			address: this.ClientEditForm.address
		};

		let contacts: Contact[] = [];
		let mainContact: Contact = {
			name: this.ClientEditForm.contactName,
			email: this.ClientEditForm.email,
			phone: this.ClientEditForm.phone,
			mainContact: true
		}

		let secondaryContact: Contact = {
			name: this.ClientEditForm.contactName2,
			email: this.ClientEditForm.email2,
			phone: this.ClientEditForm.phone2,
			mainContact: false
		}

		contacts.push(mainContact);
		contacts.push(secondaryContact);

		let client: ClientDto = {
			clientData: clientData,
			contacts: contacts
		}

		this.clientFacade.updateClient(this.clientId, client).subscribe(_ => {
			Swal.fire({
				text: 'El cliente se creó exitosamente',
        		icon: 'success'
			}).then(dialog => {
				this.initForm();
				if (!!dialog.isConfirmed){
					this.redirectToClientList('clients');
				}
			})
		})
	}

	redirectToClientList(pageName: string) {
		this.router.navigate([`${pageName}`]);
	}

	// Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------
	/**
	 * On init
	 */
	ngOnInit(): void {

		this.activatedRoute.params.subscribe(params => {
			this.clientId = +params['id'];
			this.clientService.getClientById(this.clientId).subscribe(client => {
				this.ClientEditForm = {
					name: client.name,
					surname: client.surname,
					identificationNumber: client.identificationNumber,
					contactName: client.contacts[0].name,
					email: client.contacts[0].email,
					phone: client.contacts[0].phone,
					contactName2: client.contacts[1].name,
					email2: client.contacts[1].email,
					phone2: client.contacts[1].phone,
					address: client.address,
					guestsQuantity: client.guestsQuantity,
				}
			});
		});

		this.initForm();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	initForm() {
		// Reactive form initialization
		this.ReactiveClientEditFormSubmitted = false;
		this.ReactiveClientEditDetailsForm = this.formBuilder.group({
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
}
