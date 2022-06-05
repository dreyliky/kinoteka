import { NgModule } from '@angular/core';
import { FilmModule } from './film';

@NgModule({
    exports: [
        FilmModule
    ]
})
export class FeaturesModule {}
