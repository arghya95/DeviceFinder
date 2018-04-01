import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TermsandConditionsPage } from '../termsand-conditions/termsand-conditions';
import { HelpPage } from '../help/help';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  TandC() {
    this.navCtrl.push(TermsandConditionsPage);
  }

  help() {
    this.navCtrl.push(HelpPage)
  }

}
