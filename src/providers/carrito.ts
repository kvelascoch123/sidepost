import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Http, URLSearchParams}from'@angular/http';
import 'rxjs/add/operator/map';

import {AlertController, Platform,
  ModalController} from "ionic-angular";

import { Storage } from '@ionic/storage';

// usuario service
import { UsuarioService } from "./usuario";

import { URL_SERVICIOS , URL_WEVSERVICEOB} from "../config/url.servicios";

// paginas del modal
import { LoginPage, CarritoPage, TabsPage, CustomerPage, HomePage} from "../pages/index.paginas";

import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';


@Injectable()
export class CarritoService {
// DATA DEL PEDIDO===================================
  items:any=[];  //sin data
  total_carrito:any;
  ordenes:any[] = [];
  //items_mismo_prod:any;
  ivaTotal:any;
  subtotal:any;
  cantidad: any[];  // del producto selecionado
  total:any; //por cada producto
  //unitPrice:any[];

  // ====DATA OF CUSTOMERS============================
  nameC:any;
  last_nameC:any;
  bp_categoryC="Customer";
  tax_idC:any;
  phoneC:any;
  emailC:any;
  addressC:any;
  idCustomerC:any;

  //BUSCADORES=========================================
  resultados:any[]=[];
  items_result:any=[];
  almacen_customer:any=[];

//GUARDAR CUSTOMER CON EL BUSCADOR
  nombre:any;
  apellido:any;
  cant_edit:any;


  //DATA CONFIG==============
  id_org:any;
  usuario:any;
  tipo_doc:any;
  id_doc_ord:any;
  id_doc_shipment:any;
  id_customer:any;
  pay_met:any;
  pay_term:any;
  pricelist:any;
  costcenter:any;
  user1:any;
  user2:any;
  warehouse:any;

  constructor(public http: Http,
               private alertCtrl:AlertController,
               private platform: Platform,
               private storage:Storage,
               private modalCtrl:ModalController,
               private _us:UsuarioService,
               private formBuilder: FormBuilder,
               private toastCtrl: ToastController

              ) {

    console.log(this.items);

    this.cargar_storage();
    this.actualizar_total();
    this.iva();
    //this.total_por_producto()
  }

  remover_item(idx:number){
    this.items.splice(idx,1);
    this.guardar_storage();
    this.actualizar_total();
    this.iva();

  }

  // EDITAR CANTIDA ===============

  edit_cantidad(idx:number){

    //console.log(idx);

    for (let i = 0; i < this.items.length; i++) {
  console.log(this.items[i])
  //console.log(i)
  //console.log(idx)

  if (i == idx) {
    //  console.log("es igual")
      //ALERT
      let alert = this.alertCtrl.create({
        title: 'Editar cantidad del producto',
        inputs: [
          {
            name: 'cantidad',
            placeholder: 'Cantidad',
            type:'Number'
          },

        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              data.cantidad = 1;
            }
          },
          {
            text: 'Ok',
            handler: data => {
              if (idx == i) {
                Object.defineProperty(this.items[i], 'cantidad',{
                                       value:data.cantidad,// 0,21+1
                                       writable: true,
                                       enumerable: true,
                                       configurable: true
                      })
                      let total_sin_iva=(this.items[i].cantidad*this.items[i].precio_compra);
                      let total_ivaA=(this.items[i].cantidad_iva/100)+1;
                      let total_ivaB=this.items[i].cantidad_iva/100;
                      let total_prod_iva= total_sin_iva *1.12;

                      let Total_Iva=((total_prod_iva)/(total_ivaA))*(total_ivaB); //0.98


                      Object.defineProperty(this.items[i], 'total_iva',{
                                     value:Total_Iva.toFixed(2),// 0,21+1
                                     writable: true,
                                     enumerable: true,
                                     configurable: true
                    })

                    Object.defineProperty(this.items[i], 'total_prod_con_iva',{
                                   value:total_prod_iva.toFixed(2),// 0,21+1
                                   writable: true,
                                   enumerable: true,
                                   configurable: true
                  })

                    Object.defineProperty(this.items[i], 'total_prod_sin_iva',{
                                   value:total_sin_iva.toFixed(2),// 0,21+1
                                   writable: true,
                                   enumerable: true,
                                   configurable: true
                  })

                  this.actualizar_total();
                  this.guardar_storage();
              }

  }
  }
  ]
  });alert.present();  ///AQUIIIIIIIIIASIDAISDIASDIAISAISDI

    }



        this.items[i];

    }


}



    //romar el valor parametro
    // cambiar el valor

