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

}