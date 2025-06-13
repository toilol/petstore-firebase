import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Servicio } from '../models/servicio.model';

describe('CartService', () => {
  let service: CartService;
  
  // Mock completo de Servicio (con todas las propiedades)
  const mockServicio: Servicio = {
    id: '1',
    nombre: 'Servicio de prueba',
    descripcion: 'Descripción de prueba',
    precio: 10000,
    imagenUrl: 'https://ejemplo.com/imagen.jpg'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    service.addToCart(mockServicio);
    const cart = service.getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].servicio).toEqual(mockServicio);
  });

  it('should clear cart', () => {
    service.addToCart(mockServicio);
    service.clearCart();
    expect(service.getCart().length).toBe(0);
  });
});