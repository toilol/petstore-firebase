import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransbankService } from '../services/transbank.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.page.html',
  styleUrls: ['./transaccion.page.scss'],
})
export class TransaccionPage implements OnInit {
  estadoTransaccion: any = null;
  cargando = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private transbankService: TransbankService,
    private cartService: CartService
  ) {}

  async ngOnInit() {
    try {
      const token = this.route.snapshot.queryParamMap.get('token_ws');
      
      if (!token) {
        throw new Error('No se recibió token de transacción');
      }

      this.estadoTransaccion = await this.transbankService.commitTransaction(token);
      
      if (this.estadoTransaccion.response_code === 0) {
        this.cartService.clearCart();
      }
    } catch (error) {
      console.error('Error en transacción:', error);
      this.error = true;
    } finally {
      this.cargando = false;
    }
  }

  getEstadoPago(): string {
    if (!this.estadoTransaccion) return 'Desconocido';
    return this.estadoTransaccion.response_code === 0 ? 'Aprobado' : 'Rechazado';
  }
}