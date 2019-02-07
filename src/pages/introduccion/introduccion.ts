import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import {TabsPage} from "../index.paginas";
import {AjustesProvider} from "../../providers/ajustes";

@IonicPage()
@Component({
  selector: 'page-introduccion',
  templateUrl: 'introduccion.html',
})
export class IntroduccionPage {

  slides:any[] = [
    {
      title: "Bienvenido!!!",
      description: "Esta <b>aplicación</b> nos permite realizar pedidos de productos!",
      image: "http://186.69.209.150:8030/restXZ/public/img/logoposs.png",
    },
    {
      title: "SidePoss",
      description: "<b>Antes de</b> realizar un pedido, usted debera aceptar los detalles de la factura.",
      image: "http://186.69.209.150:8030/restXZ/public/img/ica-slidebox-img-2.png",
    },
    {
      title: "¿Dónde configurar detalles de la factura?",
      description: "En la aplicación se presenta el icono de configuracion, usted debera dar doble tap en el botón aceptar. Este proceso se realiza una unica vez a menos q se requiera cambiar los datos de la factura.",
      image: "http://186.69.209.150:8030/restXZ/public/img/configurando.png",
    }
  ];




  constructor(public navCtrl: NavController, private _ajustes: AjustesProvider) {
  }


saltar_tutorial(){
this._ajustes.ajustes.mostrar_tutorial = false;
this._ajustes.guardar_storage();
  this.navCtrl.setRoot(TabsPage);
}

}
