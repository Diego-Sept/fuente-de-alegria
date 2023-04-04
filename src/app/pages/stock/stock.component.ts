import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from '../clients/interface/client.interface';
import { StockFacade } from '../../core/facade/stock.facade';
import { StockService } from '../../core/services/stock.service';

@Component({
	selector: 'app-stock',
	templateUrl: './stock.component.html',
	styleUrls: ['./stock.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class StockComponent implements OnInit {
	// Public
	public sidebarToggleRef = false;
	public isCollapsed5 = true;
	public rows;
	public user: User[] = [];
	public selectedOption = 10;
	public ColumnMode = ColumnMode;
	public temp = [];
	public previousProductFilter = '';
	public previousStoreFilter = '';
	public selectedName = [];
	public selectedDNI = [];
	public searchByProduct = '';
	public searchByStore = '';

	// Decorator
	@ViewChild(DatatableComponent) table: DatatableComponent;

	// Private
	private tempData = [];
	private _unsubscribeAll: Subject<any>;

	stockToEdit = null;

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
		private stockFacade: StockFacade,
		private stockService: StockService
	) {
		this._unsubscribeAll = new Subject();
	}

	// Public Methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * filterUpdate
	 *
	 * @param event
	 */
	filterUpdate(event) {
		// Reset ng-select on search

		const val = event.target.value.toLowerCase();

		// Filter Our Data
		const temp = this.tempData.filter(d => {
			const isPartialProductMatch = d.product.name.toLowerCase().indexOf(val) !== -1 || !val;
			const isPartialStoreMatch = d.store.name.toLowerCase().indexOf(val) !== -1 || !val;
			return isPartialProductMatch || isPartialStoreMatch;
			/* return d.fullName.toLowerCase().indexOf(val) !== -1 || !val; */
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
	toggleSidebar(name, id?: number): void {
		this.stockToEdit = id;
		this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
	}

	/**
	 * Filter By Name
	 *
	 * @param event
	 */
	filterByProduct(event) {
		const filter = event ? event.target.value.toLowerCase() : '';
		this.previousProductFilter = filter;
		this.temp = this.tempData.filter(row => {
			const isPartialProductMatch = row.product.name.toLowerCase().indexOf(filter) !== -1 || !filter;
			return isPartialProductMatch;
		});
		this.rows = this.temp;
		// Whenever The Filter Changes, Always Go Back To The First Page
		this.table.offset = 0;
	}

	/**
	 * Filter By DNI
	 *
	 * @param event
	 */
	filterByStore(event) {
		const filter = event ? event.target.value.toLowerCase() : '';
		this.previousStoreFilter = filter;
		this.temp = this.tempData.filter(row => {
			const isPartialStoreMatch = row.store.name.toLowerCase().indexOf(filter) !== -1 || !filter;
			return isPartialStoreMatch;
		});
		this.rows = this.temp;
		// Whenever The Filter Changes, Always Go Back To The First Page
		this.table.offset = 0;
	}

	deleteStock(id: number) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: '¿Desea eliminar el stock seleccionado?',
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
		this.stockFacade.deleteStock(id).subscribe(resp => {
			Swal.fire({
				title: 'El stock se eliminó con éxito!!!',
				icon: 'success'
			}).then(_ => {
				this._router.navigate([`/stock`]);
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
		this.stockFacade.loadStockList();
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

	suscribeToData() {
		this.stockFacade.getStockList().pipe(takeUntil(this._unsubscribeAll)).subscribe(stockList => {
			this.rows = JSON.parse(JSON.stringify(stockList));
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
