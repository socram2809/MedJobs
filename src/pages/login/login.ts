import { Component } from '@angular/core';
import { IonicPage, NavController, Alert, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';

//Importa as páginas que poderão ser acessadas pela página de "Login"
import { HomePage } from '../home/home';
import { UsuarioPage } from '../usuario/usuario';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  /**
   * Cria referência para o objeto FormGroup
   */
  public form: FormGroup;

  private _alerta: Alert;

  constructor(public navCtrl: NavController, private _FB: FormBuilder, private _AUTH: AuthProvider,
              private _alertCtrl: AlertController) {
    //Define o objeto "FormGroup" usando o FormBuilder do Angular
    this.form = this._FB.group({
      'email': ['', Validators.required],
      'senha': ['', Validators.required]
    });
  }

  /**
  * Loga usando o método "loginWithEmailAndPassword"
  * do serviço "AuthProvider" (fornecendo os FormControls email
  * e senha do template via o objeto FormBuilder)
  * @method logIn
  * @return {none}
  */
  logIn() : void {
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });

    let email: any = this.form.controls['email'].value;
    let senha: any = this.form.controls['senha'].value;

    this._AUTH.loginWithEmailAndPassword(email, senha)
    .then((auth : any) =>
    {
      this.navCtrl.setRoot(HomePage);
    })
    .catch((error : any) =>
    {
      this._alerta.setSubTitle('Erro no login. Verifique seu e-mail e senha.');
      this._alerta.present();
    });
  }

}
