import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { CastManagerComponent } from './cast-manager.component';

@NgModule({
    declarations: [
        CastManagerComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        CastManagerComponent
    ]
})
export class CastManagerModule {}
