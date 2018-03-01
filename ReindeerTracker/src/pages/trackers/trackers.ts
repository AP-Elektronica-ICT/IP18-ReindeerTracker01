import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';


@Component({
  selector: 'page-trakers',
  templateUrl: 'trackers.html'
})
export class TrackersPage {

  trackers: any;
  userId: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Scanner: BarcodeScanner, public alertCtrl: AlertController, public toastCtrl: ToastController, public reindeerProvider: ReindeerServiceProvider) {
    this.getTrackers();
  }


  addTracker() {

    let confirm = this.alertCtrl.create({
      title: 'Choose an option',
      message: 'Do you want to scan the QR code or enter the code manually?',
      buttons: [
        {
          text: 'Enter manually',
          handler: () => {

            this.manualEnterCode(function (code: number, newThis: any) {
              newThis.checkTrackers(code);
            });
          }
        },
        {
          text: 'Scan code',
          handler: () => {
            this.scanCode(function (code: number) {
              console.log("Functie klaar" + code);
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

  scanCode(callbackFunction: any) {
    this.Scanner.scan().then((barcodeData) => {
      console.log(barcodeData.text);
      callbackFunction(Number(barcodeData.text));
    }, (err) => {
      console.log("Error:" + err);
      this.showError(err);
    });
  }

  manualEnterCode(callbackFunction: any) {
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
            callbackFunction(data.title, this);
          }
        }
      ]
    });
    prompt.present();

  }


  showError(error: string) {
    let toast = this.toastCtrl.create({
      message: error,
      duration: 3000
    });
    toast.present();
  }

  getTrackers() {

    this.reindeerProvider.getTrackers(1)
      .then(data => {
        this.trackers = data;
        console.log(data);
      });
  }

  checkTrackers(serialnumber: number) {
    this.reindeerProvider.checkTracker(serialnumber)
      .then(data => {
        console.log("Added:"+data[0].added);
        console.log("Exist:"+data[0].exist);


        if (data[0].exist  && !data[0].added) {
          this.reindeerProvider.addTracker('{"serialnumber":"' + serialnumber + '","userId":"' + this.userId + '"}')
            .then(data => {
              if(data){
                let toast = this.toastCtrl.create({
                  message: 'Tracker succesfully added to the system.',
                  duration: 3000
                });
                toast.present();
              }
              else{
                let toast = this.toastCtrl.create({
                  message: 'Something went wrong, please try again later',
                  duration: 3000
                });
                toast.present();
              }
             });
        }
        else if(data[0].exist && data[0].added){
          let toast = this.toastCtrl.create({
            message: 'This tracker is already registered to the system.',
            duration: 3000
          });
          toast.present();
        }
        else if(!data[0].exist){
          let toast = this.toastCtrl.create({
            message: 'This is not a valid key.',
            duration: 3000
          });
          toast.present();
        }
      });
  }


}


export interface ITracker {
  serialnumber: number;
  assigned: boolean;
}

export interface ICheckTracker {
  exist: boolean;
  added: boolean;
}



/*
            var key = Number(data.title)
            if (Number.isInteger(key) && key > 0 && key < 100000 && data.title.length == 5) {
              return key;
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
            }*/