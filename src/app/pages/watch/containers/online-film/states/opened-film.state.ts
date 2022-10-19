import { Injectable } from '@angular/core';
import { Film } from '@features/film';
import { ObjectState } from 'ngx-base-state';

@Injectable()
export class OpenedFilmState extends ObjectState<Film> {}
