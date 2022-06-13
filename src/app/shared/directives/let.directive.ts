import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
    ngLet: T | null;
}

@Directive({
    selector: '[ngLet]'
})
export class LetDirective<T> {
    private readonly _context: LetContext<T> = { ngLet: null };

    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<LetContext<T>>) {
        _viewContainer.createEmbeddedView(_templateRef, this._context);
    }

    @Input()
    public set ngLet(value: T) {
        this._context.ngLet = value;
    }
}
