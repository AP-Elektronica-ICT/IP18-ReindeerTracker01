
import { NavController, NavParams } from 'ionic-angular';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { ReindeerServiceProvider } from '../../providers/reindeer-service/reindeer-service';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: NavController, public connectivityService: ConnectivityService, private geolocation: Geolocation, public reindeerProvider: ReindeerServiceProvider) {
    //console.log("ID IS:" + this.navParams.get('item')) //Data die je meekrijgt van de homepage
    this.loadDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Maps');
  }
  loadGoogleMaps() {

    this.addConnectivityListeners();

    if (typeof google == "undefined" || typeof google.maps == "undefined") {

      console.log("Google maps JavaScript needs to be loaded.");

      if (this.connectivityService.isOnline()) {
        console.log("online, loading map");

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
        console.log("showing map");
        this.initMap();
      }
      else {
        console.log("disabling map");

      }

    }


  }

  loadDetails() {
    this.reindeerProvider.getDetails(this.navParams.get('item').toString())
      .then(data => {
        this.details = data;
        this.loadGoogleMaps();


        //console.log(data);
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


      for (let i = 0; i < this.details[0].locations.length - 1; i++) {
          this.addMarker(this.details[0].locations[i].lat, this.details[0].locations[i].long, "https://thumb.ibb.co/jOO0Nc/pin.png");
          }
          this.addMarker(this.details[0].locations[this.details[0].locations.length-1].lat, this.details[0].locations[this.details[0].locations.length-1].long, "https://thumb.ibb.co/dfB2fx/deer.png");
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

      var Circle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        center: { lat: 51.24013, lng: 4.41485 },
        //radius:  this.calculateAvarageDistence()*1000
      });
      Circle.setMap(this.map);


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
      position: latLng,
      //label: lbl,
      icon: image
    });

    this.markers.push(marker);

  }


}


export interface IDetails {
  id: number;
  time: Date;
  status: boolean;
  battery: number;
  lat: number;
  long: number;
  age: number;
  name: string;
  locations: any[];
}
