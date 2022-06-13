import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestroyService } from '@core/services';
import { ClientCastSocketService } from '@features/client';
import { filter, Observable, takeUntil } from 'rxjs';
import { CAST_ROUTE_HANDLER_MAP } from './data';

@Component({
    selector: 'global-cast-manager',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DestroyService
    ]
})
export class CastManagerComponent implements OnInit {
    constructor(
        @Inject(DestroyService) private readonly viewDestroyed$: Observable<void>,
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
                ),
                takeUntil(this.viewDestroyed$)
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
