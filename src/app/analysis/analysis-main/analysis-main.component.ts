import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AnalysisDialogComponent} from "../analysis-dialog/analysis-dialog.component";
import {Analysis} from "../model/Analysis";


@Component({
  selector: 'app-analysis-main',
  templateUrl: './analysis-main.component.html',
  styleUrls: ['./analysis-main.component.css']
})
export class AnalysisMainComponent implements OnInit {

  analysisArray: Analysis [] = [{
    title: "Analyse 1", description: "[1] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip]", lastUpdate: '07.01.2021', id: '1', img: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {title: "Analyse 2", description: "[2] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip", lastUpdate: '08.01.2021', id: '2', img: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {title: "Analyse 3", description: "[3] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip", lastUpdate: '09.01.2021', id: '3', img: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {title: "Analyse 4", description: "[4] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip]", lastUpdate: '10.02.2021', id: '4', img: "https://images.pexels.com/photos/248486/pexels-photo-248486.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {title: "Analyse 5", description: "[5] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip", lastUpdate: '11.02.2021', id: '5', img: "https://images.pexels.com/photos/206660/pexels-photo-206660.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {title: "Analyse 6", description: "[6] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip", lastUpdate: '12.02.2021', id: '6', img: "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {title: "Analyse 7", description: "[7] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip", lastUpdate: '13.02.2021', id: '7', img: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {title: "Analyse 8", description: "[8] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip", lastUpdate: '14.02.2021', id: '8', img: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {title: "Analyse 9", description: "[9] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip", lastUpdate: '15.02.2021', id: '9', img: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"},
    {title: "Analyse 10", description: "[10] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip]", lastUpdate: '16.02.2021', id: '10', img: "https://images.pexels.com/photos/248486/pexels-photo-248486.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {title: "Analyse 11", description: "[11] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip", lastUpdate: '17.02.2021', id: '11', img: "https://images.pexels.com/photos/206660/pexels-photo-206660.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
    {title: "Analyse 12", description: "[12] Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio&hellip", lastUpdate: '18.02.2021', id: '12', img: "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"},
  ];
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AnalysisDialogComponent, { data: { p: 'test', b: 'auch test' } });
  }
  ngOnInit(): void {
  }

  // addAnalysis(): void {
  //   console.log('add analysis...');
  // }

}