// **********************************************************************
  realizar_pedido(){
     let data= new URLSearchParams(); //objeto data
     let codigos:string[]=[];     // let almacenamietno
     let cantidad:string[]=[];
     let unitprice:string[]=[];
    console.log(codigos)
    console.log(cantidad)
    console.log(unitprice)

     for(let item of this.items){
       codigos.push(item.codigo); // aqui se almacena
       cantidad.push(item.cantidad);
       unitprice.push(item.precio_compra);
      // warehouse.push(item.almacen);
     }

      //codigos para mandarlos como item_parametro
      data.append("items", codigos.join(","));
      data.append("total_carrito",this.total_carrito);
      data.append("ivaTotal",this.ivaTotal);
      data.append("subtotal", this.subtotal);
      data.append("cantidad",cantidad.join(","));
      data.append("precio_compra",unitprice.join(","));

    //  let customer = this.guardarCustomer(this.nameC,this.last_nameC,this.bp_categoryC,this.tax_idC,this.addressC);

      data.append("nameC",this.nameC);
      data.append("last_nameC",this.last_nameC);
      data.append("bp_categoryC",this.bp_categoryC);
      data.append("tax_idC",this.tax_idC);
      data.append("phoneC",this.phoneC);
      data.append("emailC",this.emailC);
      data.append("addressC",this.addressC);
      data.append("id_customerC", this.idCustomerC);


    //  data.append("emailC",this.emailC);   COUNTRY
    console.log(codigos.join(","))
    console.log(cantidad.join(","))
    console.log(unitprice.join(","))
    //console.log(data.append("nameC", this.nameC));
      let url = `${ URL_SERVICIOS }/pedidos/realizar_orden/${ this._us.token }/${ this._us.id_usuario }`;

      // AKII =====================consumir web service OB=========================================================================
    //  let urlWS = `${ URL_WEVSERVICEOB }/ec.com.sidesoft.external.interfaces.setInvoiceSale`;


      this.http.post(url, data)
                .subscribe( resp=>{
                  let respuesta = resp.json();

                  if(respuesta.error){
                    this.alertCtrl.create({
                      title: "Error en la orden",
                      subTitle: respuesta.mensaje,
                      buttons: ["OK"]
                    }).present();

                  }else{
                    this.items = [];

                    this.g_xml();  // GENERA EL XML
                    let modal: any
                    modal= this.modalCtrl.create(TabsPage);
                    modal.present();

                    this.alertCtrl.create({   // ====GENRRA FORMULARIO ===========

                      title: "Orden realizada!",
                      subTitle: "Nos contactaremos con usted proximamente ",
                      buttons: ["OK"]



                    }).present();


                  }

                })





  }



  // *******************************************  AGRGAR AL CARRITO  (desde detalle producto)****************************
  agregar_carrito( item_parametro:any){
  let modal: any;

  //si ya no existe
for( let item of this.items ){
  if( item.codigo == item_parametro.codigo && item.precio_compra == item_parametro.precio_compra ){

    //ALMACENECE EN UNA VARIABLE LA CANTIDAD Q DESEA COMPRAR
      this.alertCtrl.create({
      title:"Ya existe en el carrito de compras",
      subTitle: item_parametro.producto + ", ya se encuentra en su carrito de compras",
      buttons: ["OK"]
    }).present();

    return;
  }
}let alert = this.alertCtrl.create({
  title: 'Cantidad del producto deseado',
  inputs: [
    {
      name: 'cantidad',
      placeholder: 'Cantidad',
      type:'Number',
      value:'1',

    },

  ],
  buttons: [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: data => {
        data.cantidad = 1;
      }
    },
    {
      text: 'Ok',
      handler: data => {
        //=====================================
        if ((data.cantidad )) {
      /*    for (let item of this.items) {
            this.cantidad = data.cantidad;

          }*/
          console.log(this.cantidad);

          if (item_parametro && data) {


            Object.defineProperty(item_parametro, 'cantidad',{
                         // asigne la cantidad
                         value:data.cantidad,
                         writable: true,
                         enumerable: true,
                         configurable: true
                       })
                       this.presentToast();
           modal= this.modalCtrl.create(TabsPage);
           modal.present();

           // CALCULO DEL TOTAL POR PRODUCTO
           //TOTAL CON IVA
           let total_sin_iva=(item_parametro.cantidad*item_parametro.precio_compra);
           let total_ivaA=(item_parametro.cantidad_iva/100)+1;
           let total_ivaB=item_parametro.cantidad_iva/100;
           let total_prod_iva= total_sin_iva *1.12;

           let Total_Iva=((total_prod_iva)/(total_ivaA))*(total_ivaB); //0.98


           Object.defineProperty(item_parametro, 'total_iva',{
                          value:Total_Iva.toFixed(2),// 0,21+1
                          writable: true,
                          enumerable: true,
                          configurable: true
         })

         Object.defineProperty(item_parametro, 'total_prod_con_iva',{
                        value:total_prod_iva.toFixed(2),// 0,21+1
                        writable: true,
                        enumerable: true,
                        configurable: true
       })

         Object.defineProperty(item_parametro, 'total_prod_sin_iva',{
                        value:total_sin_iva.toFixed(2),// 0,21+1
                        writable: true,
                        enumerable: true,
                        configurable: true
       })
          }
          console.log(this.items);
          this.items.push( item_parametro )

          // ===================================
        } else {
        //this.cantidad = 1;
          return false;
        }
      }
    }
  ]
});
alert.present();

