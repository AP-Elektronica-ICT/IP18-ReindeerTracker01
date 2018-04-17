import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { RegisterPage } from '../register/register'; 

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  
})
export class LoginPage {

    constructor(public nav: NavController,private toastCtrl: ToastController, public navParams: NavParams,public reindeerProvider: ReindeerServiceProvider, private storage: Storage) {
      storage.get('hash').then((val) => {
        if(val != "0" && val != null && val != ""){
          console.log("ALREADY LOGGED IN WITH HASH: " + val);
          this.nav.push(HomePage);
        }
      });
    }

 login(email,password){
   console.log(email,password)
   this.reindeerProvider.login('{"email":"' + email + '","password":"' + password + '"}')
   .then(data => {

    if(data[0].status == "false"){
      let toast = this.toastCtrl.create({
        message: 'The email or password you entered is incorrect.',
        duration: 3000
      });
      toast.present();
    }

    else{
      this.storage.set("hash",data[0].status)
      this.nav.push(HomePage);
      console.log("LOGGED IN WITH HASH: " + data[0].status);
    }
      
  });

 }

 nextPage(){ 
  this.nav.push(RegisterPage); 
 } 




}
