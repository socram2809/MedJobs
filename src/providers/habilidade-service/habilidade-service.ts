import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habilidade } from '../../modelos/habilidade';

@Injectable()
export class HabilidadeServiceProvider {

  private _url = 'https://medjobs-service.herokuapp.com';

  constructor(private _http: HttpClient) {
  }

  listaTodasHabilidades(){
    return this._http.get<Habilidade[]>(this._url+'/habilidade')
  }

  buscaHabilidadesMedico(medico){
    return this._http.get<Habilidade[]>(this._url+'/habilidade/medico/'+medico)
  }

  cadastraHabilidade(habilidade: Habilidade){
    return this._http.post(this._url+'/habilidade', habilidade)
  }

  deletaHabilidade(habilidade){
    return this._http.delete(this._url+'/habilidade/' + habilidade)
  }

  editaHabilidade(habilidade: Habilidade){
    return this._http.put(this._url+'/habilidade', habilidade)
  }

}