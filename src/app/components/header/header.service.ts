import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    public get portalComponent$(): Observable<ComponentPortal<unknown> | null> {
        return this._portalComponent$.asObservable();
    }

    private _portalComponent$ = new Subject<ComponentPortal<unknown> | null>();
    
    public setPortalComponent(component: ComponentType<unknown>): void {
        this._portalComponent$.next(
            new ComponentPortal(component)
        );
    }

    public clearPortalComponent(): void {
        this._portalComponent$.next(null);
    }
}
