import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';

/**
 * Generated class for the TermsandConditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-termsand-conditions',
  templateUrl: 'termsand-conditions.html',
})
export class TermsandConditionsPage {

  constructor(private document: DocumentViewer,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsandConditionsPage');
/*    const options: DocumentViewerOptions = {
      title: 'Terms And Conditions'
    }
 
    this.document.viewDocument('www/assets/Terms&Conditions.pdf', 'application/pdf', options);
    */
  }
 
}
