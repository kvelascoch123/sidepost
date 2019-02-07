import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Http}from'@angular/http';
import 'rxjs/add/operator/map';

import { URL_SERVICIOS } from "../config/url.servicios";
import {CarritoService} from "./index.services";


@Injectable()
export class ProductosService {
  pagina:number = 0;
  productos:any[] = [];
  lineas:any[]=[];
  por_categoria:any[]=[];
  resultados:any[]=[];

  constructor(public http: Http, private _cs: CarritoService) {
    this.cargar_todos();
    this.cargar_lineas();
  }

  cargar_lineas(){
    let url = URL_SERVICIOS + "/lineas";
    this.http.get( url )
            .map( resp=> resp.json() )
            .subscribe( data =>{

              if( data.error ){
                // problemas!
              }else{
                this.lineas = data.lineas;
                console.log(this.lineas);
              }

            })
  }
//categoria is string not number
  cargar_por_categoria( categoria:string ){

    let url = URL_SERVICIOS + "/productos/por_tipo/"+ categoria;

    this.http.get( url )
              .map( resp=> resp.json() )
              .subscribe( data =>{

                console.log(data.productos);
                this.por_categoria = data.productos;

              });

  }

  cargar_todos(){

   let promesa = new Promise(  (resolve, reject)=>{

      let url = URL_SERVICIOS + "/productos/todos/" + this.pagina;

      this.http.get( url ) //generamos la peticion
                .map( resp => resp.json() )  //obtenemos respuesta
                 .subscribe( data =>{   //aqui me suscribo y traigo la informacion en objeto data
                //  console.log(data)

                      if( data.error ){
                    // Aqui hay un problema
                    console.log("No existen productos")
                  }else{
                    //este es un arreglo de dos columnas
                  //  let nuevaData = this.agrupar( data.productos, 1 );

                    this.productos.push( ...data.productos ); //... los secparo de la data
                  //  this.productos.push(...nuevaData ); //... los secparo de la data
                    this.pagina +=1;


                  }
                      // ya termino y cargo todo con la promesa
                 resolve();

              })

    });

    return promesa;


  }

  private agrupar(arr:any, tamano: number){
    //let (scope) variables limitando alcance, var dentro de un bloque
    let nuevoArreglo =[];
    for (let i=0; i<arr.length; i+=tamano){
        nuevoArreglo.push(arr.slice(i, i+tamano));
        }

        console.log(nuevoArreglo);
        return nuevoArreglo;
  }


    buscar_producto( termino:string ){

      let url = URL_SERVICIOS + "/productos/buscar/" + termino;

      this.http.get( url )
              .subscribe( resp =>{

                let data = resp.json();

                this.resultados = data.productos;
                console.log(this.resultados);

              });

    }


    // ********************AGREGAR AL PEDIDO (desde tabspage)*******************************
    agregaralpedido(idx:number){
    console.log(idx)
    for (let i = 0; i < this.productos.length; i++) {
    //console.log(i)
    //console.log(idx)

    if (i == idx) {
      console.log("YES")
      console.log(this.productos[i])
      this._cs.agregar_carrito(this.productos[i]);

    }else{"NO"}

    }


    }


}
