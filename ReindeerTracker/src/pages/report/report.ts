import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, Events } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { IDetails } from '../detail/detail';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { Storage } from '@ionic/storage';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
    selector: 'page-report',
    templateUrl: 'report.html'
})

export class ReportPage {

    reportForm = {
        hash: '',
        reindeerId: '',
        name: '',
        gender: '',
        birthDate: '',
        serialnumber: '',
        dateWhenAdded: '',
        dateWhenFound: '',
        cityWhereAdded: '',
        latWhereAdded: '',
        longWhereAdded: '',
        cityWhereFound: '',
        latWhereFound: '',
        longWhereFound: '',
        picture: ''
    };


    options: CameraOptions = {
        quality: 5,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 1000,
        targetHeight: 1000
    }


    constructor(private _DomSanitizationService: DomSanitizer, public nav: NavController, private toastCtrl: ToastController, public storage: Storage, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController, private camera: Camera, public nativeGeocoder: NativeGeocoder, public menuEvent: Events) {
        this.reportForm.reindeerId = this.navParams.get('reindeerId');
        this.loadDetails(this.reportForm.reindeerId);

        storage.get('hash').then((val) => {
            this.reportForm.hash = val;
        });
    }


    loadDetails(reindeerId: string) {
        this.reindeerProvider.getDetails(reindeerId, 5, this.reportForm.hash)
            .then(data => {
                this.reportForm.serialnumber = data[0].serialnumber;
                this.reportForm.name = data[0].name;
                this.reportForm.gender = data[0].gender;
                this.reportForm.birthDate = data[0].birthDate.toString();
                var currentdate = new Date();
                this.reportForm.dateWhenAdded = data[0].time.toString();
                this.reportForm.dateWhenFound =  currentdate.getFullYear() + "-" + currentdate.getMonth() + "-" + currentdate.getDay() + " " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                this.reportForm.latWhereAdded = data[0].firstLocationLat.toString()
                this.reportForm.longWhereAdded = data[0].firstLocationLong.toString()
                this.nativeGeocoder.reverseGeocode(parseFloat(this.reportForm.latWhereAdded), parseFloat(this.reportForm.longWhereAdded))
                    .then((result: NativeGeocoderReverseResult) =>  this.reportForm.cityWhereAdded = JSON.stringify(result.locality) )
                    .catch((error: any) => console.log(error));
                this.reportForm.latWhereFound = data[0].locations[0].lat.toString()
                this.reportForm.longWhereFound = data[0].locations[0].long.toString()
                this.nativeGeocoder.reverseGeocode(parseFloat(this.reportForm.latWhereFound), parseFloat(this.reportForm.longWhereFound))
                    .then((result: NativeGeocoderReverseResult) => this.reportForm.cityWhereFound = JSON.stringify(result.locality) )
                    .catch((error: any) => console.log(error));

            });
    }

    takePicture() {

        this.camera.getPicture(this.options).then((imageData) => {
            this.reportForm.picture = ('data:image/jpeg;base64,' + imageData);
        }, (err) => {
            this.showError("Unable to take picture, please try again.")
        });
    }

    deletePicture() {
        this.reportForm.picture = null
    }

    showError(error: string) {
        let toast = this.toastCtrl.create({
            message: error,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }

    report() {
        let toast = this.toastCtrl.create({
            message: 'Sending data to server...',
            duration: 3000,
            position: 'top'
        });
        toast.present();
        this.reindeerProvider.reportReindeer(JSON.stringify(this.reportForm))
            .then(data => {
                if (data) {
                    this.nav.pop();
                    this.menuEvent.publish('reindeer',"refresh");
                    let toast = this.toastCtrl.create({
                        message: 'The reindeer is successfully reported.',
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                }
                else {
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
