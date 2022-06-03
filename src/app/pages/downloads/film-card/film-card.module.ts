import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FilmCardComponent } from './film-card.component';

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
export class FilmCardModule {}
