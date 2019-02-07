import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//services
import { CarritoService } from '../providers/carrito';
import { ProductosService } from '../providers/productos';
import { UsuarioService } from '../providers/usuario';

//httmodule
import {HttpModule} from "@angular/http";
//Pipe
import {ImagenPipe} from "../pipes/imagen/imagen";
//paginas
import {CarritoPage,
CategoriasPage,LoginPage,IntroduccionPage,
OrdenesPage,OrdenesDetallePage,CustomerPage, ModalCustomerPage,
PorCategoriasPage,TabsPage, ConfiguracionPage} from "../pages/index.paginas";
import {ProductosPage} from "../pages/index.paginas";
import { IonicStorageModule } from '@ionic/storage';
import { AjustesProvider } from '../providers/ajustes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,ImagenPipe,
    CarritoPage,CategoriasPage,
    LoginPage,OrdenesPage,TabsPage,
    OrdenesDetallePage,PorCategoriasPage,ProductosPage,CustomerPage,
     ModalCustomerPage, ConfiguracionPage,IntroduccionPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CarritoPage,CategoriasPage,LoginPage,
    OrdenesPage,OrdenesDetallePage,TabsPage,
    PorCategoriasPage,ProductosPage,CustomerPage, ModalCustomerPage,
     ConfiguracionPage,IntroduccionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoService,
    ProductosService,
    UsuarioService,
    AjustesProvider
  ]
})
export class AppModule {}
