import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(
        private readonly httpService: HttpClient
    ) {}

    public get<T>(subUrl: string): Observable<T> {
        const url = this.getFullUrl(subUrl);

        return this.httpService.get<T>(url);
    }

    public post<T>(subUrl: string, data: unknown): Observable<T> {
        const url = this.getFullUrl(subUrl);

        return this.httpService.post<T>(url, data);
    }

    public put<T>(subUrl: string, data: unknown): Observable<T> {
        const url = this.getFullUrl(subUrl);

        return this.httpService.put<T>(url, data);
    }

    public delete<T>(subUrl: string): Observable<T> {
        const url = this.getFullUrl(subUrl);

        return this.httpService.delete<T>(url);
    }

    private getFullUrl(subUrl: string): string {
        return `${environment.backendHost}${subUrl}`;
    }
}
