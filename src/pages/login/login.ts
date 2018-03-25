import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: any;
  public password: any;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goLogin() {
    return firebase.auth().signInWithEmailAndPassword(this.email, this.password)
     .then(user => {
       console.log(this.email);
       if(user) {
         this.navCtrl.setRoot(TabsPage);
       }
     })
      .catch((_error) => {
        alert(_error.message);
      });
   }

   goRegister() {
    this.navCtrl.push(RegisterPage);
  }
  forgetPassword() {
    let prompt = this.alertCtrl.create({
      title: 'Forget Password',
      message: "Enter Email Address for Password Recovery",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email Address'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            firebase.auth().sendPasswordResetEmail(data.email)
            .then(() => 
              alert('Reset Password Email Sent')
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


}