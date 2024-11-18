import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Servicio } from '../models/servicio.model';

@Component({
  selector: 'app-venta',
  templateUrl: 'venta.page.html',
  styleUrls: ['venta.page.scss'],
})
export class VentaPage implements OnInit {
  servicios: Servicio[] = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.getServicios();
  }

  getServicios() {
    this.firestore.collection('servicios').get().subscribe((querySnapshot) => {
      this.servicios = querySnapshot.docs.map(doc => doc.data() as Servicio);
      console.log(this.servicios);
    });
  }

  addToCart(nombre: string, precio: number) {
    console.log('Producto añadido:', nombre, precio);
  }
}
