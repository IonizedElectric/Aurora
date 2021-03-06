import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import {AboutPage} from '../about/about';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
