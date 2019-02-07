import { Component } from '@angular/core';
import {HomePage, CategoriasPage, OrdenesPage, ConfiguracionPage} from "../index.paginas";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

tab1=HomePage;
tab2= CategoriasPage;
tab3=OrdenesPage;
tab4="BusquedaPage"  ///TIENE EL MODULO
tab5= ConfiguracionPage;
}
