import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {VariantDialogComponent} from '../variant-dialog/variant-dialog.component';

@Component({
  selector: 'app-variant-main',
  templateUrl: './variant-main.component.html',
  styleUrls: ['./variant-main.component.css']
})
export class VariantMainComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) {

  }

  btnClick(): void {
    this.router.navigate(['/main'], { queryParams: { id: 'analysisUUID' }, queryParamsHandling: 'merge' });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VariantDialogComponent, { data: { p: 'test', b: 'auch test' } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.accept) {
        console.log('asdasdasd');
        this.router.navigate(['/main'], { queryParams: { id: result.form.id }, queryParamsHandling: 'merge' });
      }
    });
  }

  ngOnInit(): void {

  }
}
