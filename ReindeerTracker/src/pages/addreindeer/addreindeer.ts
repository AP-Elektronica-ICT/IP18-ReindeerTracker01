import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';


@Component({
  selector: 'page-addreindeer',
  templateUrl: 'addreindeer.html'
  
})
export class AddReindeerPage {

    userId: string = "1";
  
    reindeerForm = {
      name: '',
      gender: '',
      birthDate: '',
      userId: '1'    
    };
  
    constructor(public nav: NavController, public navParams: NavParams, private toastCtrl: ToastController, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController) {

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