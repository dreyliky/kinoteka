import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'films',
        loadChildren: () => import('./pages/films').then((m) => m.FilmsModule)
    },
    {
        path: 'downloads',
        loadChildren: () => import('./pages/downloads').then((m) => m.DownloadsModule)
    },
    {
        path: '**',
        redirectTo: 'films'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
