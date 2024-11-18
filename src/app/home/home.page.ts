import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Asegúrate de tener importada esta clase
import { Servicio } from '../models/servicio.model';  // Importa la interfaz

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  servicios: Servicio[] = []; // Usamos el tipo 'Servicio[]' aquí

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.getServicios();
  }

  getServicios() {
    this.firestore.collection('servicios').get().subscribe((querySnapshot) => {
      this.servicios = querySnapshot.docs.map(doc => doc.data() as Servicio); // Aseguramos que los datos sean del tipo 'Servicio'
      console.log(this.servicios); // Verifica que los datos se estén obteniendo correctamente
    });
  }

  addToCart(nombre: string, precio: number) {
    console.log('Producto añadido:', nombre, precio);
    // Lógica para agregar al carrito
  }
}