import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Usamos la versión compat
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Método para obtener todos los documentos de una colección
  getCollectionData(collectionName: string): Observable<any[]> {
    return this.firestore.collection(collectionName).valueChanges();
  }

  // Método para agregar un documento a una colección
  addDocument(collectionName: string, data: any): Promise<void> {
    const id = this.firestore.createId();  // Generar un ID único
    return this.firestore.collection(collectionName).doc(id).set(data);
  }
}
