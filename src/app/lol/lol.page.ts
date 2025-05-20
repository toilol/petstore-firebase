import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-lol',
  templateUrl: './lol.page.html',
  styleUrls: ['./lol.page.scss'],
})
export class LolPage  {
  email = '';
  password = '';

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.email, this.password)
      .then(res => {
        console.log('Login exitoso:', res);
      })
      .catch(err => {
        console.error('Error al iniciar sesión:', err.message);
      });
  }
}