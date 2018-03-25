import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { IDetails } from '../detail/detail';

@Component({
    selector: 'page-report',
    templateUrl: 'report.html'
})

export class ReportPage {

    userId: string = "1";
    details: IDetails[];
    datetime: String;
    latLast: String;
    longLast: String;




    constructor(public nav: NavController, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController) {
        this.loadDetails(this.navParams.get('reindeerId'));
    }



    loadDetails(reindeerId: string) {
        this.reindeerProvider.getDetails(reindeerId)
            .then(data => {
                this.details = data;
                console.log(data)
            });
            this.calculations();



    }

    calculations(){
        var currentdate = new Date();
        this.datetime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear()
        //this.latLast = this.details[0].locations[0].lat
       // console.log(this.details[0].locations[0].lat)
        //this.longLast = this.details[0].locations[0].long
    }

    



}
