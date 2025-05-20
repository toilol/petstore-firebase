import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  async registrar() {
    // Validaciones básicas
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    try {
      const result = await this.authService.register(this.email, this.password);
      console.log('Registro exitoso:', result);
      
      // Redirigir al home después del registro
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      console.error('Error en registro:', error);
      this.errorMessage = this.getFriendlyErrorMessage(error);
    }
  }

  private getFriendlyErrorMessage(error: any): string {
    if (error.code === 'auth/email-already-in-use') {
      return 'Este email ya está registrado';
    } else if (error.code === 'auth/invalid-email') {
      return 'Email no válido';
    } else if (error.code === 'auth/weak-password') {
      return 'La contraseña es demasiado débil';
    }
    return 'Error al registrar. Intenta nuevamente.';
  }
}