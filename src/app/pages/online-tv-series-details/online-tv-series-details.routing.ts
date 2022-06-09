import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineTvSeriesDetailsRouteParamEnum } from './enums';
import { OnlineTvSeriesDetailsComponent } from './online-tv-series-details.component';

const routes: Routes = [
    {
        path: `:${OnlineTvSeriesDetailsRouteParamEnum.KinopoiskId}`,
        component: OnlineTvSeriesDetailsComponent
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
export class OnlineTvSeriesDetailsRouting {}
