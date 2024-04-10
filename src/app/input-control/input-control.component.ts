import { Component, EventEmitter, Output } from '@angular/core';
import { Gares } from '../bll/gares';
import { OpenapiPmrService } from '../bll/openapi-pmr.service';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.scss'
})
export class InputControlComponent {
  @Output() inputChange = new EventEmitter<{ value: string, radius: number }>();
  gares: Gares[] = [];
  selectedGare!: string;
  constructor(private openapiPmrService: OpenapiPmrService) { }
  ngOnInit() {
    this.openapiPmrService.getGares().subscribe((gares: Gares[]) => {
      this.gares = gares;    
    });
  }
  onInputChange(value: string, radius: string) {
    this.selectedGare = value;   
    this.inputChange.emit({value, radius: Number(radius)});
  }
}
