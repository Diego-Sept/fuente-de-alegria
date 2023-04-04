import { Component, OnInit, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { Router } from '@angular/router';
import { StoresService } from './stores.service';
import { StoreFacade } from 'app/core/facade/store.facade';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoresComponent implements OnInit {
  //Public
  	public isCollapsed = true;
  	public rows = [];
  	public selectedOption = 10;
  	public ColumnMode = ColumnMode;
  	public temp = [];
	public previousNameFilter = '';
	public selectedName = [];
	public searchByName = '';
	public storeToEdit: number;

  // Decorator
	@ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
	private tempData = [];
	private _unsubscribeAll: Subject<any>;

  /**
	 * Constructor
	 *
	 * @param {CoreConfigService} _coreConfigService
   */
  constructor(
		private _coreSidebarService: CoreSidebarService,
		private _coreConfigService: CoreConfigService,
		private _router: Router,
    	private _storeFacade: StoreFacade
	) {
		this._unsubscribeAll = new Subject();
	}

  // Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------
	/**
	 * On init
	 */
	ngOnInit(): void {
		// Subscribe config change
		this._storeFacade.loadStores();
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

// Public Methods
	// -----------------------------------------------------------------------------------------------------

	/**
		 * Toggle the sidebar
		 *
		 * @param name
		 */
	toggleSidebar(name, id?: number): void {
		this.storeToEdit = id;
		this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
	}

	/**
	 * filterUpdate
	 *
	 * @param event
	 */
	filterUpdate(event) {

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
	 * Filter By Name
	 *
	 * @param event
	 */
	filterByName(event) {
		const filter = event ? event.value : '';
		this.previousNameFilter = filter;
		this.temp = this.filterRows(filter);
		this.rows = this.temp;
	}

	/**
	 * Filter Rows
	 * 
	 * @param nameFilter
	 * 
	 */
	filterRows(nameFilter): any[] {
		// Reset search on select change
		this.searchByName = '';


		nameFilter = nameFilter.toLowerCase();

		return this.tempData.filter(row => {
			const isPartialNameMatch = row.name.toLowerCase().indexOf(nameFilter) !== -1 || !nameFilter;
			return isPartialNameMatch;
		});
	}

  //GET
	suscribeToData(){
		this._storeFacade.getStores().pipe(takeUntil(this._unsubscribeAll)).subscribe(stores => {
			if (!!stores){
				this.rows = JSON.parse(JSON.stringify(stores));
				this.tempData = this.rows;
			} else {
				this.rows = [];
				this.tempData = [];
			}
		})
	}

  //DELETE STORE
  deleteStore(id: number) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: '¿Desea eliminar el Inventario seleccionado?',
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
	 * Delete
	 *
	 */
	delete(id: number) {
		this._storeFacade.deleteStore(id).subscribe(resp => {
			Swal.fire({
				title: 'El Inventario se eliminó con éxito!!!',
				icon: 'success'
			}).then(_ => {
				  this._router.navigate([`/stores`]);
			})
		});
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
