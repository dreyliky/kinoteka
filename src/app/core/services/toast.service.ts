import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(
        private readonly snackBar: MatSnackBar
    ) {}

    public open(message: string, duration: number = 3000): void {
        this.snackBar.open(message, 'ОК', { duration });
    }
}
