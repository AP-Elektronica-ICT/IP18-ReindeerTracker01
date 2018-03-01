import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { DetailPage } from '../detail/detail';
import { SettingsPage } from '../settings/settings';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
import { Serializer } from '@angular/compiler';
import { ReindeerPage } from '../reindeer/reindeer';
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;

  map: any;
  mapInitialised: boolean = false;
  apiKey: string = "AIzaSyA4JravLPxlSKJZ9gadEoSmv27MPH00xAI";
  markers: any = [];
  reindeer: IReindeer[];


  constructor(public nav: NavController, public connectivityService: ConnectivityService, private geolocation: Geolocation, public reindeerProvider: ReindeerServiceProvider) {
    this.loadReindeer();
  }

  /*data: IReindeer[] =
    [
      {
        "id": 74585,
        "activity": new Date(2018, 2, 23, 14, 2),
        "status": true,
        "battery": 98,
        "lat": 51.347732,
        "long": 4.705509
      },
      {
        "id": 35982,
        "activity": new Date(2017, 2, 23, 4, 2),
        "status": false,
        "battery": 35,
        "lat": 51.347899,
        "long": 4.711914
      }
    ]*/



  loadReindeer() {
    this.reindeerProvider.getUsers()
      .then(data => {
        this.reindeer = data;
        console.log(data);
      });

    this.loadGoogleMaps();
  }


  loadGoogleMaps() {

    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      if (this.connectivityService.isOnline()) {

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
      this.addMarker(position.coords.latitude, position.coords.longitude, "1", "");

      for (let i = 0; i < this.reindeer.length; i++) {
        this.addMarker(this.reindeer[i].lat, this.reindeer[i].long, "1", "https://thumb.ibb.co/dfB2fx/deer.png");
      }

      for (let i = 1; i < this.markers.length; i++) {
        this.markers[i].addListener('click', (event) => {
          this.openDetail(false,i-1);
      });

      }


      var latlngbounds = new google.maps.LatLngBounds();
      for (let i = 0; i < this.markers.length; i++) {
        latlngbounds.extend(this.markers[i].position);
      }
      this.map.fitBounds(latlngbounds);


    });


  }

  addConnectivityListeners() {

    let onOnline = () => {

      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {

          this.loadGoogleMaps();

        } else {

          if (!this.mapInitialised) {
            this.initMap();
          }

        }
      }, 2000);

    };

    let onOffline = () => {
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
      icon: icon
    });

    this.markers.push(marker);
  }


  openDetail(isSerialnumber: boolean, item: number) {
    if(isSerialnumber){
      this.nav.push(DetailPage, {
        item: item
    });
    }
    else{
      this.nav.push(DetailPage, {
        item: this.reindeer[item].reindeerId
    });
    }
    
    
  }
  refresh() {
    console.log("refresh");
    this.loadReindeer();
  }
  openSettings() {
    this.nav.push(SettingsPage);
  }
  addReindeer(){
    this.nav.push(ReindeerPage);
  }
}

export interface IReindeer {
  serialnumber: number;
  reindeerId: number;
  time: Date;
  status: boolean;
  battery: number;
  lat: number;
  long: number;
}
