import { TestBed } from '@angular/core/testing';
import { FirestoreService } from './firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

describe('FirestoreService', () => {
  let service: FirestoreService;
  
  // Mock completo de Firestore
  const firestoreMock = {
    collection: jasmine.createSpy('collection').and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue({}), // Devuelve un Observable vacío
      doc: jasmine.createSpy('doc').and.returnValue({
        set: jasmine.createSpy('set').and.returnValue(Promise.resolve())
      })
    }),
    createId: jasmine.createSpy('createId').and.returnValue('mock-id-123')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FirestoreService,
        { provide: AngularFirestore, useValue: firestoreMock },
        { // Proveedor necesario para Firebase
          provide: FIREBASE_OPTIONS,
          useValue: { /* configuración mock de Firebase */ }
        }
      ]
    });
    service = TestBed.inject(FirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Firestore collection with correct name', () => {
    const collectionName = 'test-collection';
    service.getCollectionData(collectionName);
    expect(firestoreMock.collection).toHaveBeenCalledWith(collectionName);
  });

  it('should generate ID when adding document', () => {
    service.addDocument('test-collection', { name: 'Test' });
    expect(firestoreMock.createId).toHaveBeenCalled();
  });

  // PRUEBA ADICIONAL RECOMENDADA: Verificar que set() se llama correctamente
  it('should call set() with generated ID', async () => {
    const testData = { name: 'Test' };
    await service.addDocument('test-collection', testData);
    
    expect(firestoreMock.collection('test-collection').doc).toHaveBeenCalledWith('mock-id-123');
    expect(firestoreMock.collection('test-collection').doc('mock-id-123').set).toHaveBeenCalledWith(testData);
  });
});