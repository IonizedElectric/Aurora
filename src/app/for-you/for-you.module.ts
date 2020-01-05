import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForYouPageRoutingModule } from './for-you-routing.module';

import { ForYouPage } from './for-you.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForYouPageRoutingModule
  ],
  declarations: [ForYouPage]
})
export class ForYouPageModule {}
