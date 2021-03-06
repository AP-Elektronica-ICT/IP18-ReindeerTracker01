
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { Storage } from '@ionic/storage';
import { EditReindeerPage } from '../editreindeer/editreindeer'; 


declare var google;

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: string = "AIzaSyA4JravLPxlSKJZ9gadEoSmv27MPH00xAI";
  markers: any = [];
  avaregeDistance: any;
  markerspath: any = [];
  details: IDetails[];
  LastLocLat: number;
  LastLocLong: number;
  lastLocRange: number;
  hash: string;
  date: string;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, public nav: NavController, public connectivityService : ConnectivityService, private geolocation: Geolocation, public reindeerProvider: ReindeerServiceProvider, private storage: Storage) {

    storage.get('lastLocRange').then((val) => {
      this.lastLocRange = val;
    });
    
   }

   ionViewDidLoad() {
    this.storage.get('hash').then((val) => {
      this.hash = val;
      this.loadDetails();
    });
  }

  loadGoogleMaps() {

    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {


      if (this.connectivityService.isOnline()) {

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
        } else {
          script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
        }

        document.body.appendChild(script);

      }
    }
    else {

      if (this.connectivityService.isOnline()) {
        this.initMap();
      }

    }


  }

  loadDetails() {
    this.reindeerProvider.getDetails(this.navParams.get('reindeerId').toString(),this.lastLocRange, this.hash)
      .then(data => {
        this.details = data;
        this.loadGoogleMaps();
        console.log(data);
      });
  }

  initMap() {

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
      this.updateMapType()

      if (this.details[0].locations.length != 0) {
        for (let i = 1; i < this.details[0].locations.length; i++) {
          this.addMarker(this.details[0].locations[i].lat, this.details[0].locations[i].long, "https://thumb.ibb.co/jOO0Nc/pin.png");
        }
        this.addMarker(this.details[0].locations[0].lat, this.details[0].locations[0].long, "https://thumb.ibb.co/dfB2fx/deer.png");

        
        for (let i = 0; i < this.markers.length; i++) {           
          this.markers[i].addListener('click', (event) => {
            let toast = this.toastCtrl.create({
              message: "Date Location " + this.details[0].locations[this.markers.length-i -1].time,
              duration: 2000,
            });
            toast.present(toast);

          });

        }
 

      var latlngbounds = new google.maps.LatLngBounds();
      for (var i = 0; i < this.markers.length; i++) {
        latlngbounds.extend(this.markers[i].position);
        this.markerspath.push(this.markers[i].position);
      }
      this.map.fitBounds(latlngbounds);

      var Showplan = new google.maps.Polyline({
        path: this.markerspath,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 4
      });
      Showplan.setMap(this.map);
      this.calculateAvarageDistance();
      var Circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        center: { lat: parseFloat(this.details[0].locations[0].lat), lng: parseFloat(this.details[0].locations[0].long) },
        radius: this.calculateAvarageDistance()*1000 
      });
      Circle.setMap(this.map);
    }
    else{
      this.addMarker(position.coords.latitude, position.coords.longitude, "");
    }
    });
    




  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
   }

    deg2rad(deg) {
    return deg * (Math.PI/180)
   }

   calculateAvarageDistance(){
     for(var i = 0;i<this.details[0].locations.length-1;i++){
      this.avaregeDistance=  this.getDistanceFromLatLonInKm(this.details[0].locations[i].lat,this.details[0].locations[i].long,this.details[0].locations[i+1].lat,this.details[0].locations[i+1].long) 
    } 
    return this.avaregeDistance 

   }

   openEditPage(){ 
    this.nav.push(EditReindeerPage, {
      reindeerId: this.navParams.get('reindeerId').toString(),
    });
  } 


  addConnectivityListeners() {

    let onOnline = () => {

      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {

          this.loadGoogleMaps();

        } else {

          if (!this.mapInitialised) {
          }

        }
      }, 2000);

    };

    let onOffline = () => {
    };

    window.addEventListener('online', onOnline, false);
    window.addEventListener('offline', onOffline, false);



  }




  addMarker(lat: number, lng: number, image: string): void {

    let latLng = new google.maps.LatLng(lat, lng);


    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: 'Uluru (Ayers Rock)',
      position: latLng,
      //label: lbl,
      icon: image
    });

    this.markers.push(marker);

  }

  refresh() {
    this.markers = [];
    this.markerspath = [];
    this.loadDetails();
    let toast = this.toastCtrl.create({
      message: 'Refreshing data...',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  updateMapType(){
    this.storage.get('mapTypeSetting').then((val) => {
      console.log("mapTypeSetting: " + val);
      switch (val) {
        case 'NORMAL': {
          this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP) 
          break;
        }
        case 'SATELLITE': {
          this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE)
          break;
        }
        case 'HYBRID': {
          this.map.setMapTypeId(google.maps.MapTypeId.HYBRID)
          break;
        }
        case 'TERRAIN': {
          this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN)
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}


export interface IDetails {
  reindeerId: string;
  serialnumber: string;
  time: Date;
  averageDistance: number;
  status: boolean;
  firstLocationLat : number;
  firstLocationLong : number;
  battery: number;
  lat: number;
  long: number;
  birthDate: Date;
  name: string;
  locations: any[];
  pictures: any[];
  gender: string;
  extraInfo: string;
}
