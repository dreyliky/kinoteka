import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TvSeriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
