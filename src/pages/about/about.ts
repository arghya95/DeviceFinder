import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  devices: any;
  isScanning: boolean;
  constructor(public navCtrl: NavController,private ble: BLE,public viewCtrl: ViewController) {
   
      console.log('Scanning Started');
      this.devices = [];
      this.isScanning = true;
      this.ble.startScan([]).subscribe(device => {
        console.log(device);
      this.devices.push(device);
      });
      
      setTimeout(() => {
        this.ble.stopScan().then(() => {
        console.log('Scanning has stopped');
        console.log(JSON.stringify(this.devices))
        this.isScanning = false;
        this.viewCtrl.dismiss(this.devices);
      });
      }, 5000);
      
    
  }

}
