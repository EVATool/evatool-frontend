import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Variant} from '../../../../../model/Variant';
import {VariantDataService} from '../../../../../services/data/variant-data.service';
import {LogService} from '../../../../../services/log.service';
import {MatSort} from '@angular/material/sort';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AnalysisDataService} from '../../../../../services/data/analysis-data.service';
import {RequirementDataService} from '../../../../../services/data/requirement-data.service';
import {Requirement} from '../../../../../model/Requirement';
import {HttpInfo} from '../../../../../services/HttpInfo';
import {FunctionalErrorCodeService} from '../../../../../services/functional-error-code.service';
import {HttpLoaderService} from '../../../../../services/http-loader.service';

@Component({
  selector: 'app-variants-table',
  templateUrl: './variants-table.component.html',
  styleUrls: ['./variants-table.component.scss']
})
export class VariantsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @Input() archived!: boolean;
  @Input() ids: string[] = [];
  @Output() userWantsToSeeReferencedRequirements: EventEmitter<Variant> = new EventEmitter();

  displayedColumns = ['name', 'description'];
  tableDataSource: MatTableDataSource<Variant> = new MatTableDataSource<Variant>();

  constructor(private logger: LogService,
              private requirementDataService: RequirementDataService,
              public variantDataService: VariantDataService,
              private analysisDataService: AnalysisDataService,
              private httpLoader: HttpLoaderService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.httpLoader.httpError.subscribe((httpInfo: HttpInfo) => {
      if (httpInfo.functionalErrorCode === FunctionalErrorCodeService.VARIANT_REFERENCED_BY_REQUIREMENT) {
        const value = this.variantDataService.variants.find(v => v.id === httpInfo.tag);
        if (value) {
          const numImpactsUseValue = this.getReferencedRequirements(value);
          if (numImpactsUseValue > 0) {
            this.thwartValueOperation(value, numImpactsUseValue);
          }
        }
      }
    });

    this.variantDataService.loadedVariants.subscribe((variants: Variant[]) => {
      this.updateTableDataSource();
    });

    this.variantDataService.createdVariant.subscribe((variant: Variant) => {
      this.updateTableDataSource();
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
    this.logger.info(this, 'Delete Variant');
    this.variantDataService.deleteVariant(variant);
  }

  getReferencedRequirements(variant: Variant): number {
    let numRequirementsUseVariant = 0;
    this.requirementDataService.requirements.forEach((requirement: Requirement) => {
      if (requirement.variants.includes(variant)) {
        numRequirementsUseVariant++;
      }
    });
    return numRequirementsUseVariant;
  }

  thwartValueOperation(variant: Variant, numRequirementsUseVariant: number): void {
    this.logger.warn(this, 'This variant is still being used by ' + numRequirementsUseVariant + ' requirements');
    const message = 'This variant cannot be deleted. It is still being used by '
      + numRequirementsUseVariant + ' requirement' + (numRequirementsUseVariant === 1 ? '' : 's') + '.';
    const action = 'show';
    const snackBarRef = this.snackBar.open(message, action, {duration: 5000});
    snackBarRef.onAction().subscribe(() => {
      this.logger.info(this, 'User wants to see the requirements referencing the variant');
      this.userWantsToSeeReferencedRequirements.emit(variant);
    });
  }

  archivedVariantReferenced(variant: Variant): boolean {
    return this.ids?.includes(variant.id);
  }
}
