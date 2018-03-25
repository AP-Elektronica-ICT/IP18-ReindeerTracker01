import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { IReindeer } from '../home/home';
import { DetailPage } from '../detail/detail';
import { AddReindeerPage } from '../addreindeer/addreindeer';
import { EditReindeerPage } from '../editreindeer/editreindeer';
import { ReportPage } from '../report/report';


@Component({
  selector: 'page-reindeer',
  templateUrl: 'reindeer.html'

})
export class ReindeerPage {
  reindeer: IReindeer[];
  userId: string = "1";

  constructor(public nav: NavController, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, private toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.loadReindeer();

  }

  loadReindeer() {
    this.reindeerProvider.getReindeer(this.userId)
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
            this.reindeerProvider.deleteReindeer('{"reindeerId":"' + reindeerId + '","userId":"' + this.userId + '"}')
              .then(data => {
                if (data) {
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