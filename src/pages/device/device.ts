import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {
  device: any;
  connecting: boolean;
  characteristics: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private ble: BLE,private localNotifications: LocalNotifications) {
    this.device = this.navParams.get('device');
    this.connecting = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
    this.connect(this.device.id);
  }
  connect(deviceID) {
        this.characteristics = [];
        
        this.ble.connect(deviceID).subscribe(peripheralData => {
        console.log('peripheralData');
        console.log(peripheralData)
        console.log(peripheralData.characteristics);
        this.characteristics = peripheralData.characteristics;


this.ble.readRSSI(deviceID).then(()=>{
  if(peripheralData.rssi<-40) {
    this.localNotifications.schedule({
      text: 'Your device is too far',
      sound:  'F:\Projects\DeviceFinder\src\assets\sounds\Annoying_Alarm_Clock-UncleKornicob-420925725.mp3',
    });
    alert('device distance is too far');

  }
})




        this.connecting = false;
        },
        peripheralData => {
        this.connecting = false
        console.log('disconnected');
        alert('disconnected');
        });
    }
    
    connectToCharacteristic(deviceID,characteristic) {
        console.log("Connect To Characteristic");
        console.log(deviceID);
        console.log(characteristic);
    }

}