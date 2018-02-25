import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation'; 
declare var google;
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
 
  @ViewChild('map') mapElement: ElementRef;
 
  map: any;
  mapInitialised: boolean = false;
  apiKey: any = "AIzaSyDZi9ck-Szv3dDW-9oDReN93WTB5NZz_Zc";
  ;


 
  constructor(public nav: NavController, public connectivityService: ConnectivityService, private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.loadGoogleMaps();
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
    },
    {
      "id": 3,
      "activity":  new Date(2018,2,23,14,2),
      "status": true,
      "battery": 75
    },
    {
      "id": 4,
      "activity":  new Date(2017,2,23,4,2),
      "status": false,
      "battery": 35
    },
    {
      "id": 5,
      "activity":  new Date(2018,2,23,14,2),
      "status": true,
      "battery": 75
    },
    {
      "id": 6,
      "activity":  new Date(2017,2,23,4,2),
      "status": false,
      "battery": 35
    }
  ]



 
  loadGoogleMaps(){
 
    this.addConnectivityListeners();
 
  if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
    console.log("Google maps JavaScript needs to be loaded.");
    this.disableMap();
 
    if(this.connectivityService.isOnline()){
      console.log("online, loading map");
 
      //Load the SDK
      window['mapInit'] = () => {
        this.initMap();
        this.enableMap();
      }
 
      let script = document.createElement("script");
      script.id = "googleMaps";
 
      if(this.apiKey){
        script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
      } else {
        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';      
      }
 
      document.body.appendChild(script); 
 
    }
  }
  else {
 
    if(this.connectivityService.isOnline()){
      console.log("showing map");
      this.initMap();
      this.enableMap();
    }
    else {
      console.log("disabling map");
      this.disableMap();
    }
 
  }
 
  }
 
  initMap(){
 
    this.mapInitialised = true;
 
    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
    });
 
  }
 
  disableMap(){
    console.log("disable map");
  }
 
  enableMap(){
    console.log("enable map");
  }
 
  addConnectivityListeners(){
 
    let onOnline = () => {
 
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
 
          this.loadGoogleMaps();
 
        } else {
 
          if(!this.mapInitialised){
            this.initMap();
          }
 
          this.enableMap();
        }
      }, 2000);
 
    };
 
    let onOffline = () => {
      this.disableMap();
    };
 
    document.addEventListener('online', onOnline, false);
    document.addEventListener('offline', onOffline, false);
 
  }
 
}

interface IReindeer
{
id : number;
activity : Date;
status : boolean;
battery : number;
}
