import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TrackersPage } from '../trackers/trackers';
import { ReindeerPage } from '../reindeer/reindeer';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  trackers: any;
  range : number

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController) {
  }

  cValue(event, nome) {
    console.log("SliderValue", event._valA);
}



  manageTrackers() {
    this.nav.push(TrackersPage, {});
  }

  manageReindeer() {
    this.nav.push(ReindeerPage, {});
  }
}
