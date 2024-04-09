import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';

const appRoutes: Routes = [
    {
        path: '',
        component: MainPageComponent
    },
    {
        path: 'forecast/:zipcode',
        component: ForecastsListComponent
    }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
    appRoutes,
    {}
);
