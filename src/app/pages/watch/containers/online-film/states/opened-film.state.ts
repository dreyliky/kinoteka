import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { Film } from '@features/film';

@Injectable()
export class OpenedFilmState extends BaseState<Film> {}
