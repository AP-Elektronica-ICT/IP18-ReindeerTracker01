import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation'; 
import { DetailPage } from '../detail/detail';
declare var google;
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage{
 
  @ViewChild('map') mapElement: ElementRef;
 
  map: any;
  mapInitialised: boolean = false;
  apiKey: string = "AIzaSyA4JravLPxlSKJZ9gadEoSmv27MPH00xAI";
  markers: any = [];
  
 
  constructor(public nav: NavController, public connectivityService: ConnectivityService, private geolocation: Geolocation) {
    this.loadGoogleMaps();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Maps');
      
      
  }



  data: IReindeer[] = 
  [
    {
      "id": 74585,
      "activity":  new Date(2018,2,23,14,2),
      "status": true,
      "battery": 98,
      "lat":51.347732,
      "long":4.705509
    },
    {
      "id": 35982,
      "activity":  new Date(2017,2,23,4,2),
      "status": false,
      "battery": 35,
      "lat":51.347899,
      "long":4.711914
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
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true,
        mapTypeControl: true
      }

 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      
      this.addMarker(51.347732,4.705509,"1","https://thumb.ibb.co/dfB2fx/deer.png");
      this.addMarker(51.347899,4.711914,"2","https://thumb.ibb.co/dfB2fx/deer.png");
      this.addMarker(position.coords.latitude,position.coords.longitude,"1","");

      this.markers[2].addListener('click', function() {
        console.log("HEJ");
        this.nav.push(DetailPage);
      });

      

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
 
    window.addEventListener('online', onOnline, false);
    window.addEventListener('offline', onOffline, false);

    
 
  }
 

  addMarker(lat: number, lng: number, lbl: string, icon: string): void {

    let latLng = new google.maps.LatLng(lat, lng);

    

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      //label: lbl,
      icon:icon
    });

    this.markers.push(marker);

  }

  openDetail(item : any){
    this.nav.push(DetailPage, {
      item : item
  });

  }
}

interface IReindeer
{
id : number;
activity : Date;
status : boolean;
battery : number;
lat: number;
long: number;
}
