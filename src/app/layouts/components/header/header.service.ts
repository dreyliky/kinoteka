import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    public get portalComponent$(): Observable<ComponentPortal<unknown> | null> {
        return this._portalComponent$.asObservable();
    }

    private _portalComponent$ = new BehaviorSubject<ComponentPortal<unknown> | null>(null);
    
    public setPortalComponent(
        component: ComponentType<unknown>,
        parentInjector: Injector | null = null
    ): void {
        this._portalComponent$.next(
            new ComponentPortal(component, null, parentInjector)
        );
    }

    public clearPortalComponent(): void {
        this._portalComponent$.next(null);
    }
}
