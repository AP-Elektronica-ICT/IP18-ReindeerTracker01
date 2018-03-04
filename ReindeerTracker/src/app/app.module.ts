import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConnectivityService } from '../providers/connectivity-service/connectivity-service';
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
import { AddReindeerPage } from '../pages/addreindeer/addreindeer';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    LoginPage,
    SettingsPage,
    TrackersPage,
    ReindeerPage,
    AddReindeerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
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
    AddReindeerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConnectivityService,
    Network,
    Geolocation,
    BarcodeScanner,
    ReindeerServiceProvider,
    Camera
  ]
})
export class AppModule {}
