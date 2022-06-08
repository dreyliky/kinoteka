import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { HeaderPortalContentComponent } from './header-portal-content';
import { OnlineComponent } from './online.component';
import { OnlineRouting } from './online.routing';
import { PaginatorComponent } from './paginator';
import { TvSeriesDetailsWindowModule } from './tv-series-details-window';

@NgModule({
    declarations: [
        OnlineComponent,
        HeaderPortalContentComponent,
        PaginatorComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        OnlineRouting,
        TvSeriesDetailsWindowModule
    ]
})
export class OnlineModule {}
