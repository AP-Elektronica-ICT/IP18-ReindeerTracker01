import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, GESTURE_MENU_SWIPE } from 'ionic-angular';
import { TrackersPage } from '../trackers/trackers';
import { ReindeerPage } from '../reindeer/reindeer';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';


@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html'
})
export class ChangePasswordPage {

  hash: string;
  trackers: any;
  lastLocRange: number

  constructor(public nav: NavController, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController, public toastCtrl: ToastController, private storage: Storage) {

    storage.get('hash').then((val) => {
      this.hash = val;
    });
  }

  changePass(oldPassword, newPassword : string, repeatPassword) {

   if (oldPassword == "" || newPassword == "" || repeatPassword == "") {
      let toast = this.toastCtrl.create({
        message: 'Something went wrong please try again',
        duration: 3000
      });
      toast.present();
    }
    else if (oldPassword == newPassword) {
      let toast = this.toastCtrl.create({
        message: 'Your current password is the same as your new password.',
        duration: 3000
      });
      toast.present();
    }
    else if (newPassword != repeatPassword) {
      let toast = this.toastCtrl.create({
        message: 'Your passwords are not the same, please try again.',
        duration: 3000
      });
      toast.present();
    }
    else if(newPassword.length < 4){
      let toast = this.toastCtrl.create({
        message: 'Your password is too short(min 4 characters)',
        duration: 3000
      });
      toast.present();
    }

    else {
      this.reindeerProvider.changePassword('{"oldPassword":"' + oldPassword + '","newPassword":"' + newPassword + '","hash":"' + this.hash + '"}')
        .then(data => {
          console.log(data)
          if (data) {
            let toast = this.toastCtrl.create({
              message: 'Your password is succesfully changed.',
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




}
