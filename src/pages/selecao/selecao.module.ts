import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecaoPage } from './selecao';

@NgModule({
  declarations: [
    SelecaoPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecaoPage),
  ],
  exports: [
    SelecaoPage
  ]
})
export class SelecaoPageModule {}
