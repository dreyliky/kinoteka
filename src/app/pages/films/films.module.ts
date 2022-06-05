import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FilmCardComponent } from './film-card';
import { FilmDetailsWindowModule } from './film-details-window';
import { FilmsComponent } from './films.component';
import { FilmsRouting } from './films.routing';
import { HeaderPortalContentComponent } from './header-portal-content';
import { PaginatorComponent } from './paginator';

@NgModule({
    declarations: [
        FilmCardComponent,
        FilmsComponent,
        PaginatorComponent,
        HeaderPortalContentComponent
    ],
    imports: [
        SharedModule,
        FilmsRouting,
        FilmDetailsWindowModule
    ]
})
export class FilmsModule {}
