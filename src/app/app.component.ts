import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  latitude: any;
  longitude: any;


  constructor(platform: Platform,private locationAccuracy: LocationAccuracy,private diagnostic: Diagnostic,private geolocation: Geolocation, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


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
                  alert(this.latitude);
                }).catch((error) => {
                  console.log('Error getting location', error);
                  alert(error);
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
