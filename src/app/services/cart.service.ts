import { Injectable } from '@angular/core';
import { Servicio } from 'src/app/models/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: {servicio: Servicio, quantity: number}[] = [];

  constructor() {}

  addToCart(servicio: Servicio) {
    const existingItem = this.cartItems.find(item => item.servicio.id === servicio.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ servicio, quantity: 1 });
    }
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  getCart() {
    return [...this.cartItems];
  }

  clearCart() {
    this.cartItems = [];
  }
}