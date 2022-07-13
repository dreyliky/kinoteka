import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { FilmsSharedModule } from '../../shared';
import { DownloadedComponent } from './downloaded.component';
import { DownloadedRouting } from './downloaded.routing';
import { HeaderPortalContentComponent } from './header-portal-content';
import { PaginatorComponent } from './paginator';

@NgModule({
    declarations: [
        DownloadedComponent,
        HeaderPortalContentComponent,
        PaginatorComponent
    ],
    imports: [
        SharedModule,
        FeaturesModule,
        FilmsSharedModule,
        DownloadedRouting
    ]
})
export class DownloadedModule {}
