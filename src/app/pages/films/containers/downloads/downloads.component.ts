import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
