import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experiencia } from '../../modelos/experiencia';

@Injectable()
export class ExperienciaServiceProvider {

  private _url = 'https://medjobs-service.herokuapp.com';

  constructor(private _http: HttpClient) {
  }

  listaTodasExperiencias(){
    return this._http.get<Experiencia[]>(this._url+'/experiencia')
  }

  buscaExperienciasMedico(medico){
    return this._http.get<Experiencia[]>(this._url+'/experiencia/medico/'+medico)
  }

  cadastraExperiencia(experiencia: Experiencia){
    return this._http.post(this._url+'/experiencia', experiencia)
  }

  deletaExperiencia(experiencia){
    return this._http.delete(this._url+'/experiencia/' + experiencia)
  }

}
