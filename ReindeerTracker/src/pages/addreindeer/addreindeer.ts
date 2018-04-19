import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-addreindeer',
  templateUrl: 'addreindeer.html'
  
})
export class AddReindeerPage {

    hash: string;
  
    reindeerForm = {
      name: '',
      gender: '',
      birthDate: '',
      extraInfo: '',
      userId: '1'    
    };
  
    constructor(public nav: NavController, public navParams: NavParams, private toastCtrl: ToastController, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController, private storage: Storage) {
      storage.get('hash').then((val) => {
        this.hash = val;
      });
    }
  
    addReindeer() {
      if (this.reindeerForm.name == "") {
        this.showError("Please enter the name of the reindeer.");
      }
      else {
        this.reindeerProvider.addReindeer(JSON.stringify(this.reindeerForm))
          .then(data => {
            if (data) {
              this.nav.pop();
              let toast = this.toastCtrl.create({
                message: 'The reindeer is successfully added to the system.',
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
  
    showError(error: string) {
      let toast = this.toastCtrl.create({
        message: error,
        duration: 2000,
        position: 'top'
      });
      toast.present();
    }
}