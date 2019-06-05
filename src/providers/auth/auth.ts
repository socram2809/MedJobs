import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase';

@Injectable()
export class AuthProvider {

  public user : Observable<any>;

  constructor(public http: Http) {
    firebase.auth().onAuthStateChanged((user) =>
      {
        if (user)
        {
          // Usuário está logado.
          console.log('Usuário está logado');
        }
        else
        {
          // Nenhum usuário está logado
          console.log('Usuário não está logado');
        }
      });
  }

  /**
    * Usa o método signInWithEmailAndPassword da API Web do Firebase
    * para autenticar a tentativa de login do usuário
    *
    * @method loginWithEmailAndPassword
    * @param email    {string}      Endereço de e-mail do usuário
    * @param password {string}      Senha da conta do usuário
    * @return {Promise}
    */
   loginWithEmailAndPassword(email     : string, password  : string) : Promise<any>
   {
      return new Promise((resolve, reject) =>
      {
         firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then((val : any) =>
         {
            resolve(val);
         })
         .catch((error : any) =>
         {
            reject(error);
         });
      });
   }

  /**
    * Desloga com o método signOut da API Web do Firebase
    *
    * @method logOut
    * @return {Promise}
    */
   logOut() : Promise<any>
   {
      return new Promise((resolve, reject) =>
      {
        firebase
        .auth()
        .signOut()
        .then(() =>
        {
           resolve(true);
        })
        .catch((error : any) =>
        {
           reject(error);
        });
      });
   }

   /**
    * Usa o método createUserWithEmailAndPassword da API Web do Firebase
    * para criar novo usuário
    *
    * @method criaNovoUsuario
    * @param email    {string}      Endereço de e-mail do usuário
    * @param password {string}      Senha da conta do usuário
    * @return {Promise}
    */
   criaNovoUsuario(email: string, password: string) : Promise<any> {
      return new Promise((resolve, reject) =>
      {
         firebase
         .auth()
         .createUserWithEmailAndPassword(email, password)
         .then((val : any) =>
         {
            resolve(val);
         })
         .catch((error : any) =>
         {
            reject(error);
         });
      });
   }

}
