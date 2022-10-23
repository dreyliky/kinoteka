import { Injectable } from '@angular/core';
import { ApiService } from '@core/services';
import { Observable } from 'rxjs';
import { Client } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ClientsApi {
    constructor(
        private readonly apiService: ApiService
    ) {}

    public getAll(): Observable<Client[]> {
        return this.apiService.get<Client[]>(`/clients`);
    }
}
