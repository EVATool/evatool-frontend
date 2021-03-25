import { LogService } from './../../settings/log.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-impact-button',
  templateUrl: './add-impact-button.component.html',
  styleUrls: ['./add-impact-button.component.css']
})
export class AddImpactButtonComponent implements OnInit {
  @Output() addButtonClick = new EventEmitter<void>();

  constructor(private logger: LogService) {

  }

  ngOnInit(): void {

  }

  addButtonClicked(): void {
    this.logger.info(this, 'Add Button Clicked');
    this.addButtonClick.emit();
  }
}
