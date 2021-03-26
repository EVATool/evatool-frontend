import {ImpactTableFilterEvent} from './ImpactTableFilterEvent';
import {LogService} from '../../../shared/services/log.service';
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {SliderFilterSettings} from 'src/app/shared/components/impact-slider/SliderFilterSettings';
import {StakeholderDataService} from '../../services/stakeholder/stakeholder-data.service';
import {DimensionDataService} from '../../services/dimension/dimension-data.service';

@Component({
  selector: 'app-impact-table-filter-bar',
  templateUrl: './impact-table-filter-bar.component.html',
  styleUrls: ['./impact-table-filter-bar.component.scss']
})
export class ImpactTableFilterBarComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<ImpactTableFilterEvent>();

  stakeholderNames: string[] = [];
  dimensionNames: string[] = [];

  impactTableFilterEvent: ImpactTableFilterEvent;

  constructor(
    private logger: LogService,
    private stakeholderDataService: StakeholderDataService,
    private dimensionDataService: DimensionDataService) {
    this.impactTableFilterEvent = ImpactTableFilterEvent.getDefault();
  }

  ngOnInit(): void {
    this.stakeholderDataService.loadedStakeholders.subscribe( (stakeholders) => {
      this.stakeholderNames = stakeholders.map(value => value.name);
    });

    this.dimensionDataService.loadedDimensions.subscribe((dimensions) => {
      this.dimensionNames = dimensions.map(value => value.name);
    });
  }

  valueFilterChanged(event: SliderFilterSettings): void {
    this.logger.info(this, 'Slider Filter Changed');
    this.impactTableFilterEvent.valueFilter = event;
    this.filterChanged.emit(this.impactTableFilterEvent);
  }

  stakeholderFilterChanged(event: string[]): void {
    this.logger.info(this, 'Slider Filter Changed (Stakeholder)');
    this.impactTableFilterEvent.stakeholderFilter = event;
    this.filterChanged.emit(this.impactTableFilterEvent);
  }

  dimensionFilterChanged(event: string[]): void {
    this.logger.info(this, 'Slider Filter Changed (Dimension)');
    this.impactTableFilterEvent.dimensionFilter = event;
    this.filterChanged.emit(this.impactTableFilterEvent);
  }

  highlightTextChange($event: string): void {
  }
}
