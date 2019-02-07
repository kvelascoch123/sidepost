import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


//servicis
import {CarritoService} from "../../providers/carrito";


@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {
producto:any={};
  constructor(public navCtrl: NavController,
    private navParams: NavParams,
     private _cs:CarritoService) {

    console.log(this.navParams.get("producto"));
    this.producto = this.navParams.get("producto");
  }
}
