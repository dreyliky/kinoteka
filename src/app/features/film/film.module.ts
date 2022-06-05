import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FilmCardComponent } from './components';

@NgModule({
    declarations: [
        FilmCardComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        FilmCardComponent
    ]
})
export class FilmModule {}
