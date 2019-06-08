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

  cadastraCandidatura(candidatura: Candidatura){
    return this._http.post(this._url+'/candidatura', candidatura)
  }

  deletaCandidatura(candidatura){
    return this._http.delete(this._url+'/candidatura/' + candidatura)
  }

}
