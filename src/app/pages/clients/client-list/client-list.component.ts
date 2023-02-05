import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { ClientListService } from './client-list.service';
import { Router } from '@angular/router';
import { User } from 'app/auth/models';
import { Contact } from '../interface/client.interface';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-client-list',
	templateUrl: './client-list.component.html',
	styleUrls: ['./client-list.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ClientListComponent implements OnInit {
	// Public
	public sidebarToggleRef = false;
	public isCollapsed5 = true;
	public rows;
	public user: User[] = [];
	public selectedOption = 10;
	public ColumnMode = ColumnMode;
	public temp = [];
	public previousUsernameFilter = '';
	public previousUserTypeFilter = '';
	public previousUserIdFilter = '';
	public selectedUserId = [];
	public selectedUsername = [];
	public selectedUserType = [];
	public searchById = '';
	public searchByUsername = '';
	public searchByDni = '';

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
		private _clientListService: ClientListService,
		private _coreSidebarService: CoreSidebarService,
		private _coreConfigService: CoreConfigService,
		private _router: Router
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
		this.selectedUserId = this.selectedUserId[0];
		this.selectedUsername = this.selectedUsername[0];
		this.selectedUserType = this.selectedUserType[0];

		const val = event.target.value.toLowerCase();

		// Filter Our Data
		const temp = this.tempData.filter(function (d) {
			return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
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
	toggleSidebar(name): void {
		this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
	}

	/**
	 * Filter By UserId
	 *
	 * @param event
	 */
	filterByUserId(event) {
		const filter = event ? event.value : '';
		this.previousUserIdFilter = filter;
		this.temp = this.filterRows(this.previousUserTypeFilter, this.previousUsernameFilter, filter);
		this.rows = this.temp;
	}

	/**
	 * Filter By Username(
	 *
	 * @param event
	 */
	filterByUsername(event) {
		const filter = event ? event.value : '';
		this.previousUsernameFilter = filter;
		this.temp = this.filterRows(this.previousUserTypeFilter, filter, this.previousUserIdFilter);
		this.rows = this.temp;
	}

	/**
	 * Filter By userTypes
	 *
	 * @param event
	 */
	filterByUserType(event) {
		const filter = event ? event.value : [];
		this.previousUserTypeFilter = filter;
		this.temp = this.filterRows(filter, this.previousUsernameFilter, this.previousUserIdFilter);
		this.rows = this.temp;
	}

	/**
	 * Filter Rows
	 * 
	 * @param userIdFilter
	 * @param usernameFilter
	 * @param userTypeFilter
	 * 
	 */
	filterRows(userIdFilter, usernameFilter, userTypeFilter): any[] {
		// Reset search on select change
		this.searchById = '';
		this.searchByUsername = '';
		this.selectedUserType = [];


		userTypeFilter = userTypeFilter.toLowerCase();
		usernameFilter = usernameFilter.toLowerCase();
		userIdFilter = userIdFilter.toLowerCase();

		return this.tempData.filter(row => {
			const isPartialIdMatch = row.id.toLowerCase().indexOf(userIdFilter) !== -1 || !userIdFilter;
			const isPartialUsernameMatch = row.username.toLowerCase().indexOf(usernameFilter) !== -1 || !usernameFilter;
			const isPartialUserTypeMatch = row.userType.toLowerCase().indexOf(userTypeFilter) !== -1 || !userTypeFilter;
			return isPartialUserTypeMatch && isPartialUsernameMatch && isPartialIdMatch;
		});
	}

	deleteClient(id: number) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-success',
				cancelButton: 'btn btn-danger'
			},
			buttonsStyling: false
		})

		swalWithBootstrapButtons.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
			reverseButtons: true
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
		this._clientListService.deleteClient(id).subscribe(resp => {
			Swal.fire({
				title: 'El cliente se eliminó con éxito!!!',
				icon: 'success'
			}).then(_ => {
				  this._router.navigate([`/clients`]);
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
		this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
			//! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
			if (config.layout.animation === 'zoomIn') {
				setTimeout(() => {
					this._clientListService.onClientListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
						this.rows = response;
						this.tempData = this.rows;
					});
				}, 450);
			} else {
				this._clientListService.onClientListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
					this.rows = response;
					this.tempData = this.rows;
				});
			}
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

	getMainContact(contacts: Contact[]) {
		return contacts.find(contact => !!contact.mainContact);
	}
}
