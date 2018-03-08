import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, GoogleMapsAnimation } from '@ionic-native/google-maps';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps) {
  }

  ionViewDidLoad() {
    console.log('before load.....')
    this.loadMap();
    console.log('after load...');
  }
  loadMap() {
    let element = document.getElementById('map');
    let map: GoogleMap = GoogleMaps.create(element, {});
    let latlng = new LatLng(22.688154, 88.4711731);
 
    
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
            lat: 22.688154,
            lng: 88.4711731
          },
          title: 'WorkPosition',
          icon: 'red',
          // { url : 'https://i.pinimg.com/736x/73/26/cd/7326cdf1c2f2815ca118d4a4829a90f7--marker-icon-map-marker.jpg' },
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
          // console.log(map.getDiv());
          // map.bindTo('postion',map,'center');
    });
  }

}







