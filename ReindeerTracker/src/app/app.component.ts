import { Component, ViewChild, Inject } from '@angular/core';
import { Platform, Events, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { AddReindeerPage } from '../pages/addreindeer/addreindeer';
import { ReindeerPage } from '../pages/reindeer/reindeer';
import { TrackersPage } from '../pages/trackers/trackers';
import { SettingsPage } from '../pages/settings/settings';
import { AccountSettingsPage } from '../pages/accountsettings/accountsettings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav) nav;

  firstName: string;

  constructor(private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menuEvent: Events, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    })

    storage.get('firstName').then((val) => {
      this.firstName = val;
    });
  }

  buttonPress(action: string){
    this.menuEvent.publish('menu',action);
    this.menuCtrl.close();
    console.log("MENU ACTIE: " + action)
  }

  addReindeer() {
    this.menuCtrl.close();
    this.nav.push(AddReindeerPage);
  }
  showReindeer() {
    this.menuCtrl.close();
    this.nav.push(ReindeerPage);
  }
  editTrackers() {
    this.menuCtrl.close();
    this.nav.push(TrackersPage);
  }
  editSettings() {
    this.menuCtrl.close();
    this.nav.push(SettingsPage);
  }
  accountSettings() {
    this.menuCtrl.close();
    this.nav.push(AccountSettingsPage);
  }
}

