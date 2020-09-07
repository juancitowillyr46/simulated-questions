// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAmTPUXH--qqICZqPDQuiPgtSNPIi-VkrY',
    authDomain: 'simulated-questions-2019.firebaseio.com',
    databaseURL: 'https://simulated-questions-2019.firebaseio.com',
    projectId: 'simulated-questions-2019',
    // storageBucket: 'vwise-2ed94.appspot.com',
    // messagingSenderId: '698934152542'
  },
  // plans: [{id: 0, name: 'PLAN A', days: 1}, {id: 1, name: 'PLAN B', days: 2}, {id: 2, name: 'PLAN C', days: 3}] // Lista de planes
  URL_IMAGE: '/../../../'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
