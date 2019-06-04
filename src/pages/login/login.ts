import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';

//Importa o componente "HomePage"
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, private _FB: FormBuilder, private _AUTH: AuthProvider) {
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
   logIn() : void
   {
      let email: any = this.form.controls['email'].value;
      let senha: any = this.form.controls['senha'].value;

      this._AUTH.loginWithEmailAndPassword(email, senha)
      .then((auth : any) =>
      {
         this.navCtrl.setRoot(HomePage);
      })
      .catch((error : any) =>
      {
         console.log(error.message);
      });
   }

}
