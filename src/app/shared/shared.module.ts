import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SafePipe } from './pipes';

@NgModule({
    declarations: [
        SafePipe
    ],
    exports: [
        SafePipe,
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatSnackBarModule,
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatDialogModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatPaginatorModule
    ],
})
export class SharedModule {}
