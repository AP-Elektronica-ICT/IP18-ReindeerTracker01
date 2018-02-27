import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  
})
export class LoginPage {

    constructor(public nav: NavController, public navParams: NavParams) {

    
}

  nextPage(){
    this.nav.push(HomePage);
  }




}
