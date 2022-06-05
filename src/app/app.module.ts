import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule, ScrollTopButtonModule, SidebarModule } from '@components';
import { MaterialIconsService } from '@core';
import { SharedModule } from '@shared';
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
        SharedModule,
        SidebarModule,
        HeaderModule,
        ScrollTopButtonModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        MaterialIconsService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
    constructor(
        private readonly materialIconsService: MaterialIconsService
    ) {
        this.materialIconsService.registerAll();
    }
}
