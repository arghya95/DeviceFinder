import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
/**
 * Generated class for the LostHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lost-history',
  templateUrl: 'lost-history.html',
})
export class LostHistoryPage {
  items: any;
  userid:any;
  constructor(public alertCtrl: AlertController,public loadingCtrl: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();

    this.userid = firebase.auth().currentUser.uid;
    console.log(firebase.auth().currentUser.uid);
    let selfRef = firebase.database().ref('/userSummary/'+this.userid+'/lost-history/');
    selfRef.on('value',(snapuser:any)=>{
      if(snapuser.val()){
        let details = snapuser.val();
        this.items = []; 
      for(let key in details) {
        details[key].uid = key;
        this.items.push(details[key])
      }
      this.items.reverse();
      loading.dismiss();    
    }
    else{
      this.items = [];
      loading.dismiss();
    }
  });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostHistoryPage');
  }

  onDeletePost(index) {
    let prompt = this.alertCtrl.create({
      title: 'Warning',
      message: "Are You Sure You Want to Delete This Location History?",
      
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            console.log('Send clicked');
            firebase.database().ref('/userSummary/'+this.userid+'/lost-history/'+this.items[index].uid).remove()
            .then(() => 
              alert('Successfully Deleted')
            )
            .catch((error) => 
              alert(error)
            )
          }
        }
      ]
    });
    prompt.present();   
 
  }

  clearAllHistory() {
    if(this.items.length!=0){
    let prompt = this.alertCtrl.create({
      title: 'Warning',
      message: "Are You Sure You Want to Delete All Your Location History?",
      
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: data => {
            console.log('Send clicked');
            firebase.database().ref('/userSummary/'+this.userid+'/lost-history/').remove()
            .then(() => 
              alert('Successfully Deleted')
            )
            .catch((error) => 
              alert(error)
            )
          }
        }
      ]
    });
    prompt.present();
  }
  else{
    alert('You Have No Location History');
  }   
  }

}
