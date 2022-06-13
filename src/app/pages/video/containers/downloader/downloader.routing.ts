import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloaderComponent } from './downloader.component';

const routes: Routes = [
    {
        path: '',
        component: DownloaderComponent,
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
export class DownloaderRouting {}
