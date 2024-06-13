import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenapiPmrService } from '../bll/openapi-pmr.service';

@Component({
  selector: 'app-crowd',
  templateUrl: './crowd.component.html',
  styleUrl: './crowd.component.scss'
})
export class CrowdComponent implements OnInit {
  @Input() station!: string;
  crowdManagementData!: Observable<any>;

  constructor(private _apiservice: OpenapiPmrService) { }

  ngOnInit(): void {
    this.fetchData();
    setInterval(() => this.fetchData(), 60 * 60 * 1000); // Refresh data every hour
  }

  private fetchData(): void {
    if (this.station === 'Namur') {
      this.crowdManagementData = this._apiservice.getCrowdManagementOfDayNamur(0o20223);
      console.log('fetchdata namur');
      
    } else if (this.station === 'Charleroi') {
      this.crowdManagementData = this._apiservice.getCrowdManagementOfDayCharleroi(0o20223);
    }
  }
}
