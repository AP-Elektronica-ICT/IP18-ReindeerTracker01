import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { IReindeer } from '../home/home';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-trakers',
  templateUrl: 'trackers.html'
})
export class TrackersPage {

  lastLocRange: any;
  trackers: any;
  hash: string;
  reindeer: IReindeer[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, private Scanner: BarcodeScanner, public alertCtrl: AlertController, public toastCtrl: ToastController, public reindeerProvider: ReindeerServiceProvider) {
    this.getTrackers();

    /*storage.get('lastLocRange').then((val) => {
      this.lastLocRange = val;
      console.log("Opgehaalde waarde:" + val)
    });*/

    storage.get('hash').then((val) => {
      this.hash = val;
    });
    
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
            this.scanCode(function (code: number, newThis: any) {
              newThis.checkTrackers(code);
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

  deleteTracker(serialnumber: string) {
    let confirm = this.alertCtrl.create({
      title: 'Choose an option',
      message: "Do you really want to delete this tracker? This action can't be undone unless you scan the tracker again.",
      buttons: [
        {
          text: 'Yes, delete permanently',
          handler: () => {
            this.reindeerProvider.deleteTracker('{"serialnumber":"' + serialnumber + '","hash":"' + this.hash + '"}')
              .then(data => {
                if (data) {
                  let toast = this.toastCtrl.create({
                    message: 'Tracker succesfully removed from the system.',
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

  unassignTracker(serialnumber: string) {
    let confirm = this.alertCtrl.create({
      title: 'Choose an option',
      message: "Do you want to unassign this tracker?",
      buttons: [
        {
          text: 'Yes, unassign',
          handler: () => {
            this.reindeerProvider.unassignTracker('{"serialnumber":"' + serialnumber + '","userId":"' + this.hash + '"}')
              .then(data => {
                if (data) {
                  let toast = this.toastCtrl.create({
                    message: 'Tracker succesfully unassigned from the reindeer.',
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

  scanCode(callbackFunction: any) {
    this.Scanner.scan().then((barcodeData) => {
      console.log(barcodeData.text);
      callbackFunction(Number(barcodeData.text), this);
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
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  getTrackers() {

    this.reindeerProvider.getTrackers(this.hash)
      .then(data => {
        this.trackers = data;
        console.log(data);
      });
  }

  checkTrackers(serialnumber: number) {
    this.reindeerProvider.checkBeforeAddTracker(serialnumber,this.hash)
      .then(data => {
        if (data[0].exist == "true" && data[0].added == "false") {
          this.reindeerProvider.addTracker('{"serialnumber":"' + serialnumber + '","hash":"' + this.hash + '"}')
            .then(data => {
              if (data) {
                let toast = this.toastCtrl.create({
                  message: 'Tracker succesfully added to the system.',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                this.refresh();
              }
              else {
                let toast = this.toastCtrl.create({
                  message: 'Something went wrong, please try again later',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              }
            });
        }
        else if (data[0].exist == "true" && data[0].added == "true") {
          let toast = this.toastCtrl.create({
            message: 'This tracker is already registered to the system.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
        else if (data[0].exist == "false") {
          let toast = this.toastCtrl.create({
            message: 'This is not a valid key.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
      });
  }

  assignTracker(serialnumber: number) {

    this.reindeerProvider.getReindeer(this.hash)
      .then(data => {
        this.reindeer = data;
        console.log(data);

        let alert = this.alertCtrl.create();
        alert.setTitle('Assign tracker to:');

        for (let i = 0; i < this.reindeer.length; i++) {
          if (this.reindeer[i].serialnumber == "") {
            console.log(this.reindeer[i].reindeerId);
            alert.addInput({
              type: 'radio',
              label: "ID: " + this.reindeer[i].reindeerId + " Name: " + this.reindeer[i].name,
              value: this.reindeer[i].reindeerId,
              checked: false
            });
          }
        }


        alert.addButton('Cancel');
        alert.addButton({
          text: 'Assign',
          handler: data => {
            console.log("Reindeerid: " + data);
            this.reindeerProvider.assignTracker('{"serialnumber":"' + serialnumber + '","hash":"' + this.hash + '","reindeerId":"' + data + '"}')
              .then(data => {
                if (data) {
                  let toast = this.toastCtrl.create({
                    message: 'The tracker is successfully assigned to the reindeer.',
                    duration: 3000,
                    position: 'top'
                  });
                  toast.present();
                  this.refresh();
                }
                else {
                  let toast = this.toastCtrl.create({
                    message: 'Something went wrong, please try again later',
                    duration: 3000,
                    position: 'top'
                  });
                  toast.present();
                }
              });

          }
        });
        alert.present();

      });
  }


  showInfo(serial: string) {
    this.reindeerProvider.getReindeer(this.hash)
      .then(data => {
        let reindeerList = data;
        for (let i = 0; i < reindeerList.length; i++) {
          if (reindeerList[i].serialnumber == serial) {
            this.reindeerProvider.getDetails(reindeerList[i].reindeerId,this.lastLocRange,this.hash)
              .then(data => {
                let reindeerDetailList = data;
                let alert = this.alertCtrl.create({
                  title: 'More info:',
                  subTitle: `Tracker ID: ` + serial + `<br>Reindeer ID: ` + reindeerDetailList[0].reindeerId + `<br>Reindeer name: ` + reindeerDetailList[0].name,
                  buttons: ['Close']
                });
                alert.present();
              });
          }
        }
      });
  }

  refresh() {
    console.log("Refresh start");
    this.trackers = [];
    this.getTrackers();
    let toast = this.toastCtrl.create({
      message: 'Refreshing data...',
      duration: 2000,
      position: 'middle'
    });
    toast.present();
    console.log("Refresh done");
  }

}


export interface ITracker {
  serialnumber: number;
  assigned: boolean;
  name: string;
}

export interface ICheckTracker {
  exist: string;
  added: string;
}