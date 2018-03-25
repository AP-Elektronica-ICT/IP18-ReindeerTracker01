import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { IDetails } from '../detail/detail';

@Component({
    selector: 'page-report',
    templateUrl: 'report.html'
})

export class ReportPage {

    userId: string = "1";
    details: IDetails[];
    datetime: String;
    latLast: string;
    longLast: string;
    cityLast: String;




    constructor(private nativeGeocoder: NativeGeocoder, public nav: NavController, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController) {
        this.loadDetails(this.navParams.get('reindeerId'));
    }



    loadDetails(reindeerId: string) {
        this.reindeerProvider.getDetails(reindeerId)
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

        this.nativeGeocoder.reverseGeocode(parseInt(this.latLast), parseInt( this.longLast))
            .then((result: NativeGeocoderReverseResult) => this.cityLast = JSON.stringify(result))
            .catch((error: any) => console.log(error));
    }





}
