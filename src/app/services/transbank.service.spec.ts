import { TestBed } from '@angular/core/testing';
import { TransbankService } from './transbank.service';
import { Environment } from 'transbank-sdk';

describe('TransbankService', () => {
  let service: TransbankService;
  const mockEnvironment = {
    transbank: {
      commerceCode: 'mock-code',
      apiKey: 'mock-key',
      returnUrl: 'http://mock-return.com'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TransbankService,
        { provide: Environment, useValue: mockEnvironment }
      ]
    });
    service = TestBed.inject(TransbankService);
  });

  // PRUEBA 1: Creación del servicio
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // PRUEBA 2: Validación de montos
  it('should reject invalid amounts', () => {
    expect(() => service['validateAmount'](-1)).toThrowError('El monto debe ser mayor a cero');
    expect(() => service['validateAmount'](10000001)).toThrowError('El monto excede el límite permitido');
  });

  // PRUEBA 3: Formato de errores
  it('should parse Transbank errors correctly', () => {
    const mockError = { message: 'invalid_api_key' };
    const parsedError = service['parseTransbankError'](mockError);
    expect(parsedError.message).toContain('Error de autenticación');
  });
});