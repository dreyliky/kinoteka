import { Injectable } from '@angular/core';
import { ApiService, SocketService } from '@core/services';
import { filter, mergeMap, Observable, toArray } from 'rxjs';
import { Client } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    constructor(
        private readonly apiService: ApiService,
        private readonly socketService: SocketService
    ) {}

    public getAll(): Observable<Client[]> {
        return this.apiService.get<Client[]>(`/clients`);
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
