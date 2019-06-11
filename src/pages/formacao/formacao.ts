import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormacaoServiceProvider } from '../../providers/formacao-service/formacao-service';
import { Formacao } from '../../modelos/formacao';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-formacao',
  templateUrl: 'formacao.html',
})
export class FormacaoPage {

  /**
   * Cria referência para o objeto FormGroup
   */
  public form: FormGroup;

  /**
   * Formações do médico
   */
  public formacoes: Formacao[];

  /**
   * Alerta para o usuário
   */
  private _alerta: Alert;

  /**
   * Tela de loading
   */
  private _loading: Loading;

  /**
   * Usuário logado
   */
  private _user;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder,
              private _alertCtrl: AlertController, private _loadingCtrl: LoadingController,
              private _AUTH: AuthProvider, private _formacaoServiceProvider: FormacaoServiceProvider) {
    //Define o objeto "FormGroup" usando o FormBuilder do Angular
    this.form = this._FB.group({
      'instituicao': ['', Validators.required],
      'inicio': ['', Validators.required],
      'fim': ['', Validators.required],
      'escolaridade': ['', Validators.required]
    });

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });

    this._loading = this._loadingCtrl.create({
      content: 'Atualizando formações'
    })

    this._loading.present()

    this._user = this._AUTH.retornaUsuarioLogado()

    this.atualizaFormacoes()
  }

  /**
  * Cria formação usando os métodos "cadastraFormacao"
  * do serviço "FormacaoServiceProvider"
  * @method cadastraFormacao
  * @return {none}
  */
 cadastrarFormacao() : void {

  this._loading.setContent('Cadastrando formação')

  this._loading.present()

  let instituicao = this.form.controls['instituicao'].value;
  let inicio = this.form.controls['inicio'].value;
  let fim = this.form.controls['fim'].value;
  let escolaridade = this.form.controls['escolaridade'].value;

  let formacao: Formacao = {
    id: null,
    instituicao: instituicao,
    inicio: inicio,
    fim: fim,
    escolaridade: escolaridade,
    medico: this._user.uid
  }
  
  this._formacaoServiceProvider.cadastraFormacao(formacao)
    .subscribe(
      () => {
        this._loading.dismiss()
        this._alerta.setSubTitle('Formação cadastrada com sucesso!')
        this._alerta.present()
        this._loading.setContent('Atualizando formações')
        this._loading.present()
        this.atualizaFormacoes()
      },
      () => {
        this._loading.dismiss()
        this._alerta.setSubTitle('Erro no cadastro da formação!')
        this._alerta.present()
      }
    )
  
  }

  /**
   * Atualiza as formações do médico
   */
  atualizaFormacoes(){
    this._formacaoServiceProvider.buscaFormacoesMedico(this._user.uid)
      .subscribe(
        (formacoes) => {
          this.formacoes = formacoes
          this._loading.dismiss()
        },
        () => {
          this._loading.dismiss()
          this._alerta.setSubTitle('Erro na atualização das formações!')
          this._alerta.present()
        }
      )
  }

}
