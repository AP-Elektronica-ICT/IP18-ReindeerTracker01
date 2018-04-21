import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { TrackersPage } from '../trackers/trackers';
import { ReindeerPage } from '../reindeer/reindeer';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  trackers: any;
  lastLocRange : number
  mapType;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, private storage: Storage, public GlobalEvent: Events) {
    
    storage.get('lastLocRange').then((val) => {
      this.lastLocRange = val;
      console.log("Opgehaalde waarde:" + val)
    });
    storage.get('mapTypeSetting').then((val) => {
      if(val != null){
        this.mapType = val;
      }
      else{
        this.mapType = "HYBRID"
      }
    });

  }


  manageTrackers() {
    this.nav.push(TrackersPage, {});
  }

  manageReindeer() {
    this.nav.push(ReindeerPage, {});
  }

  changeRange(){
    this.storage.set("lastLocRange",this.lastLocRange)
  }
  changeMapType(){
    this.storage.set("mapTypeSetting",this.mapType)
    this.GlobalEvent.publish('menu',"mapTypeUpdate");
  }
}
