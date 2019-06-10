import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Alert, Loading } from 'ionic-angular';
import { Oportunidade } from '../../modelos/oportunidade';
import { CandidaturaServiceProvider } from '../../providers/candidatura-service/candidatura-service';
import { AuthProvider } from '../../providers/auth/auth';
import { Candidatura } from '../../modelos/candidatura';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-detalhes-oportunidade',
  templateUrl: 'detalhes-oportunidade.html',
})
export class DetalhesOportunidadePage {

  /**
   * Oportunidade a ser detalhada
   */
  public oportunidade: Oportunidade;

  /**
   * Verifica se a oportunidade já tem candidatura
   */
  public possuiCandidatura;

  /**
   * Alerta de sucesso para o usuário
   */
  private _alertaSucesso: Alert;

  /**
   * Alerta de erro para o usuário
   */
  private _alertaErro: Alert;

  /**
   * Tela de loading
   */
  private _loading: Loading;

  /**
   * Usuário autenticado
   */
  private _user;

  /**
   * Candidatura na oportunidade
   */
  private _candidatura: Candidatura;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private _candidaturaServiceProvider: CandidaturaServiceProvider, private _AUTH: AuthProvider,
              private _alertCtrl: AlertController, private _loadingCtrl: LoadingController) {
    this.oportunidade = this.navParams.get('oportunidadeSelecionada');
    this.possuiCandidatura = this.navParams.get('possuiCandidatura');
    this._candidatura = this.navParams.get('candidatura')
  }

  candidatarse(){
    this._alertaSucesso = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK', handler: () => {this.navCtrl.setRoot(HomePage)}}
      ]
    });
  
    this._alertaErro = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });
  
    this._loading = this._loadingCtrl.create({
      content: 'Realizando candidatura'
    })
  
    this._loading.present()

    this._user = this._AUTH.retornaUsuarioLogado()

    let candidatura: Candidatura = {
      id: null,
      medico: this._user.uid,
      oportunidade: this.oportunidade.id,
      oportunidadeCarregada: null
    }

    this._candidaturaServiceProvider.buscaCandidaturasMedico(candidatura.medico)
      .subscribe(
        (candidaturas) => {
          var possuiCandidatura = []
          possuiCandidatura = candidaturas.filter((candidatura) => {
            return candidatura.medico === this._user.uid && candidatura.oportunidade === this.oportunidade.id
          })
          if(possuiCandidatura.length > 0){
            this._loading.dismiss()
            this._alertaErro.setSubTitle('A candidatura já existe')
            this._alertaErro.present()
          } else {
            this._candidaturaServiceProvider.cadastraCandidatura(candidatura)
            .subscribe(
              () => {
                this._loading.dismiss()
                this._alertaSucesso.setSubTitle('Candidatura realizada com sucesso!')
                this._alertaSucesso.present()
              },
              () => {
                this._loading.dismiss()
                this._alertaErro.setSubTitle('Erro no cadastro da candidatura')
                this._alertaErro.present()
              }
            )
          }
        }, 
        () => {
          this._loading.dismiss()
          this._alertaErro.setSubTitle('Erro no cadastro da candidatura')
          this._alertaErro.present()
        })
  }

  removerCandidatura(){
    this._alertaSucesso = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK', handler: () => {this.navCtrl.setRoot(HomePage)}}
      ]
    });
  
    this._alertaErro = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });
  
    this._loading = this._loadingCtrl.create({
      content: 'Removendo candidatura'
    })
  
    this._loading.present()

    this._candidaturaServiceProvider.deletaCandidatura(this._candidatura.id)
      .subscribe(
        () => {
          this._loading.dismiss()
          this._alertaSucesso.setSubTitle('Candidatura removida com sucesso!')
          this._alertaSucesso.present()
        },
        () => {
          this._loading.dismiss()
          this._alertaErro.setSubTitle('Erro na remoção da candidatura')
          this._alertaErro.present()
        }
      )
  }

}
