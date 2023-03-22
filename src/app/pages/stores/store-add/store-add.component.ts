import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { forwardRef } from 'preact/compat';
import { StoreFacade } from '../../../core/facade/store.facade';
import { CreateStoreDto, StoreDto } from '../interface/stores.interface';

@Component({
	selector: 'store-add',
	templateUrl: './store-add.component.html'
})
export class StoreAddComponent implements OnInit {


	public ReactiveStoreDetailsForm: FormGroup;
	public ReactiveStoreFormSubmitted = false;
	public mergedPwdShow = false;

	// Reactive User Details form data
	public StoreForm = {
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
		private storeFacade: StoreFacade
	) { }

	// getter for easy access to form fields
	get ReactiveStoreForm() {
		return this.ReactiveStoreDetailsForm.controls;
	}

	ReactiveStoreFormOnSubmit() {
		this.ReactiveStoreFormSubmitted = true;
		// stop here if form is invalid
		if (this.ReactiveStoreDetailsForm.invalid) {
			return console.log(this.StoreForm);
		}
		let storeData: CreateStoreDto = {
			name: this.StoreForm.name,
		};

		let store: StoreDto = {
			storeData: storeData,
		}

		this.storeFacade.addStore(store).subscribe(_ => {
			Swal.fire({
				text: 'El inventario se creó exitosamente',
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
		this.ReactiveStoreFormSubmitted = false;
		this.ReactiveStoreDetailsForm = this.formBuilder.group({
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
