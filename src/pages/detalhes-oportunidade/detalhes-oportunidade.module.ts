import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesOportunidadePage } from './detalhes-oportunidade';

@NgModule({
  declarations: [
    DetalhesOportunidadePage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesOportunidadePage),
  ],
  exports: [
    DetalhesOportunidadePage
  ]
})
export class DetalhesOportunidadePageModule {}
