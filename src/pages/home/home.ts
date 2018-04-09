import { Component, NgZone } from '@angular/core';
import { NavController, Platform, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { DevicePage } from '../device/device';
import { AboutPage } from '../about/about';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { TabsPage } from '../tabs/tabs';
import { LocalNotifications } from '@ionic-native/local-notifications';


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
  latitude: any;
  longitude: any;
  user_id: any;
  time: any;
  constructor(private localNotifications: LocalNotifications,private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,private ngZone: NgZone,public loadingCtrl: LoadingController,public navCtrl: NavController,public navParams: NavParams,private ble: BLE,platform: Platform, public modalCtrl:ModalController) {
    // this.devices = [];
    this.user_id = firebase.auth().currentUser.uid;

    let loading = this.loadingCtrl.create({
      content: 'Please wait Scanning in Progress...'
    });

    // this.devices = this.navParams.get('devices');
    this.isScanning = false;
    // let profileModal = this.modalCtrl.create(AboutPage);
    // profileModal.present();
    platform.ready().then(() => {
      this.ble.isEnabled().then(()=>{
      console.log('bluetooth already enabled');

      loading.present();

      console.log('Scanning Started');
      this.devices = [];
      this.isScanning = true;
      this.ble.startScan([]).subscribe(device => {
        this.ngZone.run(() => {
        console.log(device);
      this.devices.push(device);
        });
      });
      
        setTimeout(() => {
            this.ble.stopScan().then(() => {

            this.ngZone.run(() => {
            console.log('Scanning has stopped');
            console.log(JSON.stringify(this.devices))
            this.isScanning = false;
            loading.dismiss();
            this.connecting = true;
            });
          });
        }, 5000);

      })
      .catch(()=>{
        this.ble.enable().then(()=>{
          console.log('bluetooth enabling....');
        
          loading.present();

          console.log('Scanning Started');
          this.devices = [];
          this.isScanning = true;
          this.ble.startScan([]).subscribe(device => {
            this.ngZone.run(() => {
            console.log(device);
          this.devices.push(device);
            });
          });
          
          setTimeout(() => {
            this.ble.stopScan().then(() => {
              this.ngZone.run(() => {
            console.log('Scanning has stopped');
            console.log(JSON.stringify(this.devices))
            this.isScanning = false;
            loading.dismiss();
            this.connecting = true;
              });
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait Scanning in Progress...'
    });
    loading.present();
  
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
      loading.dismiss();
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

      let loading = this.loadingCtrl.create({
        content: 'Connecting....'
      });
      loading.present();

    this.ble.connect(device.id).subscribe(peripheralData => {
      this.ngZone.run(() => {
        console.log('peripheralData');
        console.log(peripheralData.characteristics);
        this.characteristics = peripheralData.characteristics;
        loading.dismiss();

        this.connecting = false;     
      });
  
      this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {

        this.getTime()
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        console.log(this.latitude);
        
  
          this.nativeGeocoder.reverseGeocode(this.latitude, this.longitude)
          .then((result: NativeGeocoderReverseResult) => {
            loading.dismiss();
            console.log(result);
            console.log(JSON.stringify(result));
            var location = (result[0].thoroughfare ? (result[0].subLocality+', ') : '') + result[0].subLocality+', '+result[0].locality+', '+result[0].subAdministrativeArea+', '+result[0].administrativeArea+', '+result[0].countryName+', '+result[0].postalCode+'.'
            firebase.database().ref('/userSummary/'+this.user_id+'/location-history/').push({
              latitude: this.latitude,
              longitude: this.longitude,
              location: location,
              time: this.time
            })    
          })
          .catch((error: any) => {
            loading.dismiss();
            alert(error);
          });

        }).catch((error) => {
          console.log('Error getting location', error);
          alert(error);
        });

      },
      peripheralData => {
      this.connecting = false;
      loading.dismiss()

      let value = 2;
      let buffer = new Uint8Array([value]).buffer;
      this.ble.writeWithoutResponse(device.id,LIGHTBULB_SERVICE,SWITCH_CHARACTERISTIC,buffer)
      .then((value)=>{
        // alert('high alert..'+value);
      })
      .catch((e)=>{
        // alert(e);
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
  //end lost history
      console.log('disconnected');
      // alert('disconnected');

      this.localNotifications.schedule({
        id: 1,
        text: 'Your Wallet is Disconnected',
        sound: 'file://audio/alarm2.mp3'
       });

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
