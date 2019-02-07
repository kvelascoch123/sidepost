import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CarritoService} from "../../providers/carrito";



@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  id_org:any;
  usuario:any;
  tipo_doc:any;
  id_doc_ord:any;
  id_doc_shipment:any;
  id_customer:any;
  pay_met:any;
  pay_term:any
  pricelist:any
  costcenter:any
  user1:any
  user2:any
  warehouse:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private _cs:CarritoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }

  guardar_config(){

    this._cs.guardar_configuracion(this.id_org,
                           this.usuario,
                           this.tipo_doc,
                           this.id_doc_ord,
                           this.id_doc_shipment,
                           this.id_customer,
                           this.pay_met,
                           this.pay_term,
                           this.pricelist,
                           this.costcenter,
                           this.user1,
                           this.user2,
                           this.warehouse);
                           {

                           }
  }

}
