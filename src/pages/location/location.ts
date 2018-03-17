import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, GoogleMapsAnimation } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

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
  constructor(public navCtrl: NavController,private geolocation: Geolocation, public navParams: NavParams, private googleMaps: GoogleMaps) {
    
    

  }

  ionViewDidLoad() {
    console.log('before load.....')
    this.loadMap();
    
    console.log('after load...');
  }
  ngAfterV() {
    // console.log(this.latitude);
  }
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
  
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude);


    let element = document.getElementById('map');
    let map: GoogleMap = GoogleMaps.create(element, {});
    let latlng = new LatLng(this.latitude, this.longitude);

    console.log(this.latitude);
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map Is Ready....')
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
          title: 'WorkPosition',
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
     });
    
  }

}







