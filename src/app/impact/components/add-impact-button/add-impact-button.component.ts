import { ImpactDataService } from './../../services/impact/impact-data.service';
import { DimensionDataService } from './../../services/dimension/dimension-data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-impact-button',
  templateUrl: './add-impact-button.component.html',
  styleUrls: ['./add-impact-button.component.css']
})
export class AddImpactButtonComponent implements OnInit {
  @Output() addButtonClick = new EventEmitter<void>();

  constructor(private impactDataService: ImpactDataService) {

  }

  ngOnInit(): void {

  }

  addButtonClicked(): void {
    this.addButtonClick.emit();
  }
}
