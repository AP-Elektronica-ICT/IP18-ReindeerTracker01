import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
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
import { ConnectivityService } from '../providers/connectivity-service/connectivity-service';
import { RegisterPage } from '../pages/register/register'; 
import { AccountSettingsPage } from '../pages/accountsettings/accountsettings';
import { ChangePasswordPage } from '../pages/changepassword/changepassword';
import { ChangeEmailPage } from '../pages/changeemail/changeemail';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { ViewReportPage } from '../pages/viewreport/viewreport';


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
    ReportPage, 
    RegisterPage,
    AccountSettingsPage,
    ChangePasswordPage,
    ChangeEmailPage,
    ViewReportPage
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
    ReportPage,  
    RegisterPage,
    AccountSettingsPage,
    ChangePasswordPage,
    ChangeEmailPage,
    ViewReportPage
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
    Camera,
    GoogleMaps,
    LocalNotifications,
    BackgroundMode
  ]
})
export class AppModule {}