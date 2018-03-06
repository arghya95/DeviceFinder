import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LocationPage } from '../location/location';
import { SettingPage } from '../setting/setting';
import { ScanPage } from '../scan/scan';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ScanPage;
  tab3Root = LocationPage;
  tab4Root = SettingPage;

  constructor() {

  }
}
