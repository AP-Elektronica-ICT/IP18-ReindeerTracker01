import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-editreindeer',
  templateUrl: 'editreindeer.html'
})

export class EditReindeerPage {

  lastLocRange: any;
  hash: string;

  reindeerForm = {
    name: '',
    gender: '',
    birthDate: '',
    hash: '',
    reindeerId: '',
    extraInfo: ''
  };


  constructor(public nav: NavController, public navParams: NavParams, public storage : Storage,private toastCtrl: ToastController, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController) {
    storage.get('lastLocRange').then((val) => {
      this.reindeerForm.reindeerId = this.navParams.get('reindeerId'),val
      this.loadDetails(this.reindeerForm.reindeerId,val);
    });

    storage.get('hash').then((val) => {
      this.hash = val;
      this.reindeerForm.hash = val;
    });
  }


  editReindeer() {
    if (this.reindeerForm.name == "") {
      this.showError("Please enter the name of the reindeer.");
    }
    else {
      console.log(JSON.stringify(this.reindeerForm));
      this.reindeerProvider.updateDetails(JSON.stringify(this.reindeerForm))
        .then(data => {
          if (data) {
            this.nav.pop();
            let toast = this.toastCtrl.create({
              message: 'The reindeer info is successfully updated.',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
          else {
            this.nav.pop();
            let toast = this.toastCtrl.create({
              message: 'Something went wrong, please try again later',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          }
        });
    }

  }


  loadDetails(reindeerId: string,lastLocRange: any) {
    this.reindeerProvider.getDetails(reindeerId,lastLocRange,this.hash)
      .then(data => {
        this.reindeerForm.name = data[0].name;
        this.reindeerForm.gender = data[0].gender;
        this.reindeerForm.birthDate = data[0].birthDate.toString();
        this.reindeerForm.extraInfo = data[0].extraInfo;
      });
  }

  showError(error: string) {
    let toast = this.toastCtrl.create({
      message: error,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
