import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { Camera, CameraOptions } from '@ionic-native/camera';



@Component({
  selector: 'page-addreindeer',
  templateUrl: 'addreindeer.html'

})

export class AddReindeerPage {

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
    birthdate: ''
  };

  public reindeerPicture: string;

  constructor(public nav: NavController, public navParams: NavParams, private toastCtrl: ToastController, private camera: Camera) {

  }

  addReindeer() {
    if (this.reindeerForm.name == "") {
      this.showError("Please enter the name of the reindeer.");
    }
    else if (this.reindeerForm.gender == "") {
      this.showError("Please select the gender of the reindeer.");
    }
    else if (this.reindeerForm.alive == "") {
      this.showError("Please select if the reindeer is alive.");
    }
    else if (this.reindeerForm.birthdate == ""){
      this.showError("Please enter the birth date of the reindeer.");
    }
    else if (this.reindeerPicture == null){
      this.showError("Please add a picture of the reindeer.");
    }
    else {
      //DATA IN DATABASE ZETTEN
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

  takePicture() {

    this.camera.getPicture(this.options).then((imageData) => {
      this.reindeerPicture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      this.showError("Unable to take picture, please try again.")
    });
  }



}
