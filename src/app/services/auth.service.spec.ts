import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

describe('AuthService', () => {
  let service: AuthService;
  const afAuthMock = {
    createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword'),
    signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword'),
    signOut: jasmine.createSpy('signOut')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: afAuthMock },
        // Añade esto para solucionar el error:
        { 
          provide: FIREBASE_OPTIONS, 
          useValue: {
            apiKey: 'mock-key',
            authDomain: 'mock.firebaseapp.com',
            projectId: 'mock-project',
            storageBucket: 'mock.appspot.com',
            messagingSenderId: '123456789',
            appId: 'mock-app-id'
          }
        }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // PRUEBA 2: Registro llama a Firebase Auth
  it('should call Firebase auth on register', () => {
    service.register('test@test.com', '123456');
    expect(afAuthMock.createUserWithEmailAndPassword).toHaveBeenCalledWith('test@test.com', '123456');
  });

  // PRUEBA 3: Logout limpia la sesión
  it('should call signOut on logout', () => {
    service.logout();
    expect(afAuthMock.signOut).toHaveBeenCalled();
  });
});