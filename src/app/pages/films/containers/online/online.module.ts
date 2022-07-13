import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { FilmsSharedModule } from '../../shared';
import { HeaderPortalContentComponent } from './header-portal-content';
import { OnlineComponent } from './online.component';
import { OnlineRouting } from './online.routing';
import { PaginatorComponent } from './paginator';

@NgModule({
    declarations: [
        OnlineComponent,
        HeaderPortalContentComponent,
        PaginatorComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        FilmsSharedModule,
        OnlineRouting
    ]
})
export class OnlineModule {}
