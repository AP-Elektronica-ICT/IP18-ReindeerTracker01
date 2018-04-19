
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

  constructor(public nav: NavController, public connectivityService: ConnectivityService, public reindeerProvider: ReindeerServiceProvider, public toastCtrl: ToastController, menu: MenuController, public menuEvent: Events, private storage: Storage) {
    menuEvent.subscribe('menu', (action: string) => {
      switch (action) {
        case 'addReindeer': {
          this.addReindeer()
          break;
        }
        case 'showReindeer': {
          this.showReindeer()
          break;
        }
        case 'editTrackers': {
          this.editTrackers()
          break;
        }
        case 'refresh': {
          this.refresh()
          break;
        }
        case 'openSettings': {
          this.editSettings()
          break;
        }
        case 'openAccount': {
          this.accountSettings()
          break;
        }
        case 'logout': {
          this.storage.set("hash","")
          this.nav.pop();
          let toast = this.toastCtrl.create({
            message: 'Successfully logged out!',
            duration: 2000,
            position: 'top'
          });
          toast.present();
          break;
        }
        default: {
          break;
        }
      }
    });

    menu.enable(true);

    


    storage.get('mapTypeSetting').then((val) => {
      this.mapTypeSetting = val;
    });

  }

  ionViewDidLoad() {
    this.storage.get('hash').then((val) => {
      this.hash = val;
      this.loadReindeer();
    });
  }

  loadReindeer() {
    console.log("DATA HIER: " + this.hash);
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

      this.map.setMapTypeId("MAP_TYPE_TERRAIN") //werkt nog niet

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

        var lat = null;
        var long = null;

        for (let i = 0; i < this.reindeer.length; i++) {
          if (this.reindeer[i].status == false && this.reindeer[i].lat != 0 && this.reindeer[i].long != 0) {
            lat = this.reindeer[i].lat;
            long = this.reindeer[i].long;
          }
        }

        if (lat != null && long != null) {
          this.map.animateCamera({
            target: { lat: lat, lng: long },
            zoom: 2
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

  addReindeer() {
    this.nav.push(AddReindeerPage);
  }
  showReindeer() {
    this.nav.push(ReindeerPage);
  }
  editTrackers() {
    this.nav.push(TrackersPage);
  }
  editSettings() {
    this.nav.push(SettingsPage);
  }
  accountSettings() {
    this.nav.push(AccountSettingsPage);
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