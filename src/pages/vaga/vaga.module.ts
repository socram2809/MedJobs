import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VagaPage } from './vaga';

@NgModule({
  declarations: [
    VagaPage,
  ],
  imports: [
    IonicPageModule.forChild(VagaPage),
  ],
  exports: [
    VagaPage
  ]
})
export class VagaPageModule {}
