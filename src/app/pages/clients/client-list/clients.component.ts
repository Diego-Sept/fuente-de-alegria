import { Component, OnInit, ViewChild } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ColumnMode, SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientsService } from './clients.service';


@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
	// Private
	private _unsubscribeAll: Subject<any>;
	private tempData = [];

	// public
	public sidebarToggleRef = false;
	public selectedOption = 10;
	public isCollapsed5 = true;
	public contentHeader: object;
	public rows: any;
	public selected = [];
	public kitchenSinkRows: any;
	public basicSelectedOption: number = 10;
	public ColumnMode = ColumnMode;
	public expanded = {};
	public editingName = {};
	public editingStatus = {};
	public editingAge = {};
	public editingSalary = {};
	public chkBoxSelected = [];
	public SelectionType = SelectionType;
	public exportCSVData;
	public searchValue = '';

	@ViewChild(DatatableComponent) table: DatatableComponent;
	@ViewChild('tableRowDetails') tableRowDetails: any;

	// Public Methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Inline editing Name
	 *
	 * @param event
	 * @param cell
	 * @param rowIndex
	 */
	inlineEditingUpdateName(event, cell, rowIndex) {
		this.editingName[rowIndex + '-' + cell] = false;
		this.rows[rowIndex][cell] = event.target.value;
		this.rows = [...this.rows];
	}

	/**
	 * Inline editing Age
	 *
	 * @param event
	 * @param cell
	 * @param rowIndex
	 */
	inlineEditingUpdateAge(event, cell, rowIndex) {
		this.editingAge[rowIndex + '-' + cell] = false;
		this.rows[rowIndex][cell] = event.target.value;
		this.rows = [...this.rows];
	}

	/**
	 * Inline editing Salary
	 *
	 * @param event
	 * @param cell
	 * @param rowIndex
	 */
	inlineEditingUpdateSalary(event, cell, rowIndex) {
		this.editingSalary[rowIndex + '-' + cell] = false;
		this.rows[rowIndex][cell] = event.target.value;
		this.rows = [...this.rows];
	}

	/**
	 * Inline editing Status
	 *
	 * @param event
	 * @param cell
	 * @param rowIndex
	 */
	inlineEditingUpdateStatus(event, cell, rowIndex) {
		this.editingStatus[rowIndex + '-' + cell] = false;
		this.rows[rowIndex][cell] = event.target.value;
		this.rows = [...this.rows];
	}

	/**
	 * Search (filter)
	 *
	 * @param event
	 */
	filterUpdate(event) {
		const val = event.target.value.toLowerCase();

		// filter our data
		const temp = this.tempData.filter(function (d) {
			return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
		});

		// update the rows
		this.kitchenSinkRows = temp;
		// Whenever the filter changes, always go back to the first page
		this.table.offset = 0;
	}

	  /**
   * Toggle the sidebar
   *
   * @param name
   */
	   toggleSidebar(name): void {
		this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
	  }

	/**
	 * Row Details Toggle
	 *
	 * @param row
	 */
	rowDetailsToggleExpand(row) {
		this.tableRowDetails.rowDetail.toggleExpandRow(row);
	}

	/**
	 * For ref only, log selected values
	 *
	 * @param selected
	 */
	onSelect({ selected }) {
		console.log('Select Event', selected, this.selected);

		this.selected.splice(0, this.selected.length);
		this.selected.push(...selected);
	}

	/**
	 * For ref only, log activate events
	 *
	 * @param selected
	 */
	onActivate(event) {
		// console.log('Activate Event', event);
	}

	/**
	 * Custom Chkbox On Select
	 *
	 * @param { selected }
	 */
	customChkboxOnSelect({ selected }) {
		this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
		this.chkBoxSelected.push(...selected);
	}

	/**
	 * Constructor
	 *
	 * @param {DatatablesService} _datatablesService
	 * @param {CoreTranslationService} _coreTranslationService
	 * @param {CoreSidebarService} _coreSidebarService
	 */
	constructor(
		private _datatablesService: ClientsService,
		private _coreSidebarService: CoreSidebarService,
		) {
		this._unsubscribeAll = new Subject();
	}

	// Lifecycle Hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {

		this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
			this.rows = response;
			this.tempData = this.rows;
			this.kitchenSinkRows = this.rows;
			this.exportCSVData = this.rows;
		});

		// content header
		this.contentHeader = {
			headerTitle: 'Datatables',
			actionButton: true,
			breadcrumb: {
				type: '',
				links: [
					{
						name: 'Home',
						isLink: true,
						link: '/'
					},
					{
						name: 'Forms & Tables',
						isLink: true,
						link: '/'
					},
					{
						name: 'Datatables',
						isLink: false
					}
				]
			}
		};
	}
}
