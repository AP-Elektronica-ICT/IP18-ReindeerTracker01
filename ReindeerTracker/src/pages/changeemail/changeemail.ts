import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TrackersPage } from '../trackers/trackers';
import { ReindeerPage } from '../reindeer/reindeer';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';


@Component({
  selector: 'page-changeemail',
  templateUrl: 'changeemail.html'
})
export class ChangeEmailPage {
  trackers: any;
  lastLocRange: number;
  hash: string;

  constructor(public nav: NavController, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController, public toastCtrl: ToastController, private storage: Storage) {
    storage.get('hash').then((val) => {
      this.hash = val;
    });
  }


  changeMail(newemail,password) {

    this.reindeerProvider.changeEmail('{"hash":"' + this.hash + '","newEmail":"' + newemail + '","password":"' + password + '"}')
      .then(data => {
        console.log(data)
        if (data) {
          let toast = this.toastCtrl.create({
            message: 'Your email is succesfully changed.',
            duration: 3000
          });
          toast.present();
          this.nav.push(HomePage);
        }
        else {
          let toast = this.toastCtrl.create({
            message: 'Something went wrong, please try again.',
            duration: 3000
          });
          toast.present();
        }

      });

  }


}


