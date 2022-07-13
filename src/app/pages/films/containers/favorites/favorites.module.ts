import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { FilmsSharedModule } from '../../shared';
import { FavoritesComponent } from './favorites.component';
import { FavoritesRouting } from './favorites.routing';

@NgModule({
    declarations: [
        FavoritesComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        FilmsSharedModule,
        FavoritesRouting
    ]
})
export class FavoritesModule {}
