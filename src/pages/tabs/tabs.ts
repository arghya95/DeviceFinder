import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LocationPage } from '../location/location';
import { SettingPage } from '../setting/setting';
import { ScanPage } from '../scan/scan';
import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { BLE } from '@ionic-native/ble';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  // tab2Root = ScanPage;
  tab3Root = LocationPage;
  tab4Root = SettingPage;



  latitude: any;
  longitude: any;

  constructor(private ble: BLE,private geolocation: Geolocation,platform: Platform,private locationAccuracy: LocationAccuracy,private diagnostic: Diagnostic) {
    platform.ready().then(() => {
   
      //location permission code
      this.diagnostic.isLocationEnabled().then(
        (isAvailable) => {
        // console.log('Is available? ' + isAvailable);
        // alert('Is available? ' + isAvailable);
        this.locationAccuracy.canRequest().then((canRequest: boolean) => {

          if(canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_LOW_POWER).then(
              () => {
                console.log('Request successful');
                this.geolocation.getCurrentPosition().then((resp) => {
  
                  this.latitude = resp.coords.latitude;
                  this.longitude = resp.coords.longitude;
                  console.log(this.latitude);
                }).catch((error) => {
                  console.log('Error getting location', error);
                  alert("app location "+error);
                });
              },
              error => console.log('Error requesting location permissions', error)
            );
          }
        
        });
        }).catch( (e) => {
        console.log(e);
        alert(JSON.stringify(e));
        });

    });

  }

}
