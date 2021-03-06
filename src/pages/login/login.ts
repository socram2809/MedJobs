import { Component } from '@angular/core';
import { IonicPage, NavController, Alert, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Serviços
import { AuthProvider } from '../../providers/auth/auth';

//Páginas
import { HomePage } from '../home/home';
import { UsuarioPage } from '../usuario/usuario';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import { Usuario } from '../../modelos/usuario';

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
   * Dados do Usuário
   */
  private _dadosUsuario: Usuario;

  constructor(public navCtrl: NavController, private _FB: FormBuilder, private _AUTH: AuthProvider,
              private _alertCtrl: AlertController, private _loadingCtrl: LoadingController,
              private _usuarioServiceProvider: UsuarioServiceProvider, public events: Events) {
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

    this._loading = this._loadingCtrl.create({
      content: 'Realizando login'
    })

    this._loading.present();

    let email: any = this.form.controls['email'].value;
    let senha: any = this.form.controls['senha'].value;

    this._AUTH.loginWithEmailAndPassword(email, senha)
    .then((auth : any) =>
    {
      this._user = this._AUTH.retornaUsuarioLogado()
      this._usuarioServiceProvider.buscaUsuario(this._user.uid)
        .subscribe(
          (usuario) => {
            this._dadosUsuario = usuario
            if(usuario.tipo === 'Médico'){
              this.events.publish('usuarioMedico')
            }else{
              this.events.publish('usuarioContratante')
            }
            this._loading.dismiss()
            this.navCtrl.setRoot(HomePage)
          },
          () => {
            this._loading.dismiss();
            this._alerta.setSubTitle('Erro na busca de usuário.');
            this._alerta.present();
          }
        )
    })
    .catch((error : any) =>
    {
      this._loading.dismiss();
      this._alerta.setSubTitle('Erro no login. Verifique seu e-mail e senha.');
      this._alerta.present();
    });
  }

  /**
   * Redireciona para a página de cadastro de usuário
   * @method cadastrarUsuario
   * @return {none}
   */
  cadastrarUsuario() : void {
    this.navCtrl.push(UsuarioPage);
  }

}
