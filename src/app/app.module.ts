import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationPage } from '../pages/location/location';
import { SettingPage } from '../pages/setting/setting';
import { ScanPage } from '../pages/scan/scan';
import { BLE } from '@ionic-native/ble';
import { DevicePage } from '../pages/device/device';
import { GoogleMaps } from '@ionic-native/google-maps';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
import { RegisterPage } from '../pages/register/register';
import { LocationHistoryPage } from '../pages/location-history/location-history';
import { TermsandConditionsPage } from '../pages/termsand-conditions/termsand-conditions';
import { HelpPage } from '../pages/help/help';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { LostHistoryPage } from '../pages/lost-history/lost-history';
// import { Firebase } from '@ionic-native/firebase';
 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyD3TjHpzP84yWeNx9PjUJ0wIB-kSw52cNA",
  authDomain: "ng-http-practice.firebaseapp.com",
  databaseURL: "https://ng-http-practice.firebaseio.com",
  projectId: "ng-http-practice",
  storageBucket: "ng-http-practice.appspot.com",
  messagingSenderId: "68744271603"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LocationPage,
    SettingPage,
    ScanPage,
    DevicePage,
    LoginPage,
    RegisterPage,
    LocationHistoryPage,
    TermsandConditionsPage,
    HelpPage,
    LostHistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LocationPage,
    SettingPage,
    ScanPage,
    DevicePage,
    LoginPage,
    RegisterPage,
    LocationHistoryPage,
    TermsandConditionsPage,
    HelpPage,
    LostHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    GoogleMaps,
    LocalNotifications,
    Geolocation,
    Diagnostic,
    LocationAccuracy,
    NativeGeocoder,
    DocumentViewer,
    // Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
