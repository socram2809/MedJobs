import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelos/usuario';

@Injectable()
export class UsuarioServiceProvider {

  private _url = 'https://medjobs-service.herokuapp.com';

  constructor(private _http: HttpClient) {
  }

  buscaUsuario(usuario){
    return this._http.get<Usuario>(this._url+'/usuario/'+usuario)
  }

  adicionaUsuario(usuario: Usuario){
    return this._http.post(this._url+'/usuario', usuario)
  }

}
