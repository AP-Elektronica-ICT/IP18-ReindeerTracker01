import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';

@Component({
  selector: 'page-managereindeer',
  templateUrl: 'managereindeer.html'

})

export class ManageReindeerPage {

  userId: string = "1";

  manageType: string;
  buttonLabel: string;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 1000,
    targetHeight: 1000
  }

  reindeerForm = {
    name: '',
    gender: '',
    alive: '',
    birthDate: ''
  };

  public reindeerPicture: string;

  constructor(public nav: NavController, public navParams: NavParams, private toastCtrl: ToastController, private camera: Camera, public reindeerProvider: ReindeerServiceProvider) {
    if (this.navParams.get('manageType') == "add") {
      this.buttonLabel = "Add reindeer"
      this.manageType = "add";
    }
    else if (this.navParams.get('manageType') == "edit") {
      this.buttonLabel = "Edit reindeer"
      this.manageType = "edit";
      this.loadDetails(this.navParams.get('reindeerId'));
    }
  }

  submitData() {
    if (this.manageType == "add") {
      this.addReindeer();
    }
    else {
      this.updateReindeer();
    }
  }

  addReindeer() {
    if (this.reindeerForm.name == "") {
      this.showError("Please enter the name of the reindeer.");
    }
    else if (this.reindeerForm.gender == "") {
      this.showError("Please select the gender of the reindeer.");
    }
    else if (this.reindeerForm.birthDate == "") {
      this.showError("Please enter the birth date of the reindeer.");
    }
    else if (this.reindeerPicture == null) {
      this.showError("Please add a picture of the reindeer.");
    }
    else {
      this.reindeerProvider.addReindeer('{"name":"' + this.reindeerForm.name + '","gender":"' + this.reindeerForm.gender + '","birthDate":"' + this.reindeerForm.birthDate + '","picture":"' + this.reindeerPicture + '","userId":"' + this.userId + '"}')
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

  updateReindeer() {

  }

  loadDetails(reindeerId: string) {
    this.reindeerProvider.getDetails(reindeerId)
      .then(data => {
        this.reindeerForm.name = data[0].name;
        this.reindeerForm.gender = "male"; //this.reindeerForm.gender = data[0].gender;
        this.reindeerForm.alive = data[0].status.toString();
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

  takePicture() {

    this.camera.getPicture(this.options).then((imageData) => {
      this.reindeerPicture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.showError("Unable to take picture, please try again.")
    });
  }



}
