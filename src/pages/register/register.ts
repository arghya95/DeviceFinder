import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public fname: string;
  public lname: string;
  public email: string;
  public password: string;
  public mobile: string;

  constructor(public loadingCtrl: LoadingController,public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  createUser() {
    if(this.fname=="" || this.fname==undefined || this.fname==null){
      this.showPopup("Error","First Name Cannot be blank");
    }
    else if(this.lname=="" || this.lname==undefined || this.lname==null) {
      this.showPopup("Error","Last Name Cannot be blank");
    }
    else if(this.email=="" || this.email==undefined || this.email==null) {
      this.showPopup("Error","Email Cannot be blank");
    }
    else if(this.password=="" || this.password==undefined || this.password==null) {
      this.showPopup("Error","Password Cannot be blank");
    }
    else if(this.mobile=="" || this.mobile==undefined || this.mobile==null) {
      this.showPopup("Error","Mobile Number Cannot be blank");
    }
  //   var atpos = this.email.indexOf("@");
  //   var dotpos = this.email.lastIndexOf(".");
  // if (atpos<1 || dotpos<atpos+2 || dotpos+2>=this.email.length) {
  //     this.showPopup("Error","Must be A Valid Email Address");
  // }
    else {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then(newUser => {
      firebase.database().ref('/userSummary').child(newUser.uid).set({
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        mobile: this.mobile
      })
      console.log('registration successfull');
      loading.dismiss();
      this.navCtrl.setRoot(TabsPage);
    })
     .catch(function (error) {
      loading.dismiss();
       console.log(error);
     });
  }
}
showPopup(title, text) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: text,
    buttons: ['OK']
  });
  alert.present();
}


}
