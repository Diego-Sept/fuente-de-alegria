import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { StockService } from 'app/core/services/stock.service';
import { StockFacade } from 'app/core/facade/stock.facade';
import { CreateStockDto } from '../interfaces/stock.interface';
import { ProductService } from 'app/core/services/product.service';
import { StoresService } from '../../../core/services/stores.service';
import { Product } from 'app/pages/products/interfaces/products.interface';
import { Store } from 'app/pages/stores/interface/stores.interface';

@Component({
	selector: 'app-stock-sidebar',
	templateUrl: './stock-sidebar.component.html'
})
export class StockSidebarComponent implements OnInit {


	public ReactiveStockDetailsForm: FormGroup;
	public ReactiveStockFormSubmitted = false;
	public mergedPwdShow = false;
	products: Product[];
	stores: Store[];

    @Input() stockId: number;

	// Reactive User Details form data
	public StockForm = {
		product: [],
		store: [],
		quantity: '',
	};

	productSelected;
	storeSelected;

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
		private stockFacade: StockFacade,
        private stockService: StockService,
		private productService: ProductService,
		private storesService: StoresService
	) { }

	// getter for easy access to form fields
	get ReactiveStockForm() {
		return this.ReactiveStockDetailsForm.controls;
	}

	ReactiveStockFormOnSubmit() {
		this.ReactiveStockFormSubmitted = true;
		// stop here if form is invalid
		if (this.ReactiveStockDetailsForm.invalid) {
			return console.log(this.StockForm);
		}
		let productData: CreateStockDto = {
            productId: this.productSelected,
            storeId: this.storeSelected,
			quantity: +this.StockForm.quantity,
		};

        if (!!this.stockId) {
            this.stockFacade.updateStock(this.stockId, productData).subscribe(_ => {
                Swal.fire({
                    text: 'El stock se actualizó exitosamente',
                    icon: 'success'
                })
                this.stockId = undefined;
                this.initForm();
            })
        } else {
            this.stockFacade.addStock(productData).subscribe(_ => {
                Swal.fire({
                    text: 'El stock se agregó exitosamente',
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
		this.initForm();
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
		this.productSelected = undefined;
		this.storeSelected = undefined;
		this.ReactiveStockFormSubmitted = false;
		this.ReactiveStockDetailsForm = this.formBuilder.group({
			product: ['', Validators.required],
			store: ['', Validators.required],
			quantity: ['', Validators.required],
		});
	}

	// Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */

	ngOnInit(): void {
		this.productService.getProducts().toPromise().then(products => {
			this.products = products;
		})
		this.storesService.getStores().toPromise().then(stores => {
			this.stores = stores;
		})
		this.initForm();
	}

    ngOnChanges(changes: SimpleChanges){
        if ( !!this.stockId ){
			this.stockService.getStockById(this.stockId).subscribe(stock => {
				this.productSelected = stock.productId;
				this.storeSelected = stock.storeId;
				this.StockForm = {
					product: this.products,
					store: this.stores,
					quantity: stock.quantity.toString(),
				}
			});
		}
    }

    toggleIfIsUpdating(){
        return (!!this.stockId) ? "stock-edit-sidebar" : "stock-sidebar";
    }

	onSelectProduct(event){
		this.productSelected = event.srcElement.value;
	}

	onSelectStore(event){
		this.storeSelected = event.srcElement.value;
	}
}
