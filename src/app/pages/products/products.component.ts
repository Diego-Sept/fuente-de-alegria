import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ProductFacade } from '../../core/facade/product.facade';
import { User } from '../clients/interface/client.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // Public
	public sidebarToggleRef = false;
	public isCollapsed5 = true;
	public rows;
	public user: User[] = [];
	public selectedOption = 10;
	public ColumnMode = ColumnMode;
	public temp = [];
	public previousNameFilter = '';
	public previousDNIFilter = '';
	public selectedName = [];
	public selectedDNI = [];
	public searchByName = '';
	public searchByDNI = '';

	public productToEdit: number;

	// Decorator
	@ViewChild(DatatableComponent) table: DatatableComponent;

	// Private
	private tempData = [];
	private _unsubscribeAll: Subject<any>;

  /**
	 * Constructor
	 *
	 * @param {CoreConfigService} _coreConfigService
	 * @param {UserListService} _userListService
	 * @param {CoreSidebarService} _coreSidebarService
	 */
	constructor(
		private _coreSidebarService: CoreSidebarService,
		private _coreConfigService: CoreConfigService,
		private _router: Router,
		private productFacade: ProductFacade
	) {
		this._unsubscribeAll = new Subject();
	}

  /**
	 * filterUpdate
	 *
	 * @param event
	 */
	filterUpdate(event) {
		// Reset ng-select on search
		//this.selectedName = this.selectedName[0];

		const val = event.target.value.toLowerCase();

		// Filter Our Data
		const temp = this.tempData.filter(function (d) {
			return d.name.toLowerCase().indexOf(val) !== -1 || !val;
		});

		// Update The Rows
		this.rows = temp;
		// Whenever The Filter Changes, Always Go Back To The First Page
		this.table.offset = 0;
	}

	/**
	 * Toggle the sidebar
	 *
	 * @param name
	 */
	toggleSidebar(name: string, productId?: number): void {
		this.productToEdit = productId;
		this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
	}

	/**
	 * Filter By Name
	 *
	 * @param event
	 */
	filterByUsername(event) {
		const filter = event ? event.value : '';
		this.previousNameFilter = filter;
		this.temp = this.filterRows(this.previousNameFilter);
		this.rows = this.temp;
	}

	/**
	 * Filter Rows
	 * 
	 * @param userIdFilter
	 * @param usernameFilter
	 * 
	 */
	filterRows(nameFilter): any[] {
		// Reset search on select change
		this.searchByName = '';


		nameFilter = nameFilter.toLowerCase();

		return this.tempData.filter(row => {
			const isPartialNameMatch = (row.name.toLowerCase().indexOf(nameFilter) !== -1 || row.surname.toLowerCase().indexOf(nameFilter) !== -1) || !nameFilter;
			return isPartialNameMatch;
		});
	}

	deleteProduct(id: number) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: '¿Desea eliminar el producto seleccionado?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Continuar',
			cancelButtonText: 'Cancelar',
			buttonsStyling: true,
		}).then((result) => {
			if (result.isConfirmed) {
				this.delete(id);
			}
		})
	}

	/**
	 * Delete User
	 *
	 */
	delete(id: number) {
		this.productFacade.deleteProduct(id).subscribe(resp => {
			Swal.fire({
				title: 'El producto se eliminó con éxito!!!',
				icon: 'success'
			}).then(_ => {
				  this._router.navigate([`/products`]);
			})
		});
	}

	// Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------
	/**
	 * On init
	 */
	ngOnInit(): void {
		// Subscribe config change
		this.productFacade.loadProducts();
		this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
			//! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
			if (config.layout.animation === 'zoomIn') {
				setTimeout(() => {
					this.suscribeToData();
				}, 450);
			} else {
				this.suscribeToData();
			}
		});

	}

	suscribeToData(){
		this.productFacade.getProducts().pipe(takeUntil(this._unsubscribeAll)).subscribe(products => {
			this.rows = JSON.parse(JSON.stringify(products));
			this.tempData = this.rows;
		})
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

}
