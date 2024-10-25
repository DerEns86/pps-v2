import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"pps-v2-eb3ff","appId":"1:458584288317:web:9c8cab678cecb384840e54","storageBucket":"pps-v2-eb3ff.appspot.com","apiKey":"AIzaSyBUODrw3aIpPkZctOUNjPsKEyMhPFUoyRE","authDomain":"pps-v2-eb3ff.firebaseapp.com","messagingSenderId":"458584288317"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideAnimationsAsync()]
};
