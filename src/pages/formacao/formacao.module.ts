import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormacaoPage } from './formacao';

@NgModule({
  declarations: [
    FormacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormacaoPage),
  ],
  exports: [
    FormacaoPage
  ]
})
export class FormacaoPageModule {}
