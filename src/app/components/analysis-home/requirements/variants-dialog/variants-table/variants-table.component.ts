import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../../../../../model/Variant';
import {VariantDataService} from '../../../../../services/data/variant-data.service';
import {LogService} from '../../../../../services/log.service';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AnalysisDataService} from '../../../../../services/data/analysis-data.service';

@Component({
  selector: 'app-variants-table',
  templateUrl: './variants-table.component.html',
  styleUrls: ['./variants-table.component.scss']
})
export class VariantsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() archived!: boolean;
  @Input() id = '';

  displayedColumns = ['name', 'description'];
  tableDataSource: MatTableDataSource<Variant> = new MatTableDataSource<Variant>();

  constructor(private logger: LogService,
              public variantDataService: VariantDataService,
              private analysisDataService: AnalysisDataService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.variantDataService.loadedVariants.subscribe((variants: Variant[]) => {
      this.updateTableDataSource();
    });

    this.variantDataService.createdVariant.subscribe((variant: Variant) => {
      this.updateTableDataSource();
      //const options = {bottom: -100, duration: 250};
      //this.scrollbarRef.scrollTo(options);
      // Flash newly created impact.
    });

    this.variantDataService.updatedVariant.subscribe((variant: Variant) => {
      this.updateTableDataSource();
    });

    this.variantDataService.deletedVariant.subscribe((variant: Variant) => {
      this.updateTableDataSource();
    });

    this.updateTableDataSource();
  }

  ngAfterViewInit(): void {
    this.initSorting();
  }

  updateTableDataSource(): void {
    this.tableDataSource.data = this.variantDataService.variants.filter(
      variant => variant.archived === this.archived);
  }

  initSorting(): void {
    this.tableDataSource.sort = this.sort;
  }

  createVariant(): void {
    const variant = this.variantDataService.createDefaultVariant(
      this.analysisDataService.currentAnalysis);
    this.variantDataService.createVariant(variant);
  }

  updateVariant(variant: Variant): void {
    this.variantDataService.updateVariant(variant);
  }

  deleteVariant(variant: Variant): void {
    this.variantDataService.deleteVariant(variant);
  }
}
