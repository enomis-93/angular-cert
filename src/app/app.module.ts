import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';
import { LocationService } from './location.service';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { WeatherService } from './weather.service';
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { locationReducer } from './store/location/location.reducers';
import { weatherReducer } from './store/weather/weather.reducers';
import { WeatherEffects } from './store/weather/weather.effects';

@NgModule({
    declarations: [
        AppComponent,
        ZipcodeEntryComponent,
        CurrentConditionsComponent,
        MainPageComponent,
        ForecastsListComponent
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
            weather: weatherReducer
        }),
        EffectsModule.forRoot([WeatherEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true // Pauses recording actions and state changes when the extension window is not open
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
