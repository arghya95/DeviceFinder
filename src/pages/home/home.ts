import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private ble: BLE) {

  }
  connectBle() {
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
    
  }

}
