import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  createUser() {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then(newUser => {
      firebase.database().ref('/userSummary').child(newUser.uid).set({
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        mobile: this.mobile
      })
      console.log('registration successfull');
      this.navCtrl.setRoot(TabsPage);
    })
     .catch(function (error) {
       console.log(error);
     });
  }

}
