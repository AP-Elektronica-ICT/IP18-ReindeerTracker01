import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';

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
    birthDate: ''
  };


  constructor(public nav: NavController, public navParams: NavParams, public storage : Storage,private toastCtrl: ToastController, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController) {
    storage.get('lastLocRange').then((val) => {
      //this.lastLocRange = val;
      this.loadDetails(this.navParams.get('reindeerId'),val);
      console.log("Opgehaalde waarde:" + val)
    });

    storage.get('hash').then((val) => {
      this.hash = val;
    });
    //this.loadDetails(this.navParams.get('reindeerId'),this.lastLocRange);
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

  loadDetails(reindeerId: string,lastLocRange: any) {
    this.reindeerProvider.getDetails(reindeerId,lastLocRange,this.hash)
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
