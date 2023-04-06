import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CreateEventTypeDTO } from '../interfaces/eventTypes.interface';
import { EventTypeFacade } from '../../../core/facade/eventType.facade';

@Component({
	selector: 'app-eventTypes-sidebar',
	templateUrl: './event-types-sidebar.component.html'
})
export class EventTypesSidebarComponent implements OnInit {


	public ReactiveEventTypeDetailsForm: FormGroup;
	public ReactiveEventTypeFormSubmitted = false;
	public mergedPwdShow = false;

    @Input() productId: number;

	// Reactive User Details form data
	public EventTypeForm = {
		name: '',
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
		private eventTypeFacade: EventTypeFacade,
	) { }

	// getter for easy access to form fields
	get ReactiveEventTypeForm() {
		return this.ReactiveEventTypeDetailsForm.controls;
	}

	ReactiveEventTypeFormOnSubmit() {
		this.ReactiveEventTypeFormSubmitted = true;
		// stop here if form is invalid
		if (this.ReactiveEventTypeDetailsForm.invalid) {
			return console.log(this.EventTypeForm);
		}
		let eventTypeData: CreateEventTypeDTO = {
			name: this.EventTypeForm.name,
		};

    	
		//Add EventType
		this.eventTypeFacade.addEventType(eventTypeData).subscribe(_ => {
			Swal.fire({
				text: 'El producto se creó exitosamente',
				icon: 'success'
			})
			this.initForm();
		})

		this.toggleSidebar('eventType-sidebar');
        
        
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
		this.ReactiveEventTypeFormSubmitted = false;
		this.ReactiveEventTypeDetailsForm = this.formBuilder.group({
			name: ['', Validators.required],
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