import {Component, OnInit, ViewChild} from '@angular/core';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-variant-edit',
  templateUrl: './variant-edit.component.html',
  styleUrls: ['./variant-edit.component.scss']
})
export class VariantEditComponent implements OnInit {
  @ViewChild(VariantTableComponent) table!: VariantTableComponent;
  @ViewChild(VariantFilterBarComponent) filterBar!: VariantFilterBarComponent;

  constructor(private logger: LogService) {
  }

  ngOnInit(): void {
  }
}
