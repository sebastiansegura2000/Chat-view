// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:80/api/',
  token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xL2FwaS91c2VyL3Rva2VuIiwiaWF0IjoxNzE1MDkzNzU1LCJleHAiOjE3MTUwOTczNTUsIm5iZiI6MTcxNTA5Mzc1NSwianRpIjoiNFFKRkJUbFFQZjd4bXJydiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.4OG6JP7mJN0XolTX7qFJJEVB0wi9hCBr2XN5IkdHTgs',
  mqtt:{
    server:'',
    port:0,
    protocol:''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
