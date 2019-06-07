import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, Loading, AlertController, LoadingController } from 'ionic-angular';
import { Candidatura } from '../../modelos/candidatura';
import { CandidaturaServiceProvider } from '../../providers/candidatura-service/candidatura-service';
import { OportunidadeServiceProvider } from '../../providers/oportunidade-service/oportunidade-service';

@IonicPage()
@Component({
  selector: 'page-candidatura',
  templateUrl: 'candidatura.html',
})
export class CandidaturaPage {

  /**
   * Candidaturas carregadas
   */
  public candidaturas: Candidatura[];

  /**
   * Alerta para o usuário
   */
  private _alerta: Alert;

  /**
   * Tela de loading
   */
  private _loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _alertaCtrl: AlertController,
              private _loadingCtrl: LoadingController, 
              private _candidaturaServiceProvider: CandidaturaServiceProvider,
              private _oportunidadeServiceProvider: OportunidadeServiceProvider) {
  }

  ionViewWillEnter(){
    this._alerta = this._alertaCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });
  
    this._loading = this._loadingCtrl.create({
      content: 'Buscando candidaturas'
    })
  
    this._loading.present()

    this._candidaturaServiceProvider
  }

}
