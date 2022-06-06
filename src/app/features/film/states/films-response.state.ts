import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { FilmsResponse } from '@features/film';

@Injectable({
    providedIn: 'root'
})
export class FilmsResponseState extends BaseState<FilmsResponse | null> {}
