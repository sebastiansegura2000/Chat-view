// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:80/api/',
  token: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xL2FwaS91c2VyL3Rva2VuIiwiaWF0IjoxNzE1MzY4MzU0LCJleHAiOjE3MTUzNzE5NTQsIm5iZiI6MTcxNTM2ODM1NCwianRpIjoiazh6YTBYYnluSHg2N0hmRyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.KJKs8y6WR5aYpjCDobt2hTwyIwzt8g94IAC3cCbmEuk',
  mqtt:{
    server:'test.mosquitto.org',
    port:8081 ,
    protocol:'wss'
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
