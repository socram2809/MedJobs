import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Importa componentes de página e o provedor de autenticação
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

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
  private pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private _AUTH: AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    // Popula páginas para a aplicação
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Logout', component: LoginPage }
    ];
  }

  /**
    * Abre uma página do menu lateral
    * @method openPage
    * @param page   {object} O nome do componente de página para abrir
    * return {none}
    */
   openPage(page : any) : void
   {
      // Garante que nós podemos deslogar do Forebase e resetar a página raiz
      if(page == 'Logout')
      {
         this._AUTH.logOut()
         .then((data : any) =>
         {
            this.nav.setRoot(page.component);
         })
         .catch((error : any) =>
         {
            console.dir(error);
         });
      }

      // Caso contrário, reseta o conteúdo da navegação para ter somente esta página
      // Nós não queremos o botão de voltar apareça nesse cenário
      else
      {
         this.nav.setRoot(page.component);
      }
   }
}