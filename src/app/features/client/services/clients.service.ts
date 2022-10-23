import { Injectable } from '@angular/core';
import { SocketService } from '@core/services';
import { filter, mergeMap, Observable, toArray } from 'rxjs';
import { ClientsApi } from '../api';
import { Client } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    constructor(
        private readonly clientsApi: ClientsApi,
        private readonly socketService: SocketService
    ) {}

    public getAll(): Observable<Client[]> {
        return this.clientsApi.getAll();
    }

    public getAllExceptMe(): Observable<Client[]> {
        return this.getAll()
            .pipe(
                mergeMap((clients) => clients),
                filter((client) => (client.socketId !== this.socketService.socket.id)),
                toArray()
            );
    }
}
