import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TabsPage } from '../tabs/tabs';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

import * as firebase from 'firebase';
/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const LIGHTBULB_SERVICE = '1802';
const SWITCH_CHARACTERISTIC = '2a06';
const LINKLOSS_SERVICE = '1803';


@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {
  device: any;
  connecting: boolean;
  characteristics: any;
  power: any;
  bleRssi: any;
  deviceRssi: number = -100;
  searchClick: any;
  value: any;
  latitude: any;
  longitude: any;
  user_id: any;
  time: any;

  constructor( private nativeGeocoder: NativeGeocoder,private geolocation: Geolocation,private ngZone: NgZone,public navCtrl: NavController,private localNotifications: LocalNotifications,public zone: NgZone,public navParams: NavParams,private ble: BLE) {
    this.device = this.navParams.get('device');
    this.connecting = true;
    this.searchClick = true;
    this.user_id = firebase.auth().currentUser.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
    this.connect(this.device.id);
  }
 
  connect(deviceID) {
        this.characteristics = [];
        
        this.ble.connect(deviceID).subscribe(peripheralData => {
        this.searchClick = true;
        console.log('peripheralData');
        console.log(peripheralData.characteristics);
        this.characteristics = peripheralData.characteristics;
        /*
        this.ble.read(deviceID, LIGHTBULB_SERVICE, SWITCH_CHARACTERISTIC).then(
          buffer => {
            let data = new Uint8Array(buffer);
            console.log('switch characteristic ' + data[0]);
            alert('switch characteristic ' + data[0])
         
                this.power = data[0] !== 0;
          
          }
        )
        .catch(()=>{
          alert('not found');
        })
        */
        this.connecting = false;
        },
        peripheralData => {
        this.connecting = false;
        this.searchClick = true;

        let value = 2;
        let buffer = new Uint8Array([value]).buffer;
        this.ble.writeWithoutResponse(deviceID,LIGHTBULB_SERVICE,SWITCH_CHARACTERISTIC,buffer)
        .then((value)=>{
          alert('high alert..'+value);
        })
        .catch((e)=>{
          alert(e);
        })
//lost history code start
        this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
          this.getTime()
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
          console.log(this.latitude);
          
    
      this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude)
      .then((result: NativeGeocoderReverseResult) => {
        console.log(result);
        console.log(JSON.stringify(result));
        var location = (result[0].thoroughfare ? (result[0].subLocality+', ') : '') + result[0].subLocality+', '+result[0].locality+', '+result[0].subAdministrativeArea+', '+result[0].administrativeArea+', '+result[0].countryName+', '+result[0].postalCode+'.'
        firebase.database().ref('/userSummary/'+this.user_id+'/lost-history/').push({
          latitude: this.latitude,
          longitude: this.longitude,
          location: location,
          time: this.time
        })    
      })
      .catch((error: any) => {
        alert(error);
      });
  
    }).catch((error) => {
      console.log('Error getting location', error);
      alert(error);
    });
    //lost history end

        console.log('disconnected');
        alert('disconnected');
        this.navCtrl.setRoot(TabsPage);
        });
    }

    ngDoCheck() {

      this.ble.readRSSI(this.device.id)
      .then((rssi)=>{
        this.bleRssi = rssi;
      })
      if(this.bleRssi<this.deviceRssi) {
        let value = 2;
        let buffer = new Uint8Array([value]).buffer;
        this.ble.writeWithoutResponse(this.device.id,LIGHTBULB_SERVICE,SWITCH_CHARACTERISTIC,buffer)
        .then((value)=>{
          // alert('high alert..'+value);
          this.localNotifications.schedule({
            id: 1,
            text: 'Your Device is Lost',
            sound: 'file://audio/alarm2.mp3'
           });
        })
        .catch((e)=>{
          // alert(e);
        })
        
      }
     
      
    }


    public schedule() {
      // Schedule a single notification
      this.localNotifications.schedule({
       id: 1,
       text: 'Your Device is Lost',
       sound: 'file://audio/alarm2.mp3'
      });
      }

connectToCharacteristic(deviceID,characteristic) {
        console.log("Connect To Characteristic");
        console.log(deviceID);
        // alert(characteristic.service);
    if(characteristic.service==1802) {

      let value = 2;
      let buffer = new Uint8Array([value]).buffer;
      this.ble.writeWithoutResponse(deviceID,LIGHTBULB_SERVICE,SWITCH_CHARACTERISTIC,buffer)
      .then((value)=>{
        alert('high alert..'+value);
      })
      .catch((e)=>{
        alert(e);
      })
    }
    else if(characteristic.service=='ffe0') {
      this.ble.startNotification(deviceID, 'ffe0', 'ffe1')
      .subscribe((buffer) => {
        alert(String.fromCharCode.apply(null, new Uint8Array(buffer)))
        });  
    }
    else{
      alert('not alert service')
    }

    }
    searchPeripheral(deviceID){
      this.ngZone.run(() => {
        this.value = 2;
        let buffer = new Uint8Array([this.value]).buffer;

        // setTimeout(() => {
        this.ble.write(deviceID,LIGHTBULB_SERVICE,SWITCH_CHARACTERISTIC,buffer)
        .then((value)=>{
          // alert('high alert..'+value);
          this.searchClick = false;
        })
        .catch((e)=>{
          alert('search device error'+e);
          this.searchClick = true;
        })
      // }, 50000);

      })
    }
    stopSearch(deviceID) {
      this.ngZone.run(() => {
        this.value = 2;
        let buffer = new Uint8Array([this.value]).buffer;
        this.ble.write(deviceID,LINKLOSS_SERVICE,SWITCH_CHARACTERISTIC,buffer)
        .then((value)=>{
          alert('high alert..'+value);
          this.searchClick = true;
        })
        .catch((e)=>{
          alert('stop search error'+e);
          this.searchClick = false;
        })
      })
    }

    getTime() {
      var currentdate = new Date(); 
      this.time = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                return this.time;
    }

}