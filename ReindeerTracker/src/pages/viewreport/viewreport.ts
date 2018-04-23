import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { Storage } from '@ionic/storage';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
    selector: 'page-viewreport',
    templateUrl: 'viewreport.html'
})

export class ViewReportPage {

    hash: string;
    reindeerId: string;

    reports: IReport[];

    constructor(private _DomSanitizationService: DomSanitizer, public nav: NavController, private toastCtrl: ToastController, public storage: Storage, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, public alertCtrl: AlertController) {
        this.reindeerId = this.navParams.get('reindeerId');

        storage.get('hash').then((val) => {
            this.hash = val;
            this.loadDetails(this.reindeerId);
        });
    }


    loadDetails(reindeerId: string) {
        this.reindeerProvider.getReport(this.reindeerId, this.hash)
            .then(data => {
                this.reports = data;
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

export interface IReport {
    reindeerId: string;
    name: string;
    gender: string;
    birthDate: Date;
    serialnumber: number;
    dateWhenAdded: Date;
    dateWhenFound : Date;
    cityWhereAdded : string;
    latWhereAdded: number;
    longWhereAdded: number;
    cityWhereFound: string;
    latWhereFound: number;
    longWhereFound: number;
    picture: any;
  }