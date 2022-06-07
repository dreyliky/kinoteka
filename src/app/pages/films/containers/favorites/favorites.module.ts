import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { FavoritesComponent } from './favorites.component';
import { FavoritesRouting } from './favorites.routing';

@NgModule({
    declarations: [
        FavoritesComponent
    ],
    imports: [
        SharedModule,
        FavoritesRouting
    ]
})
export class FavoritesModule {}
