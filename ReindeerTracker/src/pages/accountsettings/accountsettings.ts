import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TrackersPage } from '../trackers/trackers';
import { ReindeerPage } from '../reindeer/reindeer';
import { Storage } from '@ionic/storage';
import { ChangePasswordPage } from '../changepassword/changepassword';
import { ChangeEmailPage } from '../changeemail/changeemail';


@Component({
  selector: 'page-accountSettings',
  templateUrl: 'accountsettings.html'
})
export class AccountSettingsPage {

  trackers: any;
  lastLocRange : number

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, private storage: Storage) {
    
    storage.get('lastLocRange').then((val) => {
      this.lastLocRange = val;
      console.log("Opgehaalde waarde:" + val)
    });
  }


  changePassword() {
    this.nav.push(ChangePasswordPage);
  }

  changeEmail() {
    this.nav.push(ChangeEmailPage);
  }

  change(){
    console.log("Set:" + this.lastLocRange);
    this.storage.set("lastLocRange",this.lastLocRange)
  }
}
