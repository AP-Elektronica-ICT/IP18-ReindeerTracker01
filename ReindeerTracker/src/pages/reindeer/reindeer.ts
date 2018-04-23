import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, Events } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { IReindeer } from '../home/home';
import { DetailPage } from '../detail/detail';
import { AddReindeerPage } from '../addreindeer/addreindeer';
import { EditReindeerPage } from '../editreindeer/editreindeer';
import { ReportPage } from '../report/report';
import { Storage } from '@ionic/storage';
import { ViewReportPage } from '../viewreport/viewreport';


@Component({
  selector: 'page-reindeer',
  templateUrl: 'reindeer.html'

})
export class ReindeerPage {
  reindeer: IReindeer[];
  hash: string;

  constructor(public nav: NavController, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, private toastCtrl: ToastController, public alertCtrl: AlertController, private storage: Storage, public GlobalEvent: Events) {

    GlobalEvent.subscribe('reindeer', (action: string) => {
      switch (action) {
  
        case 'refresh': {
          this.reindeer = [];
          this.loadReindeer();
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  

  ionViewDidLoad() {
    this.storage.get('hash').then((val) => {
      this.hash = val;
      this.loadReindeer();
    });
  }

  loadReindeer() {
    this.reindeerProvider.getReindeer(this.hash)
      .then(data => {
        this.reindeer = data;
        console.log(data);
      });
  }

  addReindeer(){
    this.nav.push(AddReindeerPage);
  }

  editReindeer(reindeerId: string){
    this.nav.push(EditReindeerPage, {
      reindeerId: reindeerId,
    });
  }

  reportReindeer(reindeerId: string){
    this.nav.push(ReportPage, {
      reindeerId: reindeerId,
    });
  }

  deleteReindeer(reindeerId: string) {
    let confirm = this.alertCtrl.create({
      title: 'Choose an option',
      message: "Do you really want to delete this reindeer? This action can't be undone unless you manually add the reindeer again.",
      buttons: [
        {
          text: 'Yes, delete permanently',
          handler: () => {
            this.reindeerProvider.deleteReindeer('{"reindeerId":"' + reindeerId + '","hash":"' + this.hash + '"}')
              .then(data => {
                if (data) {
                  console.log(data);
                  let toast = this.toastCtrl.create({
                    message: 'Reindeer succesfully removed from the system.',
                    duration: 3000
                  });
                  toast.present();
                  this.refresh();
                }
                else {
                  let toast = this.toastCtrl.create({
                    message: 'Something went wrong, please try again later',
                    duration: 3000
                  });
                  toast.present();
                }
              });
          }
        },
        {
          text: 'Cancel',
          handler: () => { }
        }
      ]
    });
    confirm.present();
  }

  showInfo(reindeerId: string) {

      this.nav.push(DetailPage, {
        reindeerId: reindeerId,
    });
    
  }

  viewReport(reindeerId: string) {
    this.nav.push(ViewReportPage, {
      reindeerId: reindeerId,
  });
  
}

  refresh() {
    this.reindeer = [];
    this.loadReindeer();
    let toast = this.toastCtrl.create({
      message: 'Refreshing data...',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}