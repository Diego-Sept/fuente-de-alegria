import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FractionFacade } from 'app/core/facade/fraction.facade';
import { FractionService } from 'app/core/services/fraction.service';
import Swal from 'sweetalert2';
import { CreateFractionDto } from '../interface/fraction.interface';
import { Client } from 'app/pages/clients/interface/client.interface';
import { ClientService } from 'app/core/services/client.service';


@Component({
	selector: 'app-fractions-sidebar',
	templateUrl: './fractions-sidebar.component.html'
})
export class FractionsSidebarComponent implements OnInit {

	public clients: Client[];
	public fullname;
	public clientsSelected;
	public ReactiveFractionDetailsForm: FormGroup;
	public ReactiveFractionFormSubmitted = false;
	public mergedPwdShow = false;

    @Input() fractionId: number;

	// Reactive User Details form data
	public FractionForm = {
		name: '',
		clients: []
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
		private fractionFacade: FractionFacade,
        private fractionsService: FractionService,
		private clientService: ClientService
	) { }

	// getter for easy access to form fields
	get ReactiveFractionForm() {
		return this.ReactiveFractionDetailsForm.controls;
	}

	ReactiveFractionFormOnSubmit() {
		this.ReactiveFractionFormSubmitted = true;
		// stop here if form is invalid
		if (this.ReactiveFractionDetailsForm.invalid) {
			return console.log(this.FractionForm);
		}
		let fractionData: CreateFractionDto = {
			name: this.FractionForm.name,
			clients: this.clientsSelected
		};

        if (!!this.fractionId) {
            this.fractionFacade.updateFraction(this.fractionId, fractionData).subscribe(_ => {
                Swal.fire({
                    text: 'El grupo de clientes se actualizó exitosamente',
                    icon: 'success'
                })
                this.fractionId = undefined;
                this.initForm();
            })
        } else {
            this.fractionFacade.addFraction(fractionData).subscribe(_ => {
                Swal.fire({
                    text: 'El grupo de clientes se creó exitosamente',
                    icon: 'success'
                })
                this.initForm();
            })
        }
        
        this.toggleSidebar(this.toggleIfIsUpdating());
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
		this.ReactiveFractionFormSubmitted = false;
		this.ReactiveFractionDetailsForm = this.formBuilder.group({
			name: ['', Validators.required],
			clients: ['', Validators.required]
		});
	}

	// Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */

	ngOnInit(): void {
		
		this.clientService.getClients().toPromise().then(clients => {
			this.clients = clients.map(client => {
				return {
					"id": client.id,
					"name": client.name,
					"surname": client.surname,
					"identificationNumber": client.identificationNumber,
					"contacts": client.contacts,
					"guestsQuantity": client.guestsQuantity,
					"user": client.user,
					"address": client.address,
					"fullname": client.name + ' ' + client.surname
				}
			})

		})

		this.initForm();
	}

    ngOnChanges(changes: SimpleChanges){
        if ( !!this.fractionId ){
			this.fractionsService.getFractionById(this.fractionId).subscribe(fraction => {
				this.FractionForm = {
					name: fraction.name,
					clients: this.clients
				}

				this.clientsSelected = fraction.clients;
			});
		}
    }

    toggleIfIsUpdating(){
        return (!!this.fractionId) ? "fractions-edit-sidebar" : "fractions-sidebar";
    }
}
