import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabilidadePage } from './habilidade';

@NgModule({
  declarations: [
    HabilidadePage,
  ],
  imports: [
    IonicPageModule.forChild(HabilidadePage),
  ],
  exports: [
    HabilidadePage
  ]
})
export class HabilidadePageModule {}
