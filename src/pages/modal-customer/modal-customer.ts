import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {CarritoService} from "../../providers/carrito";
import {CarritoPage} from "../carrito/carrito";

@IonicPage()
@Component({
  selector: 'page-modal-customer',
  templateUrl: 'modal-customer.html',
})
export class ModalCustomerPage {
  customer:any;
  almacen:any;
page=CarritoPage;
nameC:any;
last_nameC:any;
bp_categoryC:any;
tax_idC:any;
addressC:any;
phoneC:any;
emailC:any
id_customerC:any;



  constructor(public navCtrl: NavController,
    public navParams: NavParams, private _cs:CarritoService) {

    console.log(this.navParams.get("customer"));
    this.customer = this.navParams.get("customer");
  console.log("OBJETO" + this.customer.nombre)
  }

guardarCustomer(){


  this._cs.guardarCustomer(this.nameC,this.last_nameC,this.bp_categoryC,this.tax_idC, this.addressC, this.phoneC, this.emailC,this.id_customerC);

//Objetto con datos del CUSTOMER traido por navParams

  }
}
