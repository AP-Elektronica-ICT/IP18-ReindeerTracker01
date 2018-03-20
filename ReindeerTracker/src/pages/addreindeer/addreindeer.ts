import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';


@Component({
  selector: 'page-addreindeer',
  templateUrl: 'addreindeer.html'
  
})
export class AddReindeerPage {

    userId: string = "1";
  
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
      birthDate: '',
      pictures: []
    };
  
    constructor(public nav: NavController, public navParams: NavParams, private toastCtrl: ToastController, private camera: Camera, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController) {

    }
  
  
    addReindeer() {
      if (this.reindeerForm.name == "") {
        this.showError("Please enter the name of the reindeer.");
      }
      else {
        //console.log(JSON.stringify(this.reindeerForm));
        this.reindeerProvider.addReindeer(JSON.stringify(this.reindeerForm))//'{"name":"' + this.reindeerForm.name + '","gender":"' + this.reindeerForm.gender + '","birthDate":"' + this.reindeerForm.birthDate + '","picture":"' + this.reindeerPicture + '","userId":"' + this.userId + '"}')
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
  
    takePicture() {
  
      this.camera.getPicture(this.options).then((imageData) => {
        this.reindeerForm.pictures.push('data:image/jpeg;base64,' + imageData)
      }, (err) => {
        this.showError("Unable to take picture, please try again.")
      });
    }

    deletePicture(pictureId:number){
        let confirm = this.alertCtrl.create({
            title: 'Please confirm',
            message: 'Do you really want to remove this picture?',
            buttons: [
              {
                text: 'Cancel',
                handler: () => {
                  
                }
              },
              {
                text: 'Remove',
                handler: () => {
                    this.reindeerForm.pictures.splice(pictureId,1);
                }
              }
            ]
          });
          confirm.present();
    }
}
