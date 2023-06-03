import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //ReactiveFormsModule se importa para el formControlName
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { IonRatingStarsModule } from 'ion-rating-stars';

import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    IonRatingStarsModule,
    Tab2PageRoutingModule,
    ReactiveFormsModule //formControlName debe estar en el arreglo
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
