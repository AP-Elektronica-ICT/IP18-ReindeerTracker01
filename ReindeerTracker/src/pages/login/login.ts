import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  
})
export class LoginPage {

    constructor(public nav: NavController, public navParams: NavParams, private storage: Storage) {
    storage.set("userId","1")
   }

  nextPage(){
    this.nav.push(HomePage);
  }




}
