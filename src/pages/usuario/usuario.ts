import { Component } from '@angular/core';
import { IonicPage, NavController, Alert, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Serviços
import { AuthProvider } from '../../providers/auth/auth';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';

//Páginas
import { LoginPage } from '../login/login';

//Modelos
import { Usuario } from '../../modelos/usuario';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  /**
   * Cria referência para o objeto FormGroup
   */
  public form: FormGroup;

  /**
   * Alerta de sucesso
   */
  private _alertaSucesso: Alert;

  /**
   * Alerta de erro
   */
  private _alertaErro: Alert;

  /**
   * Tela de loading
   */
  private _loading: Loading;

  constructor(public navCtrl: NavController, private _FB: FormBuilder, private _AUTH: AuthProvider,
              private _usuarioServiceProvider: UsuarioServiceProvider, private _alertCtrl: AlertController,
              private _loadingCtrl: LoadingController) {
    //Define o objeto "FormGroup" usando o FormBuilder do Angular
    this.form = this._FB.group({
      'nome': ['', Validators.required],
      'email': ['', Validators.required],
      'tipoUsuario': ['', Validators.required],
      'senha': ['', Validators.required]
    });
  }

  /**
  * Cria usuário usando os métodos "criaNovoUsuario"
  * do serviço "AuthProvider" (fornecendo os FormControls email
  * e senha do template via o objeto FormBuilder) e o método "adicionaUsuario"
  * do serviço "UsuarioServiceProvider"
  * @method cadastrarUsuario
  * @return {none}
  */
 cadastrarUsuario() : void {
  this._alertaSucesso = this._alertCtrl.create({
    title: 'Aviso',
    buttons: [
      { text: 'OK', handler: () => {this.navCtrl.setRoot(LoginPage)}}
    ]
  });

  this._alertaErro = this._alertCtrl.create({
    title: 'Aviso',
    buttons: [
      { text: 'OK'}
    ]
  });

  this._loading = this._loadingCtrl.create({
    content: 'Cadastrando usuário'
  })

  this._loading.present()

  let email = this.form.controls['email'].value;
  let senha = this.form.controls['senha'].value;
  let nome = this.form.controls['nome'].value;
  let tipoUsuario = this.form.controls['tipoUsuario'].value;

  this._AUTH.criaNovoUsuario(email, senha)
  .then((auth : any) =>
  {

    let usuario: Usuario = {
      uid: auth.user.uid,
      nome: nome,
      tipo: tipoUsuario
    }

    this._usuarioServiceProvider.adicionaUsuario(usuario)
      .subscribe(
        () => {
          this._loading.dismiss();
          this._alertaSucesso.setSubTitle('Cadastro Realizado!');
          this._alertaSucesso.present();
        },
        () => {
          this._loading.dismiss();
          this._alertaErro.setSubTitle('Erro no cadastro de usuário.');
          this._alertaErro.present();
        }
      )

    })
    .catch((error : any) =>
    {
      this._loading.dismiss();
      this._alertaErro.setSubTitle('Erro no cadastro de usuário.');
      this._alertaErro.present();
    });
  }

}
