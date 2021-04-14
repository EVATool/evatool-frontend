import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../../models/Variant';
import {VariantDataService} from '../../services/variant-data.service';
import {LogService} from '../../../shared/services/log.service';

@Component({
  selector: 'app-variant-table',
  templateUrl: './variant-table.component.html',
  styleUrls: ['./variant-table.component.scss']
})
export class VariantTableComponent implements OnInit {

  @Input() matDataSource!: MatTableDataSource<Variant>;
  @Input() id = '';
  displayedColumns = ['guiId', 'title', 'description'];

  constructor(public variantDataService: VariantDataService,
              private logger: LogService) {
  }

  ngOnInit(): void {
    this.variantDataService.init();
  }

  addVariant(): void {
    this.variantDataService.createVariant();
  }

  save(variant: Variant): void {
    this.logger.info(this, 'Save Button clicked');
    if (variant.editable !== true) {
      return;
    }
    variant.editable = false;
    if (variant.id !== '') {
      this.variantDataService.update(variant);
    } else {
      this.variantDataService.save(variant);
    }

  }

  archive(variant: Variant): void {
    this.logger.info(this, 'Archive Button clicked');
    this.variantDataService.archive(variant);
  }

  unarchive(variant: Variant): void {
    this.logger.info(this, 'Unarchive Button clicked');
    this.variantDataService.unarchive(variant);
  }

  delete(variant: Variant): void {
    this.logger.info(this, 'Delete Button clicked');
    this.variantDataService.delete(variant);
  }

  edit(variant: Variant): void {
    this.logger.info(this, 'Edit Button clicked');
    if (!variant.archived) {
      variant.editable = true;
    }
  }
}
