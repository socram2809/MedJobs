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
  
  /**
   * Verifica se está editando a formação
   */
  private isEdicao: boolean;

  /**
   * Identificador da formação a ser editada
   */
  private _idFormacao;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder,
              private _alertCtrl: AlertController, private _loadingCtrl: LoadingController,
              private _AUTH: AuthProvider, private _formacaoServiceProvider: FormacaoServiceProvider) {
    //Define o objeto "FormGroup" usando o FormBuilder do Angular
    this.form = this._FB.group({
      'instituicao': ['', Validators.required],
      'curso': ['', Validators.required],
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

    this._user = this._AUTH.retornaUsuarioLogado()

    this._loading.present()

    this.isEdicao = false

    this.atualizaFormacoes()
  }

  /**
  * Cria formação usando os métodos "cadastraFormacao"
  * do serviço "FormacaoServiceProvider"
  * @method cadastraFormacao
  * @return {none}
  */
 cadastrarFormacao() : void {

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

  let instituicao = this.form.controls['instituicao'].value;
  let curso = this.form.controls['curso'].value;
  let inicio = this.form.controls['inicio'].value;
  let fim = this.form.controls['fim'].value;
  let escolaridade = this.form.controls['escolaridade'].value;

  let formacao: Formacao = {
    id: null,
    instituicao: instituicao,
    curso: curso,
    inicio: inicio,
    fim: fim,
    escolaridade: escolaridade,
    medico: this._user.uid
  }
  
  this._formacaoServiceProvider.cadastraFormacao(formacao)
    .subscribe(
      () => {
        this.isEdicao = false
        this.form.controls['instituicao'].setValue('')
        this.form.controls['curso'].setValue('')
        this.form.controls['inicio'].setValue('')
        this.form.controls['fim'].setValue('')
        this.form.controls['escolaridade'].setValue('')
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
   * @method atualizaFormacoes
   * @return {none}
   */
  atualizaFormacoes() : void {
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

  /**
   * Remove formação
   * @method removerFormacao
   * @param formacao 
   * @return {none}
   */
  removerFormacao(formacao: Formacao) : void {
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });

    this._loading = this._loadingCtrl.create({
      content: 'Removendo formação'
    })
  
    this._loading.present()

    this._formacaoServiceProvider.deletaFormacao(formacao.id)
      .subscribe(
        () => {
          this.isEdicao = false
          this.atualizaFormacoes()
        },
        () => {
          this._loading.dismiss()
          this._alerta.setSubTitle('Erro na remoção da formação!')
          this._alerta.present()
        }
      )
  }

  /**
  * Edita formação usando o método "editaFormacao"
  * do serviço "FormacaoServiceProvider"
  * @method editarFormacao
  * @return {none}
  */
 editarFormacao() : void {

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

  let instituicao = this.form.controls['instituicao'].value;
  let curso = this.form.controls['curso'].value;
  let inicio = this.form.controls['inicio'].value;
  let fim = this.form.controls['fim'].value;
  let escolaridade = this.form.controls['escolaridade'].value;

  let formacao: Formacao = {
    id: this._idFormacao,
    instituicao: instituicao,
    curso: curso,
    inicio: inicio,
    fim: fim,
    escolaridade: escolaridade,
    medico: this._user.uid
  }
  
  this._formacaoServiceProvider.editaFormacao(formacao)
    .subscribe(
      () => {
        this.atualizaFormacoes()
      },
      () => {
        this._loading.dismiss()
        this._alerta.setSubTitle('Erro na edição da formação!')
        this._alerta.present()
      }
    )
  
  }

  /**
   * Seleciona a formação a ser editada
   * @method selecionaFormacao
   * @param formacao 
   * @return {none}
   */
  selecionaFormacao(formacao: Formacao) : void {
    this.isEdicao = true

    this._idFormacao = formacao.id
    this.form.controls['instituicao'].setValue(formacao.instituicao)
    this.form.controls['curso'].setValue(formacao.curso)
    this.form.controls['inicio'].setValue(formacao.inicio)
    this.form.controls['fim'].setValue(formacao.fim)
    this.form.controls['escolaridade'].setValue(formacao.escolaridade);
  }

}
