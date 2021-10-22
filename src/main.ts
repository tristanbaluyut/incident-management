import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { initializeApp } from 'firebase/app';

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyAJtE2fDWooPqF3kOJms9QCBoWQnUVnvS8",
  authDomain: "incident-management-f26e9.firebaseapp.com",
  //databaseURL: "https://incident-management-f26e9.firebaseio.com",
  projectId: "incident-management-f26e9",
  //storageBucket: "incident-management-f26e9.appspot.com",
  //messagingSenderId: "SENDER_ID",
  //appId: "incident-management-f26e9",
  //measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
