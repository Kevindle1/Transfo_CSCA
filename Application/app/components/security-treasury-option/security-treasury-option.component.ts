import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-security-treasury-option',
  templateUrl: './security-treasury-option.component.html',
  styleUrls: ['./security-treasury-option.component.css']
})
export class SecurityTreasuryOptionComponent {
  @Input() isChecked: boolean = false;
  @Input() overdraft: number = 0;
  @Output() checkboxChange = new EventEmitter<void>();

  public onCheckboxChange(): void {
    this.checkboxChange.emit();
  }
}
