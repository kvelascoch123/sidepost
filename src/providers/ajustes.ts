import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Platform} from "ionic-angular";
/*
  Generated class for the AjustesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class AjustesProvider {

  ajustes={
    mostrar_tutorial:true
  }

  constructor(private storage: Storage, private platform:Platform) {
    console.log('Hello AjustesProvider Provider');
  }


  cargar_storage(){
    if (this.platform.is("cordova")) {
        //DISPOSITIVO
        if (  localStorage.getItem("ajustes")) {
            this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
        }

    }else{
  //  Descoptk
  if (  localStorage.getItem("ajustes")) {
      this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
  }
  }

  }




  guardar_storage(){

    if (this.platform.is("cordova")) {
        //DISPOSITIVO
        localStorage.setItem("ajustes",JSON.stringify(this.ajustes));

    }else{
  //  Descoptk
  localStorage.setItem("ajustes",JSON.stringify(this.ajustes));
  }
  }

}
