import { Component, NgZone, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import * as firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { LocationHistoryPage } from '../pages/location-history/location-history';
import { BackgroundMode } from '@ionic-native/background-mode';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  latitude: any;
  longitude: any;


  constructor(private backgroundMode: BackgroundMode,public loadingCtrl: LoadingController,public zone:NgZone,platform: Platform,private locationAccuracy: LocationAccuracy,private diagnostic: Diagnostic,private geolocation: Geolocation, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      let loading = this.loadingCtrl.create({
        content: 'Authenticating...'
      });
      loading.present();

      firebase.auth().onAuthStateChanged((user) => {

        if(user){
          this.zone.run(()=>{

            loading.dismiss()
            this.rootPage=TabsPage;
            this.backgroundMode.enable();
          })
        }else{
          this.zone.run(()=>{
            loading.dismiss();
            this.rootPage=LoginPage;
          })
        }
    });


    });
  }


}
