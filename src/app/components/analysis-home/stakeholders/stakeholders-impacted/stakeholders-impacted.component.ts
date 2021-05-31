import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LogService} from '../../../../services/log.service';

@Component({
  selector: 'app-stakeholders-impacted',
  templateUrl: './stakeholders-impacted.component.html',
  styleUrls: ['./stakeholders-impacted.component.scss']
})
export class StakeholdersImpactedComponent implements OnInit, AfterViewInit {
  @Input() stakeholderImpacted!: number | null;
  @Input() editable = false;
  @Output() impactChange = new EventEmitter<number | null>();
  public impactIsNull = false;

  constructor(private logger: LogService) {

  }

  ngOnInit(): void {
    this.impactIsNull = !this.editable && this.stakeholderImpacted == null;
  }

  ngAfterViewInit(): void {

  }

  getImpacted(): number | null {
    if (this.stakeholderImpacted == null) {
      return null;
    }
    return this.stakeholderImpacted * -1;
  }

  onImpactChange(event: any): void {
    this.stakeholderImpacted = event.value;
    this.impactChange.emit(this.stakeholderImpacted);
  }
}
