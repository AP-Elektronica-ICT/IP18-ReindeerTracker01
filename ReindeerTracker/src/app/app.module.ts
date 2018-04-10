import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';
import { DetailPage } from '../pages/detail/detail';
import { LoginPage } from '../pages/login/login';
import { SettingsPage } from '../pages/settings/settings';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ReindeerServiceProvider } from '../providers/reindeer-service/reindeer-service';
import { HttpClientModule } from '@angular/common/http';
import { TrackersPage } from '../pages/trackers/trackers';
import { ReindeerPage } from '../pages/reindeer/reindeer';
import { Camera } from '@ionic-native/camera';
import { EditReindeerPage } from '../pages/editreindeer/editreindeer';
import { AddReindeerPage } from '../pages/addreindeer/addreindeer';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ReportPage } from '../pages/report/report';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { IonicStorageModule } from '@ionic/storage';
import { GlobalServiceProvider } from '../providers/global-service/global-service';
import { ConnectivityService } from '../providers/connectivity-service/connectivity-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    LoginPage,
    SettingsPage,
    TrackersPage,
    ReindeerPage,
    EditReindeerPage,
    AddReindeerPage,
    ReportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    LoginPage,
    SettingsPage,
    TrackersPage,
    ReindeerPage,
    EditReindeerPage,
    AddReindeerPage,
    ReportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityService,
    Network,
    Geolocation,
    NativeGeocoder,
    BarcodeScanner,
    ReindeerServiceProvider,
    GlobalServiceProvider,
    Camera,
    GoogleMaps
  ]
})
export class AppModule {}
