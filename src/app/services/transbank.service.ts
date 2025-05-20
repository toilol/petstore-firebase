import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Options, Environment, WebpayPlus } from 'transbank-sdk';

@Injectable({
  providedIn: 'root'
})
export class TransbankService {
  private tx: InstanceType<typeof WebpayPlus.Transaction>;

  constructor() {
    // Verificación de configuración
    if (!environment.transbank) {
      throw new Error('Configuración de Transbank no encontrada en environment');
    }

    this.tx = new WebpayPlus.Transaction(
      new Options(
        environment.transbank.commerceCode, 
        environment.transbank.apiKey, 
        Environment.Integration
      )
    );
  }

  async createTransaction(amount: number, buyOrder: string, sessionId: string, returnUrl?: string) {
    this.validateAmount(amount);
    
    try {
      const finalReturnUrl = returnUrl || environment.transbank.returnUrl;
      const response = await this.tx.create(buyOrder, sessionId, amount, finalReturnUrl);
      return response;
    } catch (error) {
      console.error('[Transbank] Error al crear transacción:', error);
      throw this.parseTransbankError(error);
    }
  }

  async commitTransaction(token: string) {
    if (!token || token.length < 10) {
      throw new Error('Token de transacción inválido');
    }

    try {
      const response = await this.tx.commit(token);
      return response;
    } catch (error) {
      console.error('[Transbank] Error al confirmar transacción:', error);
      throw this.parseTransbankError(error);
    }
  }

  // Método auxiliar para validar el monto
  private validateAmount(amount: number): void {
    if (isNaN(amount)) {
      throw new Error('El monto debe ser un número válido');
    }
    if (amount <= 0) {
      throw new Error('El monto debe ser mayor a cero');
    }
    if (amount > 10000000) { // Límite de $10.000.000
      throw new Error('El monto excede el límite permitido');
    }
  }

  // Método auxiliar para procesar errores
  private parseTransbankError(error: any): Error {
    const errorMessage = error?.message || 'Error desconocido al comunicarse con Transbank';
    
    // Mapeo de errores comunes de Transbank
    if (errorMessage.includes('invalid_api_key')) {
      return new Error('Error de autenticación con Transbank. Verifica tus credenciales.');
    }
    if (errorMessage.includes('amount must be greater than zero')) {
      return new Error('El monto debe ser mayor a cero');
    }
    if (errorMessage.includes('commerce_code not found')) {
      return new Error('Código de comercio no válido');
    }

    return new Error(`Error en Transbank: ${errorMessage}`);
  }
}