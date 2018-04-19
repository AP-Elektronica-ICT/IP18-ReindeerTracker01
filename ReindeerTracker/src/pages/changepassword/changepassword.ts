import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TrackersPage } from '../trackers/trackers';
import { ReindeerPage } from '../reindeer/reindeer';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html'
})
export class ChangePasswordPage {

  trackers: any;
  lastLocRange : number

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, private storage: Storage) {
    
    storage.get('lastLocRange').then((val) => {
      this.lastLocRange = val;
      console.log("Opgehaalde waarde:" + val)
    });
  }


  manageTrackers() {
    this.nav.push(TrackersPage, {});
  }

  manageReindeer() {
    this.nav.push(ReindeerPage, {});
  }

}
