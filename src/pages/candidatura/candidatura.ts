import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, Loading, AlertController, LoadingController } from 'ionic-angular';
import { Candidatura } from '../../modelos/candidatura';
import { CandidaturaServiceProvider } from '../../providers/candidatura-service/candidatura-service';
import { OportunidadeServiceProvider } from '../../providers/oportunidade-service/oportunidade-service';
import { AuthProvider } from '../../providers/auth/auth';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private _alertaCtrl: AlertController,
              private _loadingCtrl: LoadingController, 
              private _candidaturaServiceProvider: CandidaturaServiceProvider,
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
      content: 'Buscando candidaturas'
    })
  
    this._loading.present()

    this._user = this._AUTH.retornaUsuarioLogado()

    this._candidaturaServiceProvider.buscaCandidaturasMedico(this._user.uid)
      .subscribe(
        (candidaturas) => {
          this.candidaturas = candidaturas
          this.candidaturas.forEach(candidatura => {
            this._oportunidadeServiceProvider.buscaOportunidade(candidatura.oportunidade)
              .subscribe(
                (oportunidade) => {
                  candidatura.oportunidadeCarregada = oportunidade
                },
                () => {
                  this.candidaturas = null
                  this._loading.dismiss()
                  this._alerta.setSubTitle('Erro na busca de candidaturas.');
                  this._alerta.present();
                }
              )
          })
          this._loading.dismiss()
        },
        () => {
          this._loading.dismiss();
          this._alerta.setSubTitle('Erro na busca de candidaturas.');
          this._alerta.present();
        }
      )
  }

  selecionaCandidatura(candidatura: Candidatura){
    this.navCtrl.push('DetalhesOportunidadePage', {
      oportunidadeSelecionada: candidatura.oportunidadeCarregada,
      candidatura: candidatura,
      possuiCandidatura: true
    });
  }

}
