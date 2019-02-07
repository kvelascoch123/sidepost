import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalCustomerPage } from './modal-customer';

@NgModule({
  declarations: [
    ModalCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalCustomerPage),
  ],
})
export class ModalCustomerPageModule {}
