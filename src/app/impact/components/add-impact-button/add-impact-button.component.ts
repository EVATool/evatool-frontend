import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-impact-button',
  templateUrl: './add-impact-button.component.html',
  styleUrls: ['./add-impact-button.component.css']
})
export class AddImpactButtonComponent implements OnInit {
  @Output() onClicked = new EventEmitter<void>();

  constructor() {

  }

  ngOnInit(): void {

  }

  click() {
    this.onClicked.emit();
  }
}
