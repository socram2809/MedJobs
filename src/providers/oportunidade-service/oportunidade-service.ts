import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oportunidade } from '../../modelos/oportunidade';

@Injectable()
export class OportunidadeServiceProvider {

  private _url = 'https://medjobs-service.herokuapp.com';

  constructor(private _http: HttpClient) {
  }

  listaTodasOportunidades(){
    return this._http.get<Oportunidade[]>(this._url+'/oportunidade')
  }

  filtraOportunidades(busca){
    return this._http.get<Oportunidade[]>(this._url+'/oportunidade/busca/'+busca)
  }

  buscaOportunidade(oportunidade){
    return this._http.get<Oportunidade>(this._url+'/oportunidade/'+oportunidade)
  }

  buscaOportunidadesContratante(contratante){
    return this._http.get<Oportunidade[]>(this._url+'/oportunidade/contratante/'+contratante)
  }

  cadastraOportunidade(oportunidade: Oportunidade){
    return this._http.post(this._url+'/oportunidade', oportunidade)
  }

  deletaOportunidade(oportunidade){
    return this._http.delete(this._url+'/oportunidade/' + oportunidade)
  }

  editaOportunidade(oportunidade: Oportunidade){
    return this._http.put(this._url+'/oportunidade', oportunidade)
  }

}