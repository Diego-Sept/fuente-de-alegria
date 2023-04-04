import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { SaloonFacade } from 'app/core/facade/saloons.facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-saloons',
  templateUrl: './saloons.component.html',
  styleUrls: ['./saloons.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaloonsComponent implements OnInit {

  // Public
	public sidebarToggleRef = false;
  	public isCollapsed = true;
  	public rows = [];
  	public selectedOption = 10;
  	public ColumnMode = ColumnMode;
  	public temp = [];
	public previousNameFilter = '';
	public selectedName = [];
	public searchByName = '';
	
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
    	private _saloonFacade: SaloonFacade
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
		this._saloonFacade.loadSaloon();
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
	toggleSidebar(name): void {
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
		this._saloonFacade.getSaloon().pipe(takeUntil(this._unsubscribeAll)).subscribe(saloons => {
			if (!!saloons){
				this.rows = JSON.parse(JSON.stringify(saloons));
				this.tempData = this.rows;
			} else {
				this.rows = [];
				this.tempData = [];
			}
		})
	}

  //DELETE STORE
  deleteSaloon(id: number) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: '¿Desea eliminar el tipo de evento seleccionado?',
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
		this._saloonFacade.deleteSaloon(id).subscribe(resp => {
			Swal.fire({
				title: 'El tipo de evento se eliminó con éxito!!!',
				icon: 'success'
			}).then(_ => {
				  this._router.navigate([`/saloon`]);
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