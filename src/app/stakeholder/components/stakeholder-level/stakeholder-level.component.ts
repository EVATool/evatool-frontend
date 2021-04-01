import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Stakeholder} from '../../model/Stakeholder';


@Component({
  selector: 'app-stakeholder-level',
  templateUrl: './stakeholder-level.component.html',
  styleUrls: ['./stakeholder-level.component.scss']
})
export class StakeholderLevelComponent implements OnInit {

  @Input() public level = 'NATURAL_PERSON';
  @Input() public editable = true;
  @Input() private filter = false;
  @Output() levelChange = new EventEmitter<string | null>();
  public levels = ['NATURAL_PERSON', 'ORGANIZATION', 'SOCIETY'];
  constructor() { }

  ngOnInit(): void {
    console.log(this.level);
  }

  onLevelChange(): void {
    if (!this.editable) {return; }
    const index = this.levels.indexOf(this.level);
    const nextIndex = (index + 1) % this.levels.length;
    this.level = this.levels[nextIndex];
    this.levelChange.emit(this.level);
  }

}
