import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR, MinValidator } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BudgetFacade } from 'app/core/facade/budget.facade';
import { BudgetService } from 'app/core/services/budget.service';
import Swal from 'sweetalert2';
import { Client } from 'app/pages/clients/interface/client.interface';
import { ClientService } from 'app/core/services/client.service';
import { CreateBudgetDto, Budget } from '../interface/budget.interface';
import { FractionService } from 'app/core/services/fraction.service';
import { Fraction } from 'app/pages/fraction/interface/fraction.interface';
import { Saloon } from 'app/pages/saloons/interfaces/saloons.interface';
import { EventType } from 'app/pages/event-types/interfaces/eventTypes.interface';
import { min } from 'rxjs/operators';


@Component({
	selector: 'app-budgets-sidebar',
	templateUrl: './budgets-sidebar.component.html'
})
export class BudgetsSidebarComponent implements OnInit {
	//  Decorator
	@ViewChild('startDatePicker') startDatePicker;
	@ViewChild('endDatePicker') endDatePicker;
	@Input() budgetId: number;

	public clients: Client[];
	public fraction: Fraction[];
	public saloon: Saloon[];
	public eventType: EventType[];
	public fullname;
	public clientsSelected;
	public fractionSelected;
	public saloonSelected;
	public eventTypeSelected;
	public ReactiveBudgetDetailsForm: FormGroup;
	public ReactiveBudgetFormSubmitted = false;
	public mergedPwdShow = false;
	public startDateOptions = {
		altInput: true,
		mode: 'single',
		altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
		enableTime: true
	  };
	  public endDateOptions = {
		altInput: true,
		mode: 'single',
		altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
		enableTime: true
	  };

	// Reactive User Details form data
	public BudgetForm = {
		stateId: 0,
		title: '',
		client: [],
		fraction: [] ,
		amount: 0, 
		saloon: [],
		eventType: [],
		startDate: new Date,
		endDate: new Date,
		observations: ''
	}
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
		private budgetFacade: BudgetFacade,
        private budgetsService: BudgetService,
		private clientService: ClientService,
		private fractionService: FractionService
	) { }

	// getter for easy access to form fields
	get ReactiveBudgetForm() {
		return this.ReactiveBudgetDetailsForm.controls;
	}

	ReactiveBudgetFormOnSubmit() {
		this.ReactiveBudgetFormSubmitted = true;
		// stop here if form is invalid
		if (this.ReactiveBudgetDetailsForm.invalid) {
			return console.log(this.BudgetForm);
		}
		let budgetData: CreateBudgetDto = {
			stateId: this.BudgetForm.stateId,
			title: this.BudgetForm.title,
			client: this.clientsSelected,
			fraction: this.fractionSelected ,
			amount: this.BudgetForm.amount , 
			saloon: this.saloonSelected,
			eventType: this.eventTypeSelected,
			startDate: this.startDatePicker.flatpickrElement.nativeElement.children[0].value,
			endDate: this.endDatePicker.flatpickrElement.nativeElement.children[0].value,
			observations: this.BudgetForm.observations
		};

        if (!!this.budgetId) {
            this.budgetFacade.updateBudget(this.budgetId, budgetData).subscribe(_ => {
                Swal.fire({
                    text: 'El grupo de clientes se actualizó exitosamente',
                    icon: 'success'
                })
                this.budgetId = undefined;
                this.initForm();
            })
        } else {
            this.budgetFacade.addBudget(budgetData).subscribe(_ => {
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
		this.ReactiveBudgetFormSubmitted = false;
		this.ReactiveBudgetDetailsForm = this.formBuilder.group({
			title: ['', Validators.required],
			clients: ['', Validators.required],
			fractions:  ['', Validators.required],
			amount:  ['', Validators.required],
			saloons:  ['', Validators.required],
			eventType:  ['', Validators.required],
			startDate: ['', Validators.required],
			endDate:  ['', Validators.required],
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

		});

		this.initForm();
	}

    ngOnChanges(changes: SimpleChanges){
        if ( !!this.budgetId ){
			this.budgetsService.getBudgetById(this.budgetId).subscribe(budget => {
				this.BudgetForm = {
					stateId: this.BudgetForm.stateId,
					title: this.BudgetForm.title,
					client: this.clients,
					fraction: this.fraction ,
					amount: this.BudgetForm.amount , 
					saloon: this.saloon,
					eventType: this.saloon,
					startDate: this.startDatePicker.flatpickrElement.nativeElement.children[0].value,
					endDate: this.endDatePicker.flatpickrElement.nativeElement.children[0].value,
					observations: this.BudgetForm.observations
				}

				this.clientsSelected = budget.client;
				this.fractionSelected = budget.fraction;
				this.saloonSelected = budget.saloon;
				this.eventTypeSelected = budget.eventType;

			});
		}
    }

    toggleIfIsUpdating(){
        return (!!this.budgetId) ? "budgets-edit-sidebar" : "budgets-sidebar";
    }
}
