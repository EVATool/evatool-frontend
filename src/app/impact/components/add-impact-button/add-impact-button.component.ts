import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-impact-button',
  templateUrl: './add-impact-button.component.html',
  styleUrls: ['./add-impact-button.component.css']
})
export class AddImpactButtonComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<void>();

  constructor() {

  }

  ngOnInit(): void {

  }

  addButtonClicked(): void {
    this.buttonClick.emit();
  }
}
