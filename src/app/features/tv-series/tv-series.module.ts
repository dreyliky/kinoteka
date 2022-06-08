import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { TvSeriesCardComponent } from './components';

@NgModule({
    declarations: [
        TvSeriesCardComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TvSeriesCardComponent
    ]
})
export class TvSeriesModule {}