this.actualizar_total();
this.guardar_storage();

}




presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Producto añadido al pedido ',
    duration: 3500,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
  //  console.log('Dismissed toast');
  });

  toast.present();
}

// ********************STORAGE************************
guardar_storage(){
    if (this.platform.is("cordova")){
        //DISPOSITIVO======================================

       this.storage.set('items', this.items);
       localStorage.setItem("items", JSON.stringify(this.items));

    }else{
      // COMPUTADORA
      localStorage.setItem("items", JSON.stringify(this.items));
    }

  }
cargar_storage(){

let promesa = new Promise((resolve, reject)=>{
  if(this.platform.is("cordova")){
    //DISPOSITIVO
    this.storage.ready()
                .then( ()=>{

                  this.storage.get("items")
                  .then(items =>{
                    if(items){
                      this.items = items;
                    }
                    resolve();
                  })
                })

  }else{
  //COMPUTADORA
  //verifica si el elemnego existe
  if(localStorage.getItem("items")){

  this.items = JSON.parse(localStorage.getItem("items"));

}
resolve();

}

});
return promesa;
}

// ******************** VER CARRITO ************************

ver_carrito(){

  let modal: any;
  if(this._us.token){
    //mostrar pagina carrito  MODALS
    modal= this.modalCtrl.create(CarritoPage);

  }else{
    //mostrar el login  MODALS
    modal= this.modalCtrl.create(LoginPage);

  }

  //aqui ocrre la accion del button======
  modal.present();

  //=======

modal.onDidDismiss((abrirCarrito:boolean)=>{


  if(abrirCarrito){
    this.modalCtrl.create(CarritoPage).present();
  }
})
}
// ********************* CALCULOS ***********************

actualizar_total(){
  this.total_carrito = 0;
  for( let item of this.items ){
    this.total_carrito += Number(item.total_prod_con_iva);
  }
}

          //==================================================
iva(){
  this.ivaTotal = 0;
  this.subtotal = 0;
  for( let item of this.items ){
    this.ivaTotal += Number( (this.total_carrito / ((item.cantidad_iva /100)+1)) * (item.cantidad_iva/100));
    this.subtotal = this.total_carrito - this.ivaTotal;

  }
}

          //===============================================
/*total_por_producto(){
//cantidad * precio productos

for(let item of this.items){
  //si el item == al item

}


} */
// ********************************************


cargar_ordenes(){
  let url = `${ URL_SERVICIOS }/pedidos/obtener_pedidos/${ this._us.token }/${ this._us.id_usuario }`;
  this.http.get(url)
            .map(resp => resp.json())
            .subscribe(data=>{

              if(data.error){

              }else{
                this.ordenes=data.ordenes;

                console.log(this.ordenes);
              }
            })

}
g_xml(){
  let url = URL_SERVICIOS + "/xml";

  this.http.get(url).subscribe();

}
// ********************************************

borrar_orden(orden_id:string){
  let url = `${ URL_SERVICIOS }/pedidos/borrar_pedido/${ this._us.token }/${ this._us.id_usuario }/${orden_id}`;

return this.http.delete(url)
                .map(resp=> resp.json());
}

alertCustomer(){

  let alert = this.alertCtrl.create({
    title: 'Customer',
    inputs: [
      {
        name: 'nameC',
        placeholder: 'Name*',
        type: 'text'

      },
      {
        name: 'last_nameC',
        placeholder: 'Last Name*',
        type: 'text'
      },
      {
        name: 'tax_idC',
        placeholder: 'TaxID',
        type: 'number'
      },
      {
        name: 'phoneC',
        placeholder: 'Phone',
        type: 'number'
      },
      {
        name: 'emailC',
        placeholder: 'Email',
        type: 'email'
      },
      {
        name: 'addressC',
        placeholder: 'Address*',
        type: 'text'
      },
      {
        name: 'id_customerC',
        placeholder: 'ID Customer*',
        type: 'text'
      },


    ],


    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Ok',
        handler: data => {
          if(data.nameC == "" || data.last_nameC=="" || data.addressC=="" ||data.id_customerC=="") {
			this.failedAlert();
      return;
    }
      // LA DATA DEL INPUT SERA LA DATA RESIBIDA
      this.nameC = data.nameC;
      this.last_nameC=data.last_nameC;
      this.tax_idC=data.tax_idC;
      this.phoneC=data.phoneC;
      this.emailC=data.emailC;
      this.addressC = data.addressC;
      this.idCustomerC=data.id_customerC;
    //  this.showCheckbox();

    console.log(data)




        }
      }
    ]
  });
  alert.present();
}

