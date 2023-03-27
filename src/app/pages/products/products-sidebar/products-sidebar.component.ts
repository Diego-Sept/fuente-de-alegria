import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormGroup, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CreateProductDTO } from '../interfaces/products.interface';
import { ProductFacade } from 'app/core/facade/product.facade';
import { ProductService } from 'app/core/services/product.service';

@Component({
	selector: 'app-products-sidebar',
	templateUrl: './products-sidebar.component.html'
})
export class ProductsSidebarComponent implements OnInit {


	public ReactiveProductDetailsForm: FormGroup;
	public ReactiveProductFormSubmitted = false;
	public mergedPwdShow = false;

    @Input() productId: number;

	// Reactive User Details form data
	public ProductForm = {
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
		private productFacade: ProductFacade,
        private productsService: ProductService
	) { }

	// getter for easy access to form fields
	get ReactiveProductForm() {
		return this.ReactiveProductDetailsForm.controls;
	}

	ReactiveProductFormOnSubmit() {
		this.ReactiveProductFormSubmitted = true;
		// stop here if form is invalid
		if (this.ReactiveProductDetailsForm.invalid) {
			return console.log(this.ProductForm);
		}
		let productData: CreateProductDTO = {
			name: this.ProductForm.name,
		};

        if (!!this.productId) {
            this.productFacade.updateProduct(this.productId, productData).subscribe(_ => {
                Swal.fire({
                    text: 'El producto se actualizó exitosamente',
                    icon: 'success'
                })
                this.productId = undefined;
                this.initForm();
            })
        } else {
            this.productFacade.addProduct(productData).subscribe(_ => {
                Swal.fire({
                    text: 'El producto se creó exitosamente',
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
		this.ReactiveProductFormSubmitted = false;
		this.ReactiveProductDetailsForm = this.formBuilder.group({
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

    ngOnChanges(changes: SimpleChanges){
        if ( !!this.productId ){
			this.productsService.getProductById(this.productId).subscribe(store => {
				this.ProductForm = {
					name: store.name,
				}
			});
		}
    }

    toggleIfIsUpdating(){
        return (!!this.productId) ? "products-edit-sidebar" : "products-sidebar";
    }
}
