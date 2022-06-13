import { Injectable } from '@angular/core';
import { BaseState } from '@core/states';
import { Video } from '@features/video';

@Injectable()
export class SearchVideoState extends BaseState<Video> {}
