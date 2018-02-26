import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private Scanner: BarcodeScanner, public alertCtrl: AlertController) {

  }

  addCode() {


    let confirm = this.alertCtrl.create({
      title: 'Choose an option',
      message: 'Do you want to scan the QR code or enter the code manually?',
      buttons: [
        {
          text: 'Enter manually',
          handler: () => { this.manualEnterCode(); }
        },
        {
          text: 'Scan code',
          handler: () => { this.scanCode(); }
        },
        {
          text: 'Cancel',
          handler: () => { }
        }
      ]
    });
    confirm.present();
  }

  scanCode() {
    console.log('Scan clicked');
    this.Scanner.scan().then((barcodeData) => {
      console.log(barcodeData.text);
      return barcodeData.text;
    }, (err) => {
      console.log("Error:" + err);
    });
  }

  manualEnterCode() {
    let prompt = this.alertCtrl.create({
      title: 'Enter code',
      message: "Enter the 5 digit key displayed on the bottom of the tag.",
      inputs: [
        {
          name: 'title',
          placeholder: '12345'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Add key',
          handler: data => {
            var key = Number(data.title)
            if (Number.isInteger(key) && key > 0 && key < 100000 && data.title.length == 5) {
              //Juiste code ingevoerd
            }
            else {
              let confirm = this.alertCtrl.create({
                title: 'Unvalid key',
                message: 'The key you entered is unvalid, please try again.',
                buttons: [
                  {
                    text: 'Cancel',
                    handler: () => { }
                  },
                  {
                    text: 'Retry',
                    handler: () => {
                      this.manualEnterCode();
                    }
                  }
                ]
              });
              confirm.present();
            }
          }
        }
      ]
    });
    prompt.present();
  }



}
