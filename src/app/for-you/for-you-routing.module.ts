import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForYouPage } from './for-you.page';

const routes: Routes = [
  {
    path: '',
    component: ForYouPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForYouPageRoutingModule {}
