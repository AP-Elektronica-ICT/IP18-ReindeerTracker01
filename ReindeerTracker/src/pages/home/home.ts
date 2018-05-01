
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ToastController, MenuController, Events } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { DetailPage } from '../detail/detail';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';

import { GoogleMaps, GoogleMapsEvent, GoogleMapsAnimation, MyLocation, GoogleMap, LocationService } from '@ionic-native/google-maps';
import { AddReindeerPage } from '../addreindeer/addreindeer';
import { ReindeerPage } from '../reindeer/reindeer';
import { TrackersPage } from '../trackers/trackers';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';
import { AccountSettingsPage } from '../accountsettings/accountsettings';
import { Observable } from 'rxjs/Rx';
import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;

  map: GoogleMap;
  reindeer: IReindeer[];
  hash: string;
  myLat: number;
  myLong: number;
  mapTypeSetting;
  lat: number = 0;
  long: number = 0;

  constructor(private localNotifications: LocalNotifications, public nav: NavController, public connectivityService: ConnectivityService, public reindeerProvider: ReindeerServiceProvider, public toastCtrl: ToastController, menu: MenuController, public GlobalEvent: Events, private storage: Storage) {


    GlobalEvent.subscribe('menu', (action: string) => {
      switch (action) {

        case 'refresh': {
          this.refresh()
          break;
        }
        case 'logout': {
          this.storage.set("hash", "")
          this.nav.pop();
          let toast = this.toastCtrl.create({
            message: 'Successfully logged out!',
            duration: 2000,
            position: 'top'
          });
          toast.present();
          break;
        }
        case 'mapTypeUpdate': {
          this.updateMapType();
          break;
        }
        default: {
          break;
        }
      }
    });
    menu.enable(true);

  }

  ionViewDidLoad() {
    this.storage.get('hash').then((val) => {
      this.hash = val;
      this.loadReindeer();

      this.localNotifications.on('click').subscribe(x => {
        console.log("melding geklikt")
      });

      let serverCheck = Observable.interval(5000).subscribe(x => {

        this.reindeerProvider.checkBackground(this.hash)
          .then(data => {
            if (data.length > 0) {
              for(let i = 0; i < data.length; i++){
                this.localNotifications.schedule({
                  id: i,
                  title: data[i].title,
                  text: data[i].text,
                });
              }
            }
          });
          
      });
    });
  }

  loadReindeer() {
    this.reindeerProvider.getReindeer(this.hash)
      .then(data => {
        this.reindeer = data;
        this.loadGoogleMaps();
      });
  }

  loadGoogleMaps() {

    if (this.map == null) {

      this.map = GoogleMaps.create('map_canvas', {
        camera: {
          target: {
            lat: 0,
            lng: 0
          },
          zoom: 3
        },
        controls: {
          compass: true,
          myLocationButton: true,
          zoom: true,
        },
        mapType: "MAP_TYPE_HYBRID"
      });


      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        this.initMarkers()

        this.map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(() => {
          

          LocationService.getMyLocation()
            .then((location: MyLocation) => {

              this.myLat = location.latLng.lat
              this.myLong = location.latLng.lng

              this.map.animateCamera({
                target: { lat: this.myLat, lng: this.myLong },
                zoom: 15,
                duration: 1000
              });
            })
        });

        this.updateMapType();

      });
    }
    else {
      this.initMarkers()
    }
  }

  initMarkers() {

    LocationService.getMyLocation()
      .then((location: MyLocation) => {

        this.myLat = location.latLng.lat;
        this.myLong = location.latLng.lng;

        this.addMarker(this.myLat, this.myLong, "", "");

        for (let i = 0; i < this.reindeer.length; i++) {
          if (this.reindeer[i].lat != 0 && this.reindeer[i].long != 0)
            this.addMarker(this.reindeer[i].lat, this.reindeer[i].long, "https://thumb.ibb.co/dfB2fx/deer.png", this.reindeer[i].reindeerId);
        }



        for (let i = 0; i < this.reindeer.length; i++) {
          console.log(this.reindeer[i].status)
          console.log(this.reindeer[i].lat)
          console.log(this.reindeer[i].long)

          let status: string = (this.reindeer[i].status).toString()

          if(status == "false" ) {
            if(this.reindeer[i].lat != 0 && this.reindeer[i].long != 0){
              this.lat = this.reindeer[i].lat;
              this.long = this.reindeer[i].long;
            }
          }
        }

        

        if (this.lat != 0 && this.long != 0) {
          this.map.animateCamera({
            target: { lat: this.lat, lng: this.long },
            zoom: 10,
            duration: 1000
          });
        }
        else {
          this.map.animateCamera({
            target: { lat: this.myLat, lng: this.myLong },
            zoom: 10,
            duration: 1000
          });
        }

      })

  }

  addMarker(lat: number, lng: number, icon: string, reindeerId: string): void {
    this.map.addMarker({
      position: { lat: lat, lng: lng },
      animation: GoogleMapsAnimation.BOUNCE,
      icon: icon
    }).then((marker: any) => {
      marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        if (reindeerId != "") {
          this.openDetail(reindeerId);
        }
      });
    });

  }
  openDetail(reindeerId: any) {

    this.nav.push(DetailPage, {
      reindeerId: reindeerId
    });
  }
  refresh() {
    this.map.clear();
    this.loadReindeer();
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
          this.map.setMapTypeId("MAP_TYPE_NORMAL") 
          break;
        }
        case 'SATELLITE': {
          this.map.setMapTypeId("MAP_TYPE_SATELLITE")
          break;
        }
        case 'HYBRID': {
          this.map.setMapTypeId("MAP_TYPE_HYBRID")
          break;
        }
        case 'TERRAIN': {
          this.map.setMapTypeId("MAP_TYPE_TERRAIN")
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}

export interface IReindeer {
  serialnumber: string;
  reindeerId: string;
  status: boolean;
  battery: number;
  lat: number;
  long: number;
  name: string;
  reported: boolean;
}

export interface ICheck {
  title: string;
  text: string;
}