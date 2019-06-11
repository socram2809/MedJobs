import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExperienciaPage } from './experiencia';

@NgModule({
  declarations: [
    ExperienciaPage,
  ],
  imports: [
    IonicPageModule.forChild(ExperienciaPage),
  ],
  exports: [
    ExperienciaPage
  ]
})
export class ExperienciaPageModule {}
