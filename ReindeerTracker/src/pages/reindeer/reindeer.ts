import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { IReindeer } from '../home/home';


@Component({
  selector: 'page-reindeer',
  templateUrl: 'reindeer.html'
  
})
export class ReindeerPage {
  reindeer: IReindeer[];
  userId: string = "1";

    constructor(public nav: NavController, public navParams: NavParams,public reindeerProvider: ReindeerServiceProvider,private toastCtrl: ToastController) {
      this.loadReindeer();

}

loadReindeer() {
  this.reindeerProvider.getReindeer(this.userId)
    .then(data => {
      this.reindeer = data;
      console.log(data);
    });
}

refresh(){
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