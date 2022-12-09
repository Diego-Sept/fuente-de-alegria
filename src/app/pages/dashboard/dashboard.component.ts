import { Component, OnInit } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { User } from 'app/auth/models';
import { AuthenticationService } from 'app/auth/service';
import { DashboardService } from './dashboard.service';

import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { locale as german } from './i18n/de';
import { locale as portuguese } from './i18n/pt';
import { locale as spanish } from './i18n/es';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  isAdmin: boolean;
  isClient: boolean;

  constructor(
    private _authenticationService: AuthenticationService,
    private _dashboardService: DashboardService,
    private _coreConfigService: CoreConfigService,
    private _coreTranslationService: CoreTranslationService
  ) { 
    this._authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.isAdmin = this._authenticationService.isAdmin;
    this.isClient = this._authenticationService.isClient;

    this._coreTranslationService.translate(english, french, german, portuguese, spanish);
  }

  ngOnInit(): void {

  }
}
