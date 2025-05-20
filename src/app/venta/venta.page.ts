import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Servicio } from '../models/servicio.model';
import { TransbankService } from '../services/transbank.service';
import { CartService } from '../services/cart.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {
  servicios: Servicio[] = [];
  cartItems: {servicio: Servicio, quantity: number}[] = [];
  isCartOpen = false;

  constructor(
    private firestore: AngularFirestore,
    private transbankService: TransbankService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadServices();
    this.loadCart();
  }

  loadServices() {
    this.firestore.collection<Servicio>('servicios').get().subscribe({
      next: (querySnapshot) => {
        this.servicios = querySnapshot.docs.map(doc => {
          const data = doc.data() as Servicio;
          return { ...data, id: doc.id };
        });
      },
      error: (err) => console.error('Error cargando servicios:', err)
    });
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
  }

  openCartModal() {
    this.isCartOpen = true;
  }

  closeCartModal() {
    this.isCartOpen = false;
  }

  addToCart(servicio: Servicio) {
    this.cartService.addToCart(servicio);
    this.loadCart();
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.loadCart();
    
    // Cierra el modal si no hay más items
    if (this.cartItems.length === 0) {
      this.closeCartModal();
    }
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.servicio.precio * item.quantity), 
      0
    );
  }

  async payWithTransbank() {
  console.log('Iniciando proceso de pago...'); // Debug 1
  
  if (this.cartItems.length === 0) {
    console.warn('No hay items en el carrito'); // Debug 2
    return;
  }

  console.log('Items en carrito:', this.cartItems); // Debug 3
  
  const buyOrder = `BO-${Date.now()}`;
  const sessionId = `SESSION-${Math.random().toString(36).substr(2, 9)}`;
  const amount = this.getTotal();
  
  console.log('Datos de pago:', { buyOrder, sessionId, amount }); // Debug 4

  try {
    console.log('Creando transacción en Transbank...'); // Debug 5
    const response = await this.transbankService.createTransaction(
      amount,
      buyOrder,
      sessionId,
      environment.transbank.returnUrl
    );

    console.log('Respuesta de Transbank:', response); // Debug 6
    
    if (response.url && response.token) {
      console.log('Redirigiendo a Webpay...'); // Debug 7
      window.location.href = `${response.url}?token_ws=${response.token}`;
    } else {
      console.error('Respuesta inválida de Transbank:', response);
    }
  } catch (error) {
    console.error('Error en el pago:', error); // Debug 8
    // Mostrar mensaje al usuario (puedes implementar esto)
    this.mostrarError('Error al iniciar el pago. Por favor intenta nuevamente.');
  }
}

// Añade este método para mostrar errores
mostrarError(mensaje: string) {
  // Implementación básica con alert (puedes usar toastController para algo mejor)
  alert(mensaje);
}
}