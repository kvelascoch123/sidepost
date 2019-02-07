import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, URLSearchParams } from '@angular/http';

import { URL_SERVICIOS } from "../config/url.servicios";

import {AlertController, Platform} from "ionic-angular";
import {Storage} from "@ionic/storage";
@Injectable()
export class UsuarioService {

token:string;
id_usuario:string;

  constructor(public http: Http,
     private alertCtrl: AlertController
  , private platform:Platform, private storage:Storage) {
    console.log('Hello UsuarioProvider Provider');
  }

  activo():boolean{

    if( this.token ){
      return true;
    }else{
      return false;
    }

  }

//  1=====
  ingresar(correo:string, contrasena:string){
    let data = new URLSearchParams();
    data.append("correo", correo);
    data.append("contrasena", contrasena);

    let url = URL_SERVICIOS + "/login";

    // tiempo d espera autenticacion
    return this.http.post(url, data)
                    .map(resp=>{
                        //respuesta en formato json
                      let data_resp = resp.json();
                      console.log(data_resp);

                      if(data_resp.error){
                          this.alertCtrl.create({
                            title:"Error al iniciar",
                            subTitle:data_resp.mensaje,
                            buttons:["Ok"]
                          }).present();
                      }else{
                        this.token=data_resp.token;
                        this.id_usuario=data_resp.id_usuario;

                        //guardar storage

                        this.guardar_storage();
                      }
                    })

  }

  cerrar_secion(){
    this.token = null;
    this.id_usuario=null;

    this.guardar_storage();
    window.location.reload();
  }


guardar_storage(){
    if (this.platform.is("cordova")){
        //DISPOSITIVO======================================

       this.storage.set('token', this.token);
       this.storage.set('id_usuario', this.id_usuario);

    }else{
      // COMPUTADORA

      if(this.token){
      localStorage.setItem("token", this.token);
      localStorage.setItem("id_usuario", this.id_usuario);

    }else{
      localStorage.removeItem("token");
      localStorage.removeItem("id_usuario");
    }
}
  }
// guardar en estorage____
cargar_storage(){

let promesa = new Promise((resolve, reject)=>{
  if(this.platform.is("cordova")){
    //DISPOSITIVO
    this.storage.ready()
                .then( ()=>{

                  this.storage.get("token")
                  .then(token =>{
                    if(token){
                      this.token = token;
                    }

                  })
                  this.storage.get("id_usuario")
                  .then(id_usuario =>{
                    if(id_usuario){
                      this.id_usuario = id_usuario;
                    }
                    resolve();
                })

})
  }else{
  //COMPUTADORA
  //verifica si el elemnego existe
  if(localStorage.getItem("token")){

  this.token = localStorage.getItem("token");
  this.id_usuario = localStorage.getItem("id_usuario");


}
resolve();

}

});
return promesa;
}
}
