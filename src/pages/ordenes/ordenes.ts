import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

import {CarritoService} from "../../providers/carrito";

import {UsuarioService} from "../../providers/index.services";

import {OrdenesDetallePage} from "../index.paginas";
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  ordenesDetalle=OrdenesDetallePage;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private _cs: CarritoService, private _us:UsuarioService) {
  }

  ionViewWillEnter() {
    console.log('cargando ordenes');
    this._cs.cargar_ordenes();
    console.log(this._cs.ordenes)
  }

}
