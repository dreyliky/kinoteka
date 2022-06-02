import { Injectable } from '@angular/core';
import { BaseState } from '@core';
import { FilmsResponse } from '@interfaces';

@Injectable({
    providedIn: 'root'
})
export class FilmsResponseState extends BaseState<FilmsResponse | null> {}
