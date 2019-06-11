import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//Serviços
import { AuthProvider } from '../providers/auth/auth';
import { UsuarioServiceProvider } from '../providers/usuario-service/usuario-service';
import { OportunidadeServiceProvider } from '../providers/oportunidade-service/oportunidade-service';
import { CandidaturaServiceProvider } from '../providers/candidatura-service/candidatura-service';

//Páginas
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UsuarioPage } from '../pages/usuario/usuario';

//Firebase
import * as firebase from 'firebase'
import {environment} from '../environments/environment'
import { FormacaoServiceProvider } from '../providers/formacao-service/formacao-service';
import { ExperienciaServiceProvider } from '../providers/experiencia-service/experiencia-service';
import { HabilidadeServiceProvider } from '../providers/habilidade-service/habilidade-service';
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
    HttpClientModule,
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
    UsuarioServiceProvider,
    OportunidadeServiceProvider,
    CandidaturaServiceProvider,
    FormacaoServiceProvider,
    ExperienciaServiceProvider,
    HabilidadeServiceProvider
  ]
})
export class AppModule {}
