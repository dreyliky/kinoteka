import { NgModule } from '@angular/core';
import { FeaturesModule } from '@features';
import { SharedModule } from '@shared';
import { VideosSharedModule } from '../../shared';
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
        VideosSharedModule,
        DownloadedRouting
    ]
})
export class DownloadedModule {}
