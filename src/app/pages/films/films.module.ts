import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FilmCardComponent } from './film-card';
import { FilmDetailsWindowModule } from './film-details-window';
import { FilmsComponent } from './films.component';
import { FilmsRouting } from './films.routing';
import { FiltersComponent } from './filters';
import { PaginatorComponent } from './paginator';

@NgModule({
    declarations: [
        FilmCardComponent,
        FilmsComponent,
        FiltersComponent,
        PaginatorComponent
    ],
    imports: [
        SharedModule,
        FilmsRouting,
        FilmDetailsWindowModule
    ]
})
export class FilmsModule {}
