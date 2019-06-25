import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Oportunidade } from '../../modelos/oportunidade';
import { OportunidadeServiceProvider } from '../../providers/oportunidade-service/oportunidade-service';
import { AuthProvider } from '../../providers/auth/auth';
import { CandidaturaServiceProvider } from '../../providers/candidatura-service/candidatura-service';

@IonicPage()
@Component({
  selector: 'page-vaga',
  templateUrl: 'vaga.html',
})
export class VagaPage {

  /**
   * Cria referência para o objeto FormGroup
   */
  public form: FormGroup;

  /**
   * Vagas cadastradas
   */
  public vagas: Oportunidade[];

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
   * Verifica se está editando a vaga
   */
  public isEdicao: boolean;

  /**
   * Identificador da vaga a ser editada
   */
  private _idVaga;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _FB: FormBuilder,
              private _alertCtrl: AlertController, private _loadingCtrl: LoadingController,
              private _AUTH: AuthProvider, private _candidaturaServiceProvider: CandidaturaServiceProvider,
              private _oportunidadeServiceProvider: OportunidadeServiceProvider) {
    //Define o objeto "FormGroup" usando o FormBuilder do Angular
    this.form = this._FB.group({
      'titulo': ['', Validators.required],
      'descricao': ['', Validators.required],
      'cidade': ['', Validators.required],
      'estado': ['', Validators.required],
      'unidade': ['', Validators.required]
    });

    this.preparaCarregamento()

    this._user = this._AUTH.retornaUsuarioLogado()

    this.isEdicao = false

    this.atualizaVagas()
  }

  /**
  * Cria formação usando os métodos "cadastraOportunidade"
  * do serviço "OportunidadeServiceProvider"
  * @method cadastrarVaga
  * @return {none}
  */
 cadastrarVaga() : void {

  this.preparaCarregamento()

  let titulo = this.form.controls['titulo'].value;
  let descricao = this.form.controls['descricao'].value;
  let cidade = this.form.controls['cidade'].value;
  let estado = this.form.controls['estado'].value;
  let unidade = this.form.controls['unidade'].value;

  let vaga: Oportunidade = {
    id: null,
    titulo: titulo,
    descricao: descricao,
    cidade: cidade,
    estado: estado,
    unidade: unidade,
    contratante: this._user.uid
  }
  
  this._oportunidadeServiceProvider.cadastraOportunidade(vaga)
    .subscribe(
      () => {
        this.limpaCampos()
        this.atualizaVagas()
      },
      () => {
        this._loading.dismiss()
        this._alerta.setSubTitle('Erro no cadastro da vaga!')
        this._alerta.present()
      }
    )
  
  }

  /**
   * Atualiza as vagas do contratante
   * @method atualizaVagas
   * @return {none}
   */
  atualizaVagas() : void {

    this._oportunidadeServiceProvider.buscaOportunidadesContratante(this._user.uid)
      .subscribe(
        (vagas) => {
          this.vagas = vagas
          this._loading.dismiss()
        },
        () => {
          this._loading.dismiss()
          this._alerta.setSubTitle('Erro na atualização das vagas!')
          this._alerta.present()
        }
      )

  }

  /**
   * Remove vaga
   * @method removerVaga
   * @param vaga 
   * @return {none}
   */
  removerVaga(vaga: Oportunidade) : void {

    this.preparaCarregamento()

    this._oportunidadeServiceProvider.deletaOportunidade(vaga.id)
      .subscribe(
        () => {
          this._candidaturaServiceProvider.deletaCandidaturasOportunidade(vaga.id)
            .subscribe(
              () => {
                this.limpaCampos()
                this.atualizaVagas()
              },
              () => {
                this._loading.dismiss()
                this._alerta.setSubTitle('Erro na remoção da vaga!')
                this._alerta.present()
              }
            )
        },
        () => {
          this._loading.dismiss()
          this._alerta.setSubTitle('Erro na remoção da vaga!')
          this._alerta.present()
        }
      )
  }

  /**
  * Edita vaga usando o método "editaVaga"
  * do serviço "OportunidadeServiceProvider"
  * @method editarVaga
  * @return {none}
  */
 editarVaga() : void {

  this.preparaCarregamento()

  let titulo = this.form.controls['titulo'].value;
  let descricao = this.form.controls['descricao'].value;
  let cidade = this.form.controls['cidade'].value;
  let estado = this.form.controls['estado'].value;
  let unidade = this.form.controls['unidade'].value;

  let vaga: Oportunidade = {
    id: this._idVaga,
    titulo: titulo,
    descricao: descricao,
    cidade: cidade,
    estado: estado,
    unidade: unidade,
    contratante: this._user.uid
  }
  
  this._oportunidadeServiceProvider.editaOportunidade(vaga)
    .subscribe(
      () => {
        this.limpaCampos()
        this.atualizaVagas()
      },
      () => {
        this._loading.dismiss()
        this._alerta.setSubTitle('Erro na edição da vaga!')
        this._alerta.present()
      }
    )
  
  }

  /**
   * Seleciona a vaga a ser editada
   * @method selecionaVaga
   * @param vaga 
   * @return {none}
   */
  selecionaVaga(vaga: Oportunidade) : void {
    this.isEdicao = true

    this._idVaga = vaga.id
    this.form.controls['titulo'].setValue(vaga.titulo)
    this.form.controls['descricao'].setValue(vaga.descricao)
    this.form.controls['cidade'].setValue(vaga.cidade)
    this.form.controls['estado'].setValue(vaga.estado)
    this.form.controls['unidade'].setValue(vaga.unidade)
  }

  /**
   * Limpa os campos do cadastro de vaga
   * @method limpaCampos
   * @return {none}
   */
  limpaCampos(): void {
    this.isEdicao = false
    this.form.controls['titulo'].setValue('')
    this.form.controls['descricao'].setValue('')
    this.form.controls['cidade'].setValue('')
    this.form.controls['estado'].setValue('')
    this.form.controls['unidade'].setValue('')
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
      content: 'Atualizando vagas'
    })

    this._loading.present()

  }

}
