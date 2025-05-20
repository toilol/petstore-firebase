// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyB80FE2hRSYQCEpbdUZFqgZVfzSYQhJf7U",
    authDomain: "petstore-1bae6.firebaseapp.com",
    projectId: "petstore-1bae6",
    storageBucket: "petstore-1bae6.firebasestorage.app",
    messagingSenderId: "979015061215",
    appId: "1:979015061215:web:2979ebdbe53b9d5a8b236a",
    measurementId: "G-PGK0Y013Y3",
},
  transbank: {
      commerceCode: '597055555532', // Código de comercio de prueba
      apiKey: '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C ', // API Key 
      returnUrl: 'http://localhost:8100/transaccion' // URL para redirección después del pago
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
