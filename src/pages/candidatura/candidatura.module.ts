import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidaturaPage } from './candidatura';

@NgModule({
  declarations: [
    CandidaturaPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidaturaPage),
  ],
  exports: [
    CandidaturaPage
  ]
})
export class CandidaturaPageModule {}
