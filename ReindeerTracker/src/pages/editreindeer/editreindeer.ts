import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';

@Component({
  selector: 'page-editreindeer',
  templateUrl: 'editreindeer.html'
})

export class EditReindeerPage {

  userId: string = "1";


  reindeerForm = {
    name: '',
    gender: '',
    birthDate: ''
  };


  constructor(public nav: NavController, public navParams: NavParams, private toastCtrl: ToastController, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController) {
      this.loadDetails(this.navParams.get('reindeerId'));
  }


  addReindeer() {
    if (this.reindeerForm.name == "") {
      this.showError("Please enter the name of the reindeer.");
    }
    else {
      //this.reindeerForm.pictures[0] = this.reindeerPicture;
      console.log(JSON.stringify(this.reindeerForm));
      /*this.reindeerProvider.addReindeer('{"name":"' + this.reindeerForm.name + '","gender":"' + this.reindeerForm.gender + '","birthDate":"' + this.reindeerForm.birthDate + '","picture":"' + this.reindeerPicture + '","userId":"' + this.userId + '"}')
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
        });*/
    }

  }

  editReindeer() {
    if (this.reindeerForm.name == "") {
      this.showError("Please enter the name of the reindeer.");
    }
    else{

    }

  }

  loadDetails(reindeerId: string) {
    this.reindeerProvider.getDetails(reindeerId)
      .then(data => {
        this.reindeerForm.name = data[0].name;
        this.reindeerForm.gender = this.reindeerForm.gender = data[0].gender;
        this.reindeerForm.birthDate = data[0].birthDate.toString();
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
