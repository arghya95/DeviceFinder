import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { DevicePage } from '../device/device';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  devices: any;
  isScanning: boolean;

  constructor(public navCtrl: NavController,private ble: BLE,platform: Platform) {
    this.devices = [];
    this.isScanning = false;
    platform.ready().then(() => {
      this.ble.isEnabled().then(()=>{
        console.log('bluetooth already enabled')
      })
      .catch(()=>{
        this.ble.enable().then(()=>{
          console.log('bluetooth enabling....')
        })
        .catch(()=>{
          console.log('error');
        })
      })

    })


    

  }
  
  
  startScanning() {
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
    });
    }, 5000);
    
    }
    
    
    connectToDevice(device) {
        console.log('Connect To Device');
        console.log(JSON.stringify(device))
        this.navCtrl.push(DevicePage, {
        device: device
        });
    }
    


}
