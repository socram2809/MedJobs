import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HabilidadeServiceProvider } from '../../providers/habilidade-service/habilidade-service';
import { Habilidade } from '../../modelos/habilidade';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-habilidade',
  templateUrl: 'habilidade.html',
})
export class HabilidadePage {

  /**
   * Cria referência para o objeto FormGroup
   */
  public form: FormGroup;

  /**
   * Habilidades do médico
   */
  public habilidades: Habilidade[];

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
   * Verifica se está editando a habilidade
   */
  public isEdicao: boolean;

  /**
   * Identificador da habilidade a ser editada
   */
  private _idHabilidade;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder,
              private _alertCtrl: AlertController, private _loadingCtrl: LoadingController,
              private _AUTH: AuthProvider, private _habilidadeServiceProvider: HabilidadeServiceProvider) {
    //Define o objeto "FormGroup" usando o FormBuilder do Angular
    this.form = this._FB.group({
      'descricao': ['', Validators.required]
    });

    this.preparaCarregamento()

    this._user = this._AUTH.retornaUsuarioLogado()

    this.isEdicao = false

    this.atualizaHabilidades()
  }

  /**
  * Cria habilidade usando o método "cadastraHabilidade"
  * do serviço "HabilidadeServiceProvider"
  * @method cadastrarHabilidade
  * @return {none}
  */
 cadastrarHabilidade() : void {

  this.preparaCarregamento()

  let descricao = this.form.controls['descricao'].value;

  let habilidade: Habilidade = {
    id: null,
    descricao: descricao,
    medico: this._user.uid
  }
  
  this._habilidadeServiceProvider.cadastraHabilidade(habilidade)
    .subscribe(
      () => {
        this.limpaCampos()
        this.atualizaHabilidades()
      },
      () => {
        this._loading.dismiss()
        this._alerta.setSubTitle('Erro no cadastro da habilidade!')
        this._alerta.present()
      }
    )
  
  }

  /**
   * Atualiza as habilidades do médico
   * @method atualizaExperiencias
   * @return {none}
   */
  atualizaHabilidades() : void {

    this._habilidadeServiceProvider.buscaHabilidadesMedico(this._user.uid)
      .subscribe(
        (habilidades) => {
          this.habilidades = habilidades
          this._loading.dismiss()
        },
        () => {
          this._loading.dismiss()
          this._alerta.setSubTitle('Erro na atualização das habilidades!')
          this._alerta.present()
        }
      )

  }

  /**
   * Remove habilidade
   * @method removerHabilidade
   * @param habilidade 
   * @return {none}
   */
  removerHabilidade(habilidade: Habilidade) : void {

    this.preparaCarregamento()

    this._habilidadeServiceProvider.deletaHabilidade(habilidade.id)
      .subscribe(
        () => {
          this.limpaCampos()
          this.atualizaHabilidades()
        },
        () => {
          this._loading.dismiss()
          this._alerta.setSubTitle('Erro na remoção da habilidade!')
          this._alerta.present()
        }
      )
  }

  /**
  * Edita habilidade usando o método "editaHabilidade"
  * do serviço "HabilidadeServiceProvider"
  * @method editarHabilidade
  * @return {none}
  */
 editarHabilidade() : void {

  this.preparaCarregamento()

  let descricao = this.form.controls['descricao'].value;

  let habilidade: Habilidade = {
    id: this._idHabilidade,
    descricao: descricao,
    medico: this._user.uid
  }
  
  this._habilidadeServiceProvider.editaHabilidade(habilidade)
    .subscribe(
      () => {
        this.limpaCampos()
        this.atualizaHabilidades()
      },
      () => {
        this._loading.dismiss()
        this._alerta.setSubTitle('Erro na edição da habilidade!')
        this._alerta.present()
      }
    )
  
  }

  /**
   * Seleciona a habilidade a ser editada
   * @method selecionaHabilidade
   * @param habilidade 
   * @return {none}
   */
  selecionaHabilidade(habilidade: Habilidade) : void {
    this.isEdicao = true

    this._idHabilidade = habilidade.id
    this.form.controls['descricao'].setValue(habilidade.descricao)
  }

  /**
   * Limpa os campos do cadastro de habilidade
   * @method limpaCampos
   * @return {none}
   */
  limpaCampos(): void {
    this.isEdicao = false
    this.form.controls['descricao'].setValue('')
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
      content: 'Atualizando habilidades'
    })

    this._loading.present()

  }

}
