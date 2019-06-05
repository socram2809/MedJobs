import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioServiceProvider {

  private _url = 'https://medjobs-service.herokuapp.com';

  constructor(private _http: HttpClient) {
  }

  adicionaUsuario(usuario){
    return this._http.post(this._url+'/usuarios', usuario)
  }

}
