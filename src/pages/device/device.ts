import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const LIGHTBULB_SERVICE = '1802';
const SWITCH_CHARACTERISTIC = '2a06';
const DIMMER_CHARACTERISTIC = 'ffe0';


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


  constructor(private ngZone: NgZone,public navCtrl: NavController,private localNotifications: LocalNotifications,public zone: NgZone,public navParams: NavParams,private ble: BLE) {
    this.device = this.navParams.get('device');
    this.connecting = true;
    this.searchClick = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
    this.connect(this.device.id);
  }
 
  connect(deviceID) {
        this.characteristics = [];
        
        this.ble.connect(deviceID).subscribe(peripheralData => {
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


        let value = 2;
        let buffer = new Uint8Array([value]).buffer;
        this.ble.writeWithoutResponse(deviceID,LIGHTBULB_SERVICE,SWITCH_CHARACTERISTIC,buffer)
        .then((value)=>{
          alert('high alert..'+value);
        })
        .catch(()=>{
          alert('error');
        })


        console.log('disconnected');
        alert('disconnected');
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
        .catch(()=>{
          alert('error');
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
      .catch(()=>{
        alert('error');
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
        let value = 2;
        let buffer = new Uint8Array([value]).buffer;
        this.ble.writeWithoutResponse(deviceID,LIGHTBULB_SERVICE,SWITCH_CHARACTERISTIC,buffer)
        .then((value)=>{
          alert('high alert..'+value);
          this.searchClick = false;
        })
        .catch(()=>{
          alert('error');
        })
      })
    }
    stopSearch(deviceID) {
      this.ngZone.run(() => {
        let value = 0;
        let buffer = new Uint8Array([value]).buffer;
        this.ble.writeWithoutResponse(deviceID,LIGHTBULB_SERVICE,SWITCH_CHARACTERISTIC,buffer)
        .then((value)=>{
          alert('high alert..'+value);
          this.searchClick = true;
        })
        .catch(()=>{
          alert('error');
        })
      })
    }

}