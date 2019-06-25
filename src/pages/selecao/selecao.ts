import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, Alert, AlertController, LoadingController } from 'ionic-angular';
import { CandidaturaServiceProvider } from '../../providers/candidatura-service/candidatura-service';
import { OportunidadeServiceProvider } from '../../providers/oportunidade-service/oportunidade-service';
import { AuthProvider } from '../../providers/auth/auth';
import { Oportunidade } from '../../modelos/oportunidade';

@IonicPage()
@Component({
  selector: 'page-selecao',
  templateUrl: 'selecao.html',
})
export class SelecaoPage {

  /**
   * Oportunidades carregadas
   */
  public oportunidades: Oportunidade[];

  /**
   * Tela de loading
   */
  private _loading: Loading;

  /**
   * Usuário autenticado
   */
  private _user;

  /**
   * Alerta para o usuário
   */
  private _alerta: Alert;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private _alertaCtrl: AlertController, private _loadingCtrl: LoadingController,
              private _oportunidadeServiceProvider: OportunidadeServiceProvider,
              private _AUTH: AuthProvider) {
  }

  ionViewDidLoad(){
    this._alerta = this._alertaCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    })

    this._loading = this._loadingCtrl.create({
      content: 'Buscando vagas'
    })
  
    this._loading.present()

    this._user = this._AUTH.retornaUsuarioLogado()

    this._oportunidadeServiceProvider.buscaOportunidadesContratante(this._user.uid)
      .subscribe(
        (oportunidades) => {
          this.oportunidades = oportunidades
          this._loading.dismiss()
        },
        () => {
          this._loading.dismiss();
          this._alerta.setSubTitle('Erro na busca de vagas.');
          this._alerta.present();
        }
      )
  }

  selecionaOportunidade(oportunidade: Oportunidade){
    this.navCtrl.push('ListaCandidatosPage', {
      oportunidade: oportunidade
    });
  }

}
