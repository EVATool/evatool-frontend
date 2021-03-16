import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell-main',
  templateUrl: './shell-main.component.html',
  styleUrls: ['./shell-main.component.css', '../../layout/style/style.css']
})
export class ShellMainComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTabGroup) tab!: MatTabGroup;

  analysisId = '';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.routerState.root.queryParams
      .subscribe(params => {
        console.log(params.id);
        this.analysisId = params.id;
      });

    if (this.analysisId === undefined) {
      console.log('Throw error? How to handle this? This should not be allowed.');
    }
  }

  ngAfterViewInit(): void {
    // @ DevTeams: Change this to your tab index and do not commit it.
    if (this.tab !== undefined) {
      this.tab.selectedIndex = 1;
    }
  }
}
