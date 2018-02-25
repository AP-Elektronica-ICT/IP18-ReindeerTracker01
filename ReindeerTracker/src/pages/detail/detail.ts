import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("ID IS:" + this.navParams.get('id')) //Data die je meekrijgt van de homepage
  }

}
