import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-entity-button',
  templateUrl: './add-entity-button.component.html',
  styleUrls: ['./add-entity-button.component.scss']
})
export class AddEntityButtonComponent implements OnInit {
  @Input() text!: string;
  @Output() clicked = new EventEmitter<void>();

  constructor() {

  }

  ngOnInit(): void {

  }

  onClick(): void {
    this.clicked.emit();
  }
}
