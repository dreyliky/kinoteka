import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineTvSeriesDetailsRouteParamEnum } from './enums';
import { OnlineTvSeriesComponent } from './online-tv-series.component';

const routes: Routes = [
    {
        path: `:${OnlineTvSeriesDetailsRouteParamEnum.KinopoiskId}`,
        component: OnlineTvSeriesComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class OnlineTvSeriesRouting {}
