import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CastTypeEnum } from '@core/enums';
import { Client } from '@features/client/interfaces';
import { ClientCastService, ClientsService } from '@features/client/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'smart-cast-button',
    templateUrl: './smart-cast-button.component.html',
    styleUrls: ['./smart-cast-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartCastButtonComponent<T = unknown> implements OnInit {
    @Input()
    public data!: T;

    @Input()
    public castType!: CastTypeEnum;

    @Input()
    public clients$!: Observable<Client[]>;

    constructor(
        private readonly clientsService: ClientsService,
        private readonly clientCastService: ClientCastService
    ) {}

    public ngOnInit(): void {
        this.clients$ = this.clientsService.getAllExceptMe();
    }

    public getIconName(client: Client): string {
        if (client.deviceInfo.deviceType === 'desktop') {
            return 'computer';
        } else if (client.deviceInfo.deviceType === 'mobile') {
            return 'smartphone';
        }

        return 'tv';
    }

    public onClientButtonClick(client: Client): void {
        this.clientCastService.cast(client.socketId, this.castType, this.data)
            .subscribe();
    }
}
