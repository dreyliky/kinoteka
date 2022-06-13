import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoRoutingEnum } from './enums';
import { VideoComponent } from './video.component';

const routes: Routes = [
    {
        path: '',
        component: VideoComponent,
        children: [
            {
                path: VideoRoutingEnum.Downloader,
                loadChildren: () => import('./containers/downloader').then((m) => m.DownloaderModule)
            },
            {
                path: VideoRoutingEnum.Downloaded,
                loadChildren: () => import('./containers/downloaded').then((m) => m.DownloadedModule)
            },
            {
                path: '**',
                redirectTo: VideoRoutingEnum.Downloader,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class VideoRouting {}
