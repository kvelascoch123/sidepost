import { Component } from '@angular/core';
import {  NavController, NavParams, ViewController } from 'ionic-angular';

import {CarritoService} from "../../providers/carrito";
import {CustomerPage,ModalCustomerPage} from "../index.paginas";

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
  carritoPage: CarritoPage;
  customerPage:CustomerPage;
  customer:any={};

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
   private _cs: CarritoService,
 private viewCtrl:ViewController,
 ) {
  console.log(_cs.items);
  console.log(this.navParams.get("customer"));
  this.customer = this.navParams.get("title");
  console.log("APARECE" +this.customer)
  }


  ionViewWillEnter() {
    console.log('cargando ');
  //  this._cs.cargar_ordenes();
  this._cs.actualizar_total();
  this._cs.iva();
  }
  reset(){
  this.navCtrl.push("CarritoPage");
  }
}
