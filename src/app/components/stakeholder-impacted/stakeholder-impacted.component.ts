import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-stakeholder-impacted',
  templateUrl: './stakeholder-impacted.component.html',
  styleUrls: ['./stakeholder-impacted.component.scss']
})
export class StakeholderImpactedComponent implements OnInit {
  @Input() stakeholderImpacted!: number | null;
  @Input() editable = false;
  @Input() isFilter = false;
  @Output() impactChange = new EventEmitter<number | null>();
  public impactIsNull = false;

  constructor(private logger: LogService) {
  }

  ngOnInit(): void {
    this.impactIsNull = !this.editable && this.stakeholderImpacted == null;
  }

  getImpacted(): number | null {
    if (this.stakeholderImpacted == null) {
      return null;
    }
    if (this.isFilter) {
      return this.stakeholderImpacted;
    } else {
      return this.stakeholderImpacted * -1;
    }
  }

  onImpactChange(event: any): void {
    this.stakeholderImpacted = event.value;
    this.impactChange.emit(this.stakeholderImpacted);
  }
}
