import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SectionChipsComponent } from './components';
import { FilmsComponent } from './films.component';
import { FilmsRouting } from './films.routing';

@NgModule({
    declarations: [
        FilmsComponent,
        SectionChipsComponent,
        SectionChipsComponent
    ],
    imports: [
        SharedModule,
        FilmsRouting
    ]
})
export class FilmsModule {}
