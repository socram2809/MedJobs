import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidatura } from '../../modelos/candidatura';

@Injectable()
export class CandidaturaServiceProvider {

  private _url = 'https://medjobs-service.herokuapp.com';

  constructor(private _http: HttpClient) {
  }

  listaTodasCandidaturas(){
    return this._http.get<Candidatura[]>(this._url+'/candidatura')
  }

  buscaCandidaturasMedico(medico){
    return this._http.get<Candidatura[]>(this._url+'/candidatura/medico/'+medico)
  }

  buscaCandidaturasOportunidade(oportunidade){
    return this._http.get<Candidatura[]>(this._url+'/candidatura/oportunidade/'+oportunidade)
  }

  cadastraCandidatura(candidatura: Candidatura){
    return this._http.post(this._url+'/candidatura', candidatura)
  }

  deletaCandidatura(candidatura){
    return this._http.delete(this._url+'/candidatura/' + candidatura)
  }

  deletaCandidaturasOportunidade(oportunidade){
    return this._http.delete(this._url+'/candidatura/oportunidade/'+oportunidade)
  }

  editaCandidatura(candidatura: Candidatura){
    return this._http.put(this._url+'/candidatura', candidatura)
  }

}
