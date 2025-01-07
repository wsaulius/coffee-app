import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AppStorageService } from './app/app-storage.service';
import { APP_INITIALIZER } from '@angular/core';


import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withFetch()),
    Storage,
    AppStorageService,
    {provide: APP_INITIALIZER, useFactory: (service: AppStorageService) => () => service.init(), deps: [AppStorageService], multi: true}
  ]
});
