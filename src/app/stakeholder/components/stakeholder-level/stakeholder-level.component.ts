import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stakeholder} from '../../model/Stakeholder';


@Component({
  selector: 'app-stakeholder-level',
  templateUrl: './stakeholder-level.component.html',
  styleUrls: ['./stakeholder-level.component.scss']
})
export class StakeholderLevelComponent implements OnInit {

  @Input() public level!: string;
  @Input() public editable = true;
  @Output() levelChange = new EventEmitter<string | null>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.level);
  }

  onLevelChange(level: any, event: any): void {
    if (!this.editable) {return; }
    event.stopPropagation();
    this.level = level;
    this.levelChange.emit(this.level);
  }

}
