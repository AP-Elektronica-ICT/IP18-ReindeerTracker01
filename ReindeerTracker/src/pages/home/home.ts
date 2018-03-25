
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ToastController, MenuController, Events } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { DetailPage } from '../detail/detail';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';

import { GoogleMaps, GoogleMapsEvent, GoogleMapsAnimation, MyLocation, GoogleMap } from '@ionic-native/google-maps';
import { AddReindeerPage } from '../addreindeer/addreindeer';
import { ReindeerPage } from '../reindeer/reindeer';
import { TrackersPage } from '../trackers/trackers';
import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;

  map: GoogleMap;
  reindeer: IReindeer[];
  userId: string = "1";



  constructor(public nav: NavController, public connectivityService: ConnectivityService, public reindeerProvider: ReindeerServiceProvider, public toastCtrl: ToastController, menu: MenuController, public menuEvent: Events) {
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
          //this.editSettings()
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
    this.loadReindeer();
  }

  loadReindeer() {
    this.reindeerProvider.getReindeer(this.userId)
      .then(data => {
        this.reindeer = data;
        console.log(data);
      });

    this.loadGoogleMaps();
  }


  loadGoogleMaps() {


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
        zoom: true
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.initMarkers()
    });

  }

  initMarkers() {

    var myLat;
    var myLong;

    this.map.getMyLocation()
      .then((location: MyLocation) => {

        myLat = location.latLng.lat;
        myLong = location.latLng.lng;

        this.addMarker(myLat, myLong, "", "");

        for (let i = 0; i < this.reindeer.length; i++) {
          this.addMarker(this.reindeer[i].lat, this.reindeer[i].long, "https://thumb.ibb.co/dfB2fx/deer.png", this.reindeer[i].reindeerId);
        }

      })

    var lat = null;
    var long = null;

    for (let i = 0; i < this.reindeer.length; i++) {
      if (this.reindeer[i].status == false) {
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
    else{
      this.map.animateCamera({
        target: {lat: myLat, lng: myLong},
        zoom: 10,
        duration: 1000

      });
    }

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