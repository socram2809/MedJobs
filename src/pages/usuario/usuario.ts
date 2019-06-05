import { Component } from '@angular/core';
import { IonicPage, NavController, Alert, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Serviços
import { AuthProvider } from '../../providers/auth/auth';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';

//Páginas
import { LoginPage } from '../login/login';

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

  private _alertaSucesso: Alert;

  private _alertaErro: Alert;

  constructor(public navCtrl: NavController, private _FB: FormBuilder, private _AUTH: AuthProvider,
              private _usuarioServiceProvider: UsuarioServiceProvider, private _alertCtrl: AlertController) {
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
  * e senha do template via o objeto FormBuilder) e o método ""
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

  let email = this.form.controls['email'].value;
  let senha = this.form.controls['senha'].value;
  let nome = this.form.controls['nome'].value;
  let tipoUsuario = this.form.controls['tipoUsuario'].value;

  let usuario = {
    nome: nome,
    tipo: tipoUsuario
  }

  this._AUTH.criaNovoUsuario(email, senha)
  .then((auth : any) =>
  {
    this._usuarioServiceProvider.adicionaUsuario(usuario)
      .subscribe(
        () => {
          this._alertaSucesso.setSubTitle('Cadastro Realizado!');
          this._alertaSucesso.present();
        },
        () => {
          this._alertaErro.setSubTitle('Erro no cadastro de usuário.');
          this._alertaErro.present();
        }
      )
  })
  .catch((error : any) =>
  {
    this._alertaErro.setSubTitle('Erro no cadastro de usuário.');
    this._alertaErro.present();
  });
}

}
