import { DimensionDataService } from './../../services/dimension/dimension-data.service';
import { Dimension } from './../../models/Dimension';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dimension-table',
  templateUrl: './dimension-table.component.html',
  styleUrls: ['./dimension-table.component.css', '../../../layout/style/style.css']
})
export class DimensionTableComponent implements OnInit {

  dimensions: Dimension[] = [];
  displayedColumns = ['name', 'description']

  constructor(private dimensionDataService: DimensionDataService) {
    this.dimensions = dimensionDataService.dimensions;
  }

  ngOnInit(): void {

  }
}
