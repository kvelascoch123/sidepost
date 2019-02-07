import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {CarritoPage, ModalCustomerPage} from "../index.paginas";
import {CarritoService} from "../../providers/carrito";



@IonicPage()
@Component({
  selector: 'page-customer',
  templateUrl: 'customer.html',
})
export class CustomerPage {
modalCustomerPage=ModalCustomerPage;
carritoPage=CarritoPage;


  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private viewCtrl:ViewController,
     private _cs:CarritoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerPage');
  }
/*
  cerrar(){
    this.navCtrl.push("CarritoPage");

  }
*/

buscar_customers(ev: any){
  let valor = ev.target.value;
  console.log(valor);

  this._cs.buscar_customer_name( valor);
}

}
