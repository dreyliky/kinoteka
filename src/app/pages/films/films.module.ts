import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { FilmDetailsWindowModule } from './film-details-window';
import { FilmsComponent } from './films.component';
import { FilmsRouting } from './films.routing';
import { HeaderPortalContentComponent } from './header-portal-content';
import { PaginatorComponent } from './paginator';

@NgModule({
    declarations: [
        FilmsComponent,
        PaginatorComponent,
        HeaderPortalContentComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        FilmsRouting,
        FilmDetailsWindowModule
    ]
})
export class FilmsModule {}
