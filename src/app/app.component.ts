import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CAST_ROUTE_HANDLER_MAP } from '@core/data';
import { ClientCastSocketService } from '@features/client';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    constructor(
        private readonly router: Router,
        private readonly clientCastSocketService: ClientCastSocketService
    ) {}

    public ngOnInit(): void {
        this.initClientCastEventObserver();
    }

    private initClientCastEventObserver(): void {
        this.clientCastSocketService.onCast$
            .pipe(
                filter(({ initiatorDeviceInfo: { os_version, browser } }) => 
                    confirm(`Пристрій ${os_version} [${browser}] хоче запустити у вас медіа. Дозволити?`)
                )
            )
            .subscribe((castDto) => {
                const routeHandler = CAST_ROUTE_HANDLER_MAP.get(castDto.type);
                const targetCastRoute = routeHandler?.(castDto);

                if (targetCastRoute) {
                    this.router.navigateByUrl(targetCastRoute);
                }
            });
    }
}
