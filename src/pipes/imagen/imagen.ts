import { Pipe, PipeTransform } from '@angular/core';
import {URL_IMAGENES} from "../../config/url.servicios";

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {

  transform(codigo: string, ...args) {

    return "http://186.69.209.150:8030/rest/public/img/"+codigo +".jpg";
  }
}
