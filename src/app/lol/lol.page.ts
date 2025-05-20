import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lol',
  templateUrl: './lol.page.html',
  styleUrls: ['./lol.page.scss'],
})
export class LolPage {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private navCtrl: NavController
  ) {}

  async login() {
    try {
      await this.auth.login(this.email, this.password);
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.errorMessage = this.getFriendlyErrorMessage(error);
    }
  }

  private getFriendlyErrorMessage(error: any): string {
    if (error.code === 'auth/user-not-found') {
      return 'Usuario no encontrado';
    } else if (error.code === 'auth/wrong-password') {
      return 'Contraseña incorrecta';
    } else if (error.code === 'auth/invalid-email') {
      return 'Email no válido';
    }
    return 'Error al iniciar sesión. Intenta nuevamente.';
  }
}