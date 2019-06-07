import { Component } from '@angular/core';
import { NavController, Alert, Loading, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OportunidadeServiceProvider } from '../../providers/oportunidade-service/oportunidade-service';
import { Oportunidade } from '../../modelos/oportunidade';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /**
   * Cria referência para o objeto FormGroup
   */
  public form: FormGroup;

  /**
   * Oportunidades carregadas
   */
  public oportunidades: Oportunidade[];

  /**
   * Alerta para o usuário
   */
  private _alerta: Alert;

  /**
   * Tela de loading
   */
  private _loading: Loading;

  constructor(public navCtrl: NavController, private _FB: FormBuilder, 
    private _oportunidadeServiceProvider: OportunidadeServiceProvider, private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController) {
    //Define o objeto "FormGroup" usando o FormBuilder do Angular
    this.form = this._FB.group({
      'busca': ['', Validators.required]
    });
  }

  buscarOportunidades(){
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });
  
    this._loading = this._loadingCtrl.create({
      content: 'Buscando oportunidades'
    })
  
    this._loading.present()

    let busca = this.form.controls['busca'].value

    this._oportunidadeServiceProvider.filtraOportunidades(busca)
      .subscribe(
        (oportunidades) => {
          this.oportunidades = oportunidades;
          this._loading.dismiss();
        },
        () => {
          this._loading.dismiss();
          this._alerta.setSubTitle('Erro na busca de oportunidades.');
          this._alerta.present();
        }
      )
  }

  ionViewWillEnter(){
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        { text: 'OK'}
      ]
    });
  
    this._loading = this._loadingCtrl.create({
      content: 'Buscando oportunidades'
    })
  
    this._loading.present()

    this._oportunidadeServiceProvider.listaTodasOportunidades()
      .subscribe(
        (oportunidades) => {
          this.oportunidades = oportunidades;
          this._loading.dismiss();
        },
        () => {
          this._loading.dismiss();
          this._alerta.setSubTitle('Erro na busca de oportunidades.');
          this._alerta.present();
        }
      )
  }

  selecionaOportunidade(oportunidade: Oportunidade){
    this.navCtrl.push('DetalhesOportunidadePage', {
      oportunidadeSelecionada: oportunidade
    });
  }

}
