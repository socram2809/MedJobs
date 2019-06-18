import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formacao } from '../../modelos/formacao';

@Injectable()
export class FormacaoServiceProvider {

  private _url = 'https://medjobs-service.herokuapp.com';

  constructor(private _http: HttpClient) {
  }

  listaTodasFormacoes(){
    return this._http.get<Formacao[]>(this._url+'/formacao')
  }

  buscaFormacoesMedico(medico){
    return this._http.get<Formacao[]>(this._url+'/formacao/medico/'+medico)
  }

  cadastraFormacao(formacao: Formacao){
    return this._http.post(this._url+'/formacao', formacao)
  }

  deletaFormacao(formacao){
    return this._http.delete(this._url+'/formacao/' + formacao)
  }

  editaFormacao(formacao: Formacao){
    return this._http.put(this._url+'/formacao', formacao)
  }

}
