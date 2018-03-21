import { Component, NgZone } from '@angular/core';
import { NavController, Platform, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { DevicePage } from '../device/device';
import { AboutPage } from '../about/about';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';


const LIGHTBULB_SERVICE = '1802';
const SWITCH_CHARACTERISTIC = '2a06';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  devices: any;
  isScanning: boolean;
  characteristics: any;
  connecting: boolean;
  constructor(private ngZone: NgZone,public loadingCtrl: LoadingController,public navCtrl: NavController,public navParams: NavParams,private ble: BLE,platform: Platform, public modalCtrl:ModalController) {
    // this.devices = [];
    let loading = this.loadingCtrl.create({
      content: 'Please wait Scanning in Progress...'
    });
  
    loading.present();
    // this.devices = this.navParams.get('devices');
    this.isScanning = false;
    // let profileModal = this.modalCtrl.create(AboutPage);
    // profileModal.present();
    platform.ready().then(() => {
      this.ble.isEnabled().then(()=>{
      console.log('bluetooth already enabled');

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
        loading.dismiss();
        this.connecting = true;
      });
      }, 5000);


      })
      .catch(()=>{
        this.ble.enable().then(()=>{
          console.log('bluetooth enabling....');


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
            loading.dismiss();
            this.connecting = true;
          });
          }, 5000);
         
        })
        .catch(()=>{
          loading.dismiss()
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
      this.connecting = true;
    });
    }, 5000);
    
  }
    
    
    connectToDevice1(device) {
        console.log('Connect To Device');
        console.log(JSON.stringify(device))
        this.navCtrl.push(DevicePage, {
        device: device
        });
    }

    connectToDevice2(device) {
      
    this.ble.connect(device.id).subscribe(peripheralData => {
      this.ngZone.run(() => {
        console.log('peripheralData');
        console.log(peripheralData.characteristics);
        this.characteristics = peripheralData.characteristics;
        alert('connected');
        this.connecting = false;     
      });
  
      },
      peripheralData => {
      this.connecting = false;


      let value = 2;
      let buffer = new Uint8Array([value]).buffer;
      this.ble.writeWithoutResponse(device.id,LIGHTBULB_SERVICE,SWITCH_CHARACTERISTIC,buffer)
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

    disconnect(device) {
      this.ble.disconnect(device.id)
      .then((data)=>{alert(data);this.connecting=true;})
      .catch(e=>{alert(e)})
    }

    
  logoutClick(){
    this.ngZone.run(()=>{

    console.log("logout clicked....")
    firebase.auth().signOut();
    this.navCtrl.setRoot(LoginPage);
    })
    }


}
