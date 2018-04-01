import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, GoogleMapsAnimation } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { LocationHistoryPage } from '../location-history/location-history';

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  map: GoogleMap;
  latitude: any;
  longitude: any;
  // loading: any;
  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public navParams: NavParams, private googleMaps: GoogleMaps) {
    
    

  }

  ionViewDidLoad() {
    console.log('before load.....')
    this.loadMap();
    
    console.log('after load...');
  }
 
  loadMap() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait Map in Loading...'
    });
    loading.present();

    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
  
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude);
      

  this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude)
  .then((result: NativeGeocoderReverseResult) => {
    
    console.log(result);
    // alert(JSON.stringify(result));
    console.log(JSON.stringify(result));    
    // alert(JSON.stringify(result[0].subLocality+', '+result[0].locality+', '+result[0].subAdministrativeArea+', '+result[0].administrativeArea+', '+result[0].countryName+', '+result[0].postalCode+'.'))
  })
  .catch((error: any) => {
    loading.dismiss();
    alert(error);
  });


    let element = document.getElementById('map');
    let map: GoogleMap = GoogleMaps.create(element, {});
    let latlng = new LatLng(this.latitude, this.longitude);

    console.log(this.latitude);
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map Is Ready....');
      loading.dismiss();

      let position: CameraPosition<Object> = {
      target: latlng,
      zoom: 18,
      tilt: 30
        }
        map.moveCamera(position);
        let markerOptions: MarkerOptions = {
          position: {
            lat: this.latitude,
            lng: this.longitude
          },
          title: 'My Location',
          icon: 'red',
          animation: GoogleMapsAnimation.BOUNCE,
          draggable: true
        };
        map.addMarker(markerOptions)
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK)
            .subscribe(() => {
              alert('clicked');
            });
        });
          
    });


     }).catch((error) => {
       console.log('Error getting location', error);
       alert(error);
       loading.dismiss();
     });
    
  }

  goLocationHistory() {
    this.navCtrl.push(LocationHistoryPage)
  }

}







