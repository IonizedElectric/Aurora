import { Component } from '@angular/core';
//import * as firebase from ‘firebase’;
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'For You',
      url: '/for-you',
      icon: 'happy'
    },
      {
          title: 'Submit a suggestion',
          url: '/submit',
          icon: 'send'
      },
    {
      title: 'History',
      url: '/history',
        icon: 'stats-chart'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'help'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    //const fireConfig = {
    //  apiKey: 'YOUR_APIKEY',
  //    authDomain: 'YOUR_AUTH_DOMAIN',
  //    databaseURL: 'YOUR_DATABASE_URL',
  //    projectId: 'YOUR_PROJECT_ID',
  //    storageBucket: 'YOUR_STORAGE_BUCKET',
    //};
  //  firebase.initializeApp(fireConfig);
  }
}