failedAlert(){
  let alert = this.alertCtrl.create({
   title: 'Campos vacios',
   subTitle: 'Los campos con * son requeridos',
   buttons: ['Dismiss']
 });
 alert.present();
}


// ==================BUSCADOR DEL Customer
buscar_customer_name(termino:any){
let url = URL_SERVICIOS + "/customer/buscar/" + termino;

this.http.get( url )
        .subscribe( resp =>{

          let data = resp.json();

          this.resultados = data.customers;
          console.log(this.resultados);

        });

}
// ======================
guardar_objeto(){

  for(let item of this.resultados){

    this.items_result.push( item );
    console.log(this.items_result)
  }

}

//===========================
ir(){
  let modal: any;

    modal= this.modalCtrl.create(CustomerPage);

  //aqui ocrre la accion del button======
  modal.present();

  //=======
}

guardarCustomer(nameC:string,
                last_nameC:string,
                bp_categoryC:any,
                tax_idC:any,
                addressC:string,
                phoneC:any,
                emailC:any,
                id_customerC:any){
  let data = new URLSearchParams();
  data.append("nameC",this.nameC);
  data.append("last_nameC",this.last_nameC);
  data.append("bp_categoryC",this.bp_categoryC);
  data.append("tax_idC",this.tax_idC);

  data.append("addressC",this.addressC);
  data.append("phoneC",this.phoneC);
  data.append("emailC",this.emailC);
  data.append("id_customerC", this.idCustomerC);

  this.nameC = nameC;
  this.last_nameC=last_nameC;
  this.tax_idC=tax_idC;
  this.addressC = addressC;
  this.phoneC=phoneC;
  this.emailC=emailC;
  this.idCustomerC=id_customerC;

console.log(this.nombre);

console.log(nameC);

if (data ==null) {
  //no hay nada
  console.log("ESTA VACIO EL CUSTOMER")
}
let modal:any
modal=this.modalCtrl.create(CarritoPage);
modal.present();

//CREAR EL OBJETO PARA MANDAR AL PEDIDO O ENVIAR EL METODO Y LOS DATA IF ELSE

}

guardar_configuracion( id_org:any,usuario:any, tipo_doc:any,
                       id_doc_ord:any,
                       id_doc_shipment:any,
                       id_customer:any,
                       pay_met:any,
                       pay_term:any,
                       pricelist:any,
                       costcenter:any,
                       user1:any,
                       user2:any,
                       warehouse:any){

                         let data = new URLSearchParams();
                         data.append("id_org",this.id_org);
                         data.append("usuario",this.usuario);
                         data.append("tipo_doc",this.tipo_doc);
                         data.append("id_doc_ord",this.id_doc_ord);
                         data.append("id_doc_shipment",this.id_doc_shipment);
                         data.append("id_customer", this.id_customer);
                         data.append("pay_met",this.pay_met);
                         data.append("pay_term",this.pay_term);
                         data.append("pricelist",this.pricelist);
                         data.append("costcenter",this.costcenter);
                         data.append("user1",this.user1);
                         data.append("user2",this.user2);
                         data.append("warehouse",this.warehouse);


                         this.id_org = id_org;
                         this.usuario =usuario;
                         this.tipo_doc=tipo_doc;
                         this.id_doc_ord=id_doc_ord;
                         this.id_doc_shipment=id_doc_shipment;
                         this.id_customer=id_customer;
                         this.pay_met=pay_met;
                         this.pay_term=pay_term;
                         this.pricelist=pricelist;
                         this.costcenter=costcenter;
                         this.user1=user1;
                         this.user2=user2;
                         this.warehouse=warehouse;

                         let url = `${ URL_SERVICIOS }/customer/config`;

                         this.http.post(url, data)
                                   .subscribe( resp=>{

                                    if (data) {
                                      this.alertCtrl.create({   // ====GENRRA FORMULARIO ===========

                                        title: "Configuracion exitosa!",
                                        subTitle: "Este proceso se realiza una sola vez ",
                                        buttons: [{
                                        text: 'Ok',
                                        handler: () => {
                                            let modal: any;

                                              modal= this.modalCtrl.create(TabsPage);

                                            //aqui ocrre la accion del button======
                                            modal.present();
                                        }
                                      },]



                                      }).present();
                                    }
                                    else{
                                      this.alertCtrl.create({   // ====GENRRA FORMULARIO ===========

                                        title: "Configuracion fallida!",
                                        subTitle: "Faltan detalles de la orden",
                                        buttons: ["OK"]



                                      }).present();
                                    }






                                   })




                     }

}
