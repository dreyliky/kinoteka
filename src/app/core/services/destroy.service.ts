import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class DestroyService extends ReplaySubject<void> implements OnDestroy {
    constructor() {
        super(1);
    }

    public ngOnDestroy(): void {
        this.next();
        this.complete();
    }
}
