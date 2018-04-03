import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
/**
 * Generated class for the LocationHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-location-history',
  templateUrl: 'location-history.html',
})
export class LocationHistoryPage {
  items: any;
  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    var user = firebase.auth().currentUser.uid;
    console.log(firebase.auth().currentUser.uid);
    let selfRef = firebase.database().ref('/userSummary/'+user+'/location-history/');
    selfRef.on('value',(snapuser:any)=>{
      if(snapuser.val()){
        let details = snapuser.val();
        this.items = [];
        // var arr = [] 
      for(let key in details) {
        details[key].uid = key;
        // arr.push(details[key])
        this.items.push(details[key]);
      }
      this.items.reverse();
    }
  });
  loading.dismiss();        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationHistoryPage');
  }

}
