import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { IReindeer } from '../home/home';


@Component({
  selector: 'page-reindeer',
  templateUrl: 'reindeer.html'
  
})
export class ReindeerPage {
  reindeer: IReindeer[];

    constructor(public nav: NavController, public navParams: NavParams,public reindeerProvider: ReindeerServiceProvider) {
      this.loadReindeer();

}

loadReindeer() {
  this.reindeerProvider.getUsers()
    .then(data => {
      this.reindeer = data;
      console.log(data);
    });
}

}