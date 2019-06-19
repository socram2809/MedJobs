import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExperienciaServiceProvider } from '../../providers/experiencia-service/experiencia-service';
import { Experiencia } from '../../modelos/experiencia';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-experiencia',
  templateUrl: 'experiencia.html',
})
export class ExperienciaPage {

  /**
   * Cria referência para o objeto FormGroup
   */
  public form: FormGroup;

  /**
   * Experiências do médico
   */
  public experiencias: Experiencia[];

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
   * Verifica se está editando a experiencia
   */
  public isEdicao: boolean;

  /**
   * Identificador da experiencia a ser editada
   */
  private _idExperiencia;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder,
              private _alertCtrl: AlertController, private _loadingCtrl: LoadingController,
              private _AUTH: AuthProvider, private _experienciaServiceProvider: ExperienciaServiceProvider) {
    //Define o objeto "FormGroup" usando o FormBuilder do Angular
    this.form = this._FB.group({
      'empresa': ['', Validators.required],
      'inicio': ['', Validators.required],
      'fim': ['', Validators.required]
    });

    this.preparaCarregamento()

    this._user = this._AUTH.retornaUsuarioLogado()

    this.isEdicao = false

    this.atualizaExperiencias()
  }

  /**
  * Cria experiência usando o método "cadastraExperiencia"
  * do serviço "ExperienciaServiceProvider"
  * @method cadastrarExperiencia
  * @return {none}
  */
 cadastrarExperiencia() : void {

  this.preparaCarregamento()

  let empresa = this.form.controls['empresa'].value;
  let inicio = this.form.controls['inicio'].value;
  let fim = this.form.controls['fim'].value;

  let experiencia: Experiencia = {
    id: null,
    empresa: empresa,
    inicio: inicio,
    fim: fim,
    medico: this._user.uid
  }
  
  this._experienciaServiceProvider.cadastraExperiencia(experiencia)
    .subscribe(
      () => {
        this.limpaCampos()
        this.atualizaExperiencias()
      },
      () => {
        this._loading.dismiss()
        this._alerta.setSubTitle('Erro no cadastro da experiência!')
        this._alerta.present()
      }
    )
  
  }

  /**
   * Atualiza as experiências do médico
   * @method atualizaExperiencias
   * @return {none}
   */
  atualizaExperiencias() : void {

    this._experienciaServiceProvider.buscaExperienciasMedico(this._user.uid)
      .subscribe(
        (experiencias) => {
          this.experiencias = experiencias
          this._loading.dismiss()
        },
        () => {
          this._loading.dismiss()
          this._alerta.setSubTitle('Erro na atualização das experiências!')
          this._alerta.present()
        }
      )

  }

  /**
   * Remove experiência
   * @method removerExperiencia
   * @param experiencia 
   * @return {none}
   */
  removerExperiencia(experiencia: Experiencia) : void {

    this.preparaCarregamento()

    this._experienciaServiceProvider.deletaExperiencia(experiencia.id)
      .subscribe(
        () => {
          this.limpaCampos()
          this.atualizaExperiencias()
        },
        () => {
          this._loading.dismiss()
          this._alerta.setSubTitle('Erro na remoção da experiência!')
          this._alerta.present()
        }
      )
  }

  /**
  * Edita experiência usando o método "editaExperiencia"
  * do serviço "ExperienciaServiceProvider"
  * @method editarExperiencia
  * @return {none}
  */
 editarExperiencia() : void {

  this.preparaCarregamento()

  let empresa = this.form.controls['empresa'].value;
  let inicio = this.form.controls['inicio'].value;
  let fim = this.form.controls['fim'].value;

  let experiencia: Experiencia = {
    id: this._idExperiencia,
    empresa: empresa,
    inicio: inicio,
    fim: fim,
    medico: this._user.uid
  }
  
  this._experienciaServiceProvider.editaExperiencia(experiencia)
    .subscribe(
      () => {
        this.limpaCampos()
        this.atualizaExperiencias()
      },
      () => {
        this._loading.dismiss()
        this._alerta.setSubTitle('Erro na edição da experiência!')
        this._alerta.present()
      }
    )
  
  }

  /**
   * Seleciona a experiência a ser editada
   * @method selecionaExperiencia
   * @param experiencia 
   * @return {none}
   */
  selecionaExperiencia(experiencia: Experiencia) : void {
    this.isEdicao = true

    this._idExperiencia = experiencia.id
    this.form.controls['empresa'].setValue(experiencia.empresa)
    this.form.controls['inicio'].setValue(experiencia.inicio)
    this.form.controls['fim'].setValue(experiencia.fim)
  }

  /**
   * Limpa os campos do cadastro de experiencia
   * @method limpaCampos
   * @return {none}
   */
  limpaCampos(): void {
    this.isEdicao = false
    this.form.controls['empresa'].setValue('')
    this.form.controls['inicio'].setValue('')
    this.form.controls['fim'].setValue('')
  }

  /**
   * Prepara objetos de alerta e carregamento
   * @method preparaCarregamento
   * @return {none}
   */
  preparaCarregamento(): void {

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });

    this._loading = this._loadingCtrl.create({
      content: 'Atualizando experiências'
    })

    this._loading.present()

  }

}