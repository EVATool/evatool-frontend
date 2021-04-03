import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../../models/Variant';
import {VariantDataService} from '../../services/variant-data.service';

@Component({
  selector: 'app-variant-table',
  templateUrl: './variant-table.component.html',
  styleUrls: ['./variant-table.component.scss']
})
export class VariantTableComponent implements OnInit {

  @Input() matDataSource!: MatTableDataSource<Variant>;
  @Input() id = '';
  displayedColumns = ['guiId', 'title', 'description'];
  constructor(public variantDataService: VariantDataService) { }

  ngOnInit(): void {
    console.log(this.matDataSource);
  }

  addVariant(): void {
    this.variantDataService.createVariant();
  }

  save(variant: Variant): void {
    variant.editable = false;
    this.variantDataService.save(variant);
  }

  archive(variant: Variant): void {
    this.variantDataService.archive(variant);
  }

}
