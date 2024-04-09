import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.scss'
})
export class InputControlComponent {
  @Output() inputChange = new EventEmitter<string>();

  onInputChange(value: string): void {
    this.inputChange.emit(value);
  }
}
