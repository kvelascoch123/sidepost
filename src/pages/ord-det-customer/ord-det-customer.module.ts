import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdDetCustomerPage } from './ord-det-customer';

@NgModule({
  declarations: [
    OrdDetCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdDetCustomerPage),
  ],
})
export class OrdDetCustomerPageModule {}
