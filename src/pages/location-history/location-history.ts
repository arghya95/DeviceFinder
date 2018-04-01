import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var user = firebase.auth().currentUser;
    let selfRef = firebase.database().ref('/userSummary'+user);
    console.log(selfRef);
    selfRef.on('value',(snapuser:any)=>{
      if(snapuser.val()){
        let details = snapuser.val();
        this.items = []; 
      for(let key in details) {
        details[key].uid = key;
        this.items.push(details[key])
      }
    }
  });        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationHistoryPage');
  }

}
