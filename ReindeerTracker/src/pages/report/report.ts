import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { IDetails } from '../detail/detail';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

@Component({
    selector: 'page-report',
    templateUrl: 'report.html'
})

export class ReportPage {

    lastLocRange: any;
    userId: string = "1";
    details: IDetails[];
    datetime: String;
    picture: string;
    latLast: string;
    longLast: string;
    cityLast: String;
    cityFirst: String;
    age: number;

    options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 1000,
        targetHeight: 1000
    }




    constructor(public nav: NavController, private toastCtrl: ToastController,public storage:Storage, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController, private camera: Camera, public nativeGeocoder: NativeGeocoder) {
        this.loadDetails(this.navParams.get('reindeerId'));

       
    }



    loadDetails(reindeerId: string) {
        this.reindeerProvider.getDetails(reindeerId,this.lastLocRange)
            .then(data => {
                this.details = data;
                console.log(data)
                this.calculations();
            });

    }

    calculations() {
        var currentdate = new Date();
        this.datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear()
        this.latLast = this.details[0].locations[0].lat
        this.longLast = this.details[0].locations[0].long

        this.nativeGeocoder.reverseGeocode(parseFloat(this.latLast), parseFloat(this.longLast))
            .then((result: NativeGeocoderReverseResult) => this.cityLast = JSON.stringify(result.locality))
            .catch((error: any) => console.log(error));

        this.nativeGeocoder.reverseGeocode(this.details[0].firstLocationLat, this.details[0].firstLocationLong)
            .then((result: NativeGeocoderReverseResult) => this.cityFirst = JSON.stringify(result.locality))
            .catch((error: any) => console.log(error));
    }

    takePicture() {

        this.camera.getPicture(this.options).then((imageData) => {
            this.picture = ('data:image/jpeg;base64,' + imageData);
        }, (err) => {
            this.showError("Unable to take picture, please try again.")
        });

    }

    deletePicture() {
        this.picture = null
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
