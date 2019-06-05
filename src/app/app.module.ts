import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UsuarioPage } from '../pages/usuario/usuario';

import { AuthProvider } from '../providers/auth/auth';

//Importa arquivo de configuração do Firebase e o inicializa
import * as firebase from 'firebase'
import {environment} from '../environments/environment'
import { UsuarioServiceProvider } from '../providers/usuario-service/usuario-service';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UsuarioPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UsuarioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UsuarioServiceProvider
  ]
})
export class AppModule {}
