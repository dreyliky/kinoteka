import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { ContentComponent } from './content.component';
import { FilmInfoComponent } from './film-info';
import { FilmPlayerComponent } from './film-player';

@NgModule({
    declarations: [
        ContentComponent,
        FilmInfoComponent,
        FilmPlayerComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule
    ],
    exports: [
        ContentComponent
    ]
})
export class ContentModule {}
