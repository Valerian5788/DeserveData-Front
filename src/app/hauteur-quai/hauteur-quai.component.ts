import { Component, OnInit } from '@angular/core';
import { OpenapiPmrService } from '../bll/openapi-pmr.service';
import { Gares } from '../bll/gares';

@Component({
  selector: 'app-hauteur-quai',
  templateUrl: './hauteur-quai.component.html',
  styleUrls: ['./hauteur-quai.component.scss']
})
export class HauteurQuaiComponent implements OnInit {
  selectedStation!: string;
  quaiData: any;
  gares: Gares[] = [];

  constructor(private _openapiservice: OpenapiPmrService) { }

  ngOnInit() {
    this._openapiservice.getGares().subscribe((gares: Gares[]) => {
      this.gares = gares;    
    });
  }

  onStationChange(station: string) {
    this.selectedStation = station;
    this._openapiservice.getHauteurQuai(station).subscribe(data => {
      this.quaiData = data['donnees quai : '];
    });
  }
}