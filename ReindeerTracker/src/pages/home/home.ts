import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
 
  }

  data: IReindeer[] = 
  [
    {
      "id": 1,
      "activity":  new Date(2018,2,23,14,2),
      "status": true,
      "battery": 75
    },
    {
      "id": 2,
      "activity":  new Date(2017,2,23,4,2),
      "status": false,
      "battery": 35
    }
  ]



}

interface IReindeer
{
id : number;
activity : Date;
status : boolean;
battery : number;
}
