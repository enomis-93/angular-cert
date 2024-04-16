import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CurrentConditionsComponent } from './components/current-conditions/current-conditions.component';
import { ForecastsListComponent } from './components/forecasts-list/forecasts-list.component';
import { ZipcodeEntryComponent } from './components/zipcode-entry/zipcode-entry.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CacheService } from './services/cache.service';
import { AlertComponent } from './shared/components/alert/alert.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { locationReducer } from './store/location/location.reducers';
import { TabEffects } from './store/tabs/tab.effects';
import { tabReducer } from './store/tabs/tab.reducers';
import { WeatherEffects } from './store/weather/weather.effects';
import { weatherReducer } from './store/weather/weather.reducers';
import { CACHE_EXPIRY_TIME } from './utils/cache-expire.token';

@NgModule({
    declarations: [
        AppComponent,
        ZipcodeEntryComponent,
        CurrentConditionsComponent,
        MainPageComponent,
        ForecastsListComponent,
        TabsComponent,
        AlertComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        routing,
        ServiceWorkerModule.register('/ngsw-worker.js', {
            enabled: environment.production
        }),
        StoreModule.forRoot({
            locations: locationReducer,
            weather: weatherReducer,
            activeTabIndex: tabReducer
        }),
        EffectsModule.forRoot([WeatherEffects, TabEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true // Pauses recording actions and state changes when the extension window is not open
        })
    ],
    providers: [
        { provide: CACHE_EXPIRY_TIME, useValue: 7200 } // Default expiry time: 2 hours
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
