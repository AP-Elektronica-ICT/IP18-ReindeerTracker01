import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events, AlertController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { RegisterPage } from '../register/register';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'

})
export class LoginPage {

  constructor(public menuEvent: Events, public nav: NavController, private toastCtrl: ToastController, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, private storage: Storage, alertCtrl: AlertController, private backgroundMode: BackgroundMode) {
    this.backgroundMode.enable();


    storage.get('hash').then((val) => {
      if (val != "0" && val != null && val != "") {
        console.log("ALREADY LOGGED IN WITH HASH: " + val);
        storage.get('firstName').then((val) => {

          let toast = this.toastCtrl.create({
            message: 'Already logged in, welcome ' + val + "!",
            duration: 2000,
            position: 'top'
          });
          toast.present();
          this.nav.push(HomePage);
        });
      }
    });

    /*this.plt.ready().then((readySource) => {
      this.localNotifications.on('click', (notification, state) => {
        let json = JSON.parse(notification.data);
   
        let alert = alertCtrl.create({
          title: notification.title,
          subTitle: json.mydata
        });
        alert.present();
      })
    });*/

  }

  login(email, password) {
    console.log(email, password)
    this.reindeerProvider.login('{"email":"' + email + '","password":"' + password + '"}')
      .then(data => {

        console.log("Incoming data: " + data)

        if (data[0].status == "false") {
          let toast = this.toastCtrl.create({
            message: 'The email or password you entered is incorrect.',
            duration: 3000
          });
          toast.present();
        }

        else {
          this.storage.set("hash", data[0].status)
          this.storage.set("firstName", data[0].firstName)
          this.menuEvent.publish('menu', "showWelcome");
          this.nav.push(HomePage);
          console.log("LOGGED IN WITH HASH: " + data[0].status);
        }

      });

  }

  register() {
    this.nav.push(RegisterPage);
  }
}
