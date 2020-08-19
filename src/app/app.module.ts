import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { DialogeventComponent } from './pages/dialogevent/dialogevent.component';

import { AuthService } from './_service/auth-service';
import { UploadService } from './_service/upload/upload-service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
// You don't need to import firebase/app either since it's being imported above
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDcglH7K_WV9fF3a3pJqHrlndte8Nfspeg",
  authDomain: "atns-a5a13.firebaseapp.com",
  databaseURL: "https://atns-a5a13.firebaseio.com",
  projectId: "atns-a5a13",
  storageBucket: "atns-a5a13.appspot.com",
  messagingSenderId: "919697256418",
  appId: "1:919697256418:web:c440f0d1e53534840193bb",
  measurementId: "G-YNVWLH0GP7"
};
firebase.initializeApp(firebaseConfig);

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DialogeventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularFireModule.initializeApp(firebaseConfig), // aggiungi questa riga 
    AngularFireStorageModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBK6BtCSyxSSU_gwx5nYwgfy-nXmeS38Kc'
    })
  ],
  providers: [AuthService, UploadService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [DialogeventComponent]
})
export class AppModule { }
