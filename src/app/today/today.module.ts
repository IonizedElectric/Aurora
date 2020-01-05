import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodayPageRoutingModule } from './today-routing.module';

import { TodayPage } from './today.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodayPageRoutingModule
  ],
  declarations: [TodayPage]
})
export class TodayPageModule {}
