import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, Loading, AlertController, LoadingController } from 'ionic-angular';
import { Usuario } from '../../modelos/usuario';
import { CandidaturaServiceProvider } from '../../providers/candidatura-service/candidatura-service';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import { Oportunidade } from '../../modelos/oportunidade';
import { Candidatura } from '../../modelos/candidatura';

@IonicPage()
@Component({
  selector: 'page-lista-candidatos',
  templateUrl: 'lista-candidatos.html',
})
export class ListaCandidatosPage {

  /**
   * Candidaturas carregados
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
  
  /**
   * Oportunidade carregada
   */
  private _oportunidade: Oportunidade;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private _usuarioServiceProvider: UsuarioServiceProvider, 
    private _candidaturaServiceProvider: CandidaturaServiceProvider, private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController) {
    this._oportunidade = this.navParams.get('oportunidade')
  }

  ionViewDidLoad(){

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });
  
    this._loading = this._loadingCtrl.create({
      content: 'Buscando candidatos'
    })
  
    this._loading.present()

    this._candidaturaServiceProvider.buscaCandidaturasOportunidade(this._oportunidade.id)
      .subscribe(
        (candidaturas) => {
          if(candidaturas){
            this.candidaturas = candidaturas
            this.candidaturas.forEach((candidatura) => {
              this._usuarioServiceProvider.buscaUsuario(candidatura.medico)
                .subscribe(
                  (usuario) => {
                    candidatura.medicoCarregado = usuario
                  },
                  () => {
                    this.candidaturas = null
                    this._loading.dismiss();
                    this._alerta.setSubTitle('Erro na busca de candidatos.');
                    this._alerta.present();
                  }
                )
            })
          }
          this._loading.dismiss();
        },
        () => {
          this._loading.dismiss();
          this._alerta.setSubTitle('Erro na busca de candidatos.');
          this._alerta.present();
        }
      )
  }

  selecionarCandidato(candidatura: Candidatura){
    this.navCtrl.push('DetalhesCandidatoPage', {
      candidatura: candidatura
    });
  }

}
