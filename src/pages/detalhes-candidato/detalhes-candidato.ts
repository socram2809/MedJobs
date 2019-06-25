import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, Alert, AlertController, LoadingController } from 'ionic-angular';
import { HabilidadeServiceProvider } from '../../providers/habilidade-service/habilidade-service';
import { FormacaoServiceProvider } from '../../providers/formacao-service/formacao-service';
import { ExperienciaServiceProvider } from '../../providers/experiencia-service/experiencia-service';
import { Candidatura } from '../../modelos/candidatura';
import { Experiencia } from '../../modelos/experiencia';
import { Habilidade } from '../../modelos/habilidade';
import { Formacao } from '../../modelos/formacao';
import { CandidaturaServiceProvider } from '../../providers/candidatura-service/candidatura-service';

@IonicPage()
@Component({
  selector: 'page-detalhes-candidato',
  templateUrl: 'detalhes-candidato.html',
})
export class DetalhesCandidatoPage {

  /**
   * Candidatura carregada
   */
  public candidatura: Candidatura;

  /**
   * Experiências do candidato
   */
  public experiencias: Experiencia[];

  /**
   * Habilidades do candidato
   */
  public habilidades: Habilidade[];

  /**
   * Formações do candidato
   */
  public formacoes: Formacao[];

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
              private _alertaCtrl: AlertController,
              private _loadingCtrl: LoadingController,
              private _candidaturaServiceProvider: CandidaturaServiceProvider,
              private _experienciaServiceProvider: ExperienciaServiceProvider,
              private _formacaoServiceProvider: FormacaoServiceProvider,
              private _habilidadeServiceProvider: HabilidadeServiceProvider) {
    this.candidatura = this.navParams['candidatura']
  }

  ionViewDidLoad(){
    this._alerta = this._alertaCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    })

    this._loading = this._loadingCtrl.create({
      content: 'Buscando currículo do candidato'
    })
  
    this._loading.present()

    this._experienciaServiceProvider.buscaExperienciasMedico(this.candidatura.medico)
      .subscribe(
        (experiencias) => {
          this.experiencias = experiencias
        },
        () => {
          this.experiencias = null
          this._alerta.setSubTitle('Erro na busca de experiências.');
          this._alerta.present();
        }
      )

    this._habilidadeServiceProvider.buscaHabilidadesMedico(this.candidatura.medico)
      .subscribe(
        (habilidades) => {
          this.habilidades = habilidades
        },
        () => {
          this.habilidades = null
          this._alerta.setSubTitle('Erro na busca de habilidades.');
          this._alerta.present();
        }
      )

    this._formacaoServiceProvider.buscaFormacoesMedico(this.candidatura.medico)
      .subscribe(
        (formacoes) => {
          this.formacoes = formacoes
        },
        () => {
          this.formacoes = null
          this._alerta.setSubTitle('Erro na busca de formações.');
          this._alerta.present();
        }
      )

    this._loading.dismiss()
  }

  aprovarCandidato(candidatura: Candidatura){
    this._alerta = this._alertaCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    })

    this._loading = this._loadingCtrl.create({
      content: 'Aprovando candidatura'
    })
  
    this._loading.present()

    this.candidatura.aprovado = true

    this._candidaturaServiceProvider.editaCandidatura(candidatura)
      .subscribe(
        () => {
          this._loading.dismiss()
          this._alerta.setSubTitle('Candidatura aprovada com sucesso!')
          this._alerta.present()
        },
        () => {
          this._loading.dismiss()
          this._alerta.setSubTitle('Erro na aprovação da candidatura!')
          this._alerta.present()
        }
      )
  }

}
