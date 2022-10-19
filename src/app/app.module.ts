import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CastManagerModule, MediaDownloadManagerModule } from '@components';
import { LayoutsModule } from '@layouts';
import { SharedModule } from '@shared';
import {
    NgxBaseStateDevtoolsConfig,
    NgxBaseStateDevtoolsModule,
    NGX_BASE_STATE_DEVTOOLS_CONFIG
} from 'ngx-base-state';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxBaseStateDevtoolsModule,
        SharedModule,
        LayoutsModule,

        CastManagerModule,
        MediaDownloadManagerModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: NGX_BASE_STATE_DEVTOOLS_CONFIG,
            useValue: new NgxBaseStateDevtoolsConfig({
                isEnabled: !environment.production
            })
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
