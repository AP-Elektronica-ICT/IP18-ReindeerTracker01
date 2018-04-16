import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  
})
export class LoginPage {

    constructor(public nav: NavController, public navParams: NavParams,public reindeerProvider: ReindeerServiceProvider, private storage: Storage) {
    storage.set("userId","1")
   }

 login(email,password){
   console.log(email,password)
   this.reindeerProvider.login('{"email":"' + email + '","password":"' + password + '"}')
   .then(data => {
    console.log(data);
  });

 }




}
