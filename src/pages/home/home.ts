import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import {ProductosService} from "../../providers/index.services";

//
import {ProductosPage} from "../productos/productos";
import {CarritoService, UsuarioService} from "../../providers/index.services";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  productoPage = ProductosPage;
producto:any={};

  constructor(public navCtrl: NavController,
  private _ps: ProductosService, private navParams:NavParams,
private _cs:CarritoService,
private _us:UsuarioService) {

    console.log(this.navParams.get("producto"));
    this.producto = this.navParams.get("producto");
  }
  siguiente_pagina(infiniteScroll){
    this._ps.cargar_todos()
    .then(()=>{
      infiniteScroll.complete();
    })

  }

}
