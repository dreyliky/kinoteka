import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { filter, share, switchMap } from 'rxjs/operators';

@Injectable()
export class ContentZoneService {
    public get scroll$(): Observable<Event> {
        return this._zoneElement$
            .pipe(
                filter((element) => !!element),
                switchMap((element) => fromEvent((element as HTMLElement), 'scroll')),
                share()
            );
    }

    private _zoneElement$ = new BehaviorSubject<HTMLElement | null>(null);

    public _registerElement(element: HTMLElement): void {
        if (this._zoneElement$.getValue()) {
            throw new Error('Zone Element already registered!');
        }

        this._zoneElement$.next(element);
    }

    public scrollTop(): void {
        const element = this._zoneElement$.getValue();

        element?.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
}
