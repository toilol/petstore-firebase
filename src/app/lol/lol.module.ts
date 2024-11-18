import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LolPageRoutingModule } from './lol-routing.module';

import { LolPage } from './lol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LolPageRoutingModule
  ],
  declarations: [LolPage]
})
export class LolPageModule {}
