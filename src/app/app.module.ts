import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LocationService } from './services/location.service';
import { ForecastsListComponent } from './components/forecasts-list/forecasts-list.component';
import { WeatherService } from './services/weather.service';
import { CurrentConditionsComponent } from './components/current-conditions/current-conditions.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
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
import { ZipcodeEntryComponent } from './components/zipcode-entry/zipcode-entry.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { tabReducer } from './store/tabs/tab.reducers';
import { TabEffects } from './store/tabs/tab.effects';

@NgModule({
    declarations: [
        AppComponent,
        ZipcodeEntryComponent,
        CurrentConditionsComponent,
        MainPageComponent,
        ForecastsListComponent,
        TabsComponent
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
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
