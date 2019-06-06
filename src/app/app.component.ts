import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Alert, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Serviços
import { AuthProvider } from '../providers/auth/auth';

//Páginas
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  /**
   * Seta a página raiz para a aplicação
   */
  rootPage:any = LoginPage;

  /**
   * Define as páginas para a aplicação
   */
  public pages: Array<{title: string, component: any}>;

  private _alerta: Alert;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _AUTH: AuthProvider,
              private _alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // Popula páginas para a aplicação
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Sair', component: LoginPage }
    ];
  }

  /**
  * Abre uma página do menu lateral
  * @method openPage
  * @param page   {object} O nome do componente de página para abrir
  * return {none}
  */
  openPage(page : any) : void {
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });

    // Garante que nós podemos deslogar do Firebase e resetar a página raiz
    if(page == 'Sair') {
      this._AUTH.logOut()
      .then((data : any) =>
      {
        this.nav.setRoot(page.component);
      })
      .catch((error : any) =>
      {
        this._alerta.setSubTitle('Erro ao deslogar!');
        this._alerta.present();
      });
    }
    // Caso contrário, reseta o conteúdo da navegação para ter somente esta página
    // Nós não queremos o botão de voltar apareça nesse cenário
    else {
      this.nav.setRoot(page.component);
    }
  }
}