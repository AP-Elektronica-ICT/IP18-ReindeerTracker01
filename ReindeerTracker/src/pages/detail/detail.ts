
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
  avaregeDistance :any;
  markerspath: any = [];
  details: IDetails[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public nav: NavController, public connectivityService: ConnectivityService, private geolocation: Geolocation,public reindeerProvider: ReindeerServiceProvider) {
    console.log("ID IS:" + this.navParams.get('item').id) //Data die je meekrijgt van de homepage
    this.loadGoogleMaps();
    this.loadDetails();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Maps');   
  }
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

  loadDetails() {
    this.reindeerProvider.getDetails()
      .then(data => {
        this.details = data;
        this.initMap(); 
        console.log(this.details.length);
          for(let x = 0;x<this.details[0].locations.length;x++){
          this.addMarker(this.details[0].locations[x].lat,this.details[0].locations[x].long,"4");
          console.log(this.details[0].locations[x].lat)
          }
        
        //console.log(data);
      });
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
      


      var latlngbounds = new google.maps.LatLngBounds();
      for (var i = 0; i < this.markers.length; i++) {
        latlngbounds.extend(this.markers[i].position);
        this.markerspath.push(this.markers[i].position);
      }
      this.map.fitBounds(latlngbounds);

      

      var Showplan = new google.maps.Polyline({
        path:this.markerspath,
        strokeColor:"#FF0000",
        strokeOpacity:0.8,
        strokeWeight:4
      });
      Showplan.setMap(this.map);

      var antennasCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        center: {lat: 51.24013, lng: 4.41485},
        //radius:  this.calculateAvarageDistence()*1000
      });
      antennasCircle.setMap(this.map);


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
 

  addMarker(lat: number, lng: number, lbl: string,): void {

    let latLng = new google.maps.LatLng(lat, lng);
    var image = 'https://thumb.ibb.co/dfB2fx/deer.png';
     

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      //label: lbl,
      icon:image
    });

    this.markers.push(marker);

  }

  openDetail(item : any){
    this.nav.push(DetailPage, {
      item : item
  });

  }

  calculateAvarageDistence(){
    this.avaregeDistance= (this.getDistanceFromLatLonInKm(51.23013,4.41585,51.25013,4.31585)+
    this.getDistanceFromLatLonInKm(51.25013,4.31585,51.23083,4.45585)+
    this.getDistanceFromLatLonInKm(51.23083,4.45585,51.24013,4.41485))/3
    console.log(this.avaregeDistance);
    return this.avaregeDistance;

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
}


interface IDetails {
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
