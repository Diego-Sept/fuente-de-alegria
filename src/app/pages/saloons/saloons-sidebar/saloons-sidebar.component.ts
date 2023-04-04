import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaloonFacade } from 'app/core/facade/saloons.facade';
import Swal from 'sweetalert2';
import { CreateSaloonDTO } from '../interfaces/saloons.interface';

@Component({
	selector: 'app-saloons-sidebar',
	templateUrl: './saloons-sidebar.component.html'
})
export class SaloonsSideBarComponent implements OnInit {


	public ReactiveSaloonDetailsForm: FormGroup;
	public ReactiveSaloonFormSubmitted = false;
	public mergedPwdShow = false;

    @Input() productId: number;

	// Reactive User Details form data
	public SaloonForm = {
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
		private saloonsFacade: SaloonFacade,
	) { }

	// getter for easy access to form fields
	get ReactiveSaloonForm() {
		return this.ReactiveSaloonDetailsForm.controls;
	}

	ReactiveSaloonFormOnSubmit() {
		this.ReactiveSaloonFormSubmitted = true;
		// stop here if form is invalid
		if (this.ReactiveSaloonDetailsForm.invalid) {
			return console.log(this.SaloonForm);
		}
		let saloonData: CreateSaloonDTO = {
			name: this.SaloonForm.name,
		};

		//Add Saloon
		this.saloonsFacade.addSaloon(saloonData).subscribe(_ => {
			Swal.fire({
				text: 'El producto se creó exitosamente',
				icon: 'success'
			})
			this.initForm();
		})

		this.toggleSidebar('saloons-sidebar');
        
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
		this.ReactiveSaloonFormSubmitted = false;
		this.ReactiveSaloonDetailsForm = this.formBuilder.group({
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
