import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // <-- Añade esta importación

import { RegistroPage } from './registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([ // <-- Añade esto para las rutas hijas
      {
        path: '',
        component: RegistroPage
      }
    ])
  ],
  declarations: [RegistroPage]
})
export class RegistroPageModule {}