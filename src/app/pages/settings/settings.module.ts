import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { SettingsComponent } from './settings.component';
import { SettingsRouting } from './settings.routing';

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        SharedModule,
        SettingsRouting
    ]
})
export class SettingsModule {}
