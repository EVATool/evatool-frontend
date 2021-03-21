import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateAnalysisDialogComponent } from './create-analysis-dialog/create-analysis-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private dialog: MatDialog) {

  }

  btnClick(): void {
    this.router.navigate(['/analysis'], { queryParams: { id: 'analysisUUID' }, queryParamsHandling: 'merge' });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateAnalysisDialogComponent, { data: { p: 'test', b: 'auch test' } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.accept) {
        console.log('asdasdasd');
        this.router.navigate(['/analysis'], { queryParams: { id: result.form.id }, queryParamsHandling: 'merge' });
      }
    });
  }

  ngOnInit(): void {

  }
}
