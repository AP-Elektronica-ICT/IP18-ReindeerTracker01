import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'

})
export class RegisterPage {

    constructor(public nav: NavController, private toastCtrl: ToastController, public navParams: NavParams, public reindeerProvider: ReindeerServiceProvider, private storage: Storage) {

    }

    register(firstName, lastName, email, password, repeatpassword) {
        if (firstName == "" || lastName == "" || email == "" || password == "" || repeatpassword == "") {
            let toast = this.toastCtrl.create({
                message: 'Something went wrong please try again',
                duration: 3000
            });
            toast.present();
        }
        else if (password != repeatpassword) {
            let toast = this.toastCtrl.create({
                message: 'Your passwords are not the same',
                duration: 3000
            });
            toast.present();
        }
        else {
            this.reindeerProvider.login('{"firstname":"' + firstName + '","lastname":"' + lastName + '","email":"' + email + '","password":"' + password + '","repeatpassword":"' + repeatpassword + '"}')
                .then(data => {
                    console.log(firstName, lastName, email, password, repeatpassword)



                });
        }

    }




} 