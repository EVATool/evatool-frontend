import {Component, OnInit, AfterViewInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from "@angular/material/table";
import { ValueDataService } from "../services/value/value-data.service";
import { Value } from "../model/Value";

@Component({
  selector: 'app-value-dialog',
  templateUrl: './value-dialog.component.html',
  styleUrls: ['./value-dialog.component.css']
})
export class ValueDialogComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'description'];


  socialValue: Value[] = [];

  // socialValueId: '1', socialValueTitle: 'Sicherheit', socialValueDescription: 'Bedeutet den Schutz gegen physische oder mentale Bedrohungen. Dies schließt auch das subjektive Gefühl ein, gut geschützt zu sein.', economicValueId: null, economicValueTitle: null, economicValueDescription: null},
  // {socialValueId: '2', socialValueTitle: 'Fürsorge', socialValueDescription: 'Wird ausgeübt, indem eine Person mit Einschränkungen Hilfestellung bei Handlungen erhält, die sie in dieser Form nicht (mehr) alleine durchführen kann.', economicValueId: null, economicValueTitle: null, economicValueDescription: null},
  // {socialValueId: '3', socialValueTitle: 'Autonomie', socialValueDescription: 'Bedeutet Freiheit, eigenständig zu entscheiden und zu handeln.', economicValueId: null, economicValueTitle: null, economicValueDescription: null},
  // {socialValueId: '4', socialValueTitle: 'Teilhabe', socialValueDescription: 'Steht für das Recht einer Person, mit anderen Menschen in der Gesellschaft gemeinschaftlich Erlebnisse zu teilen, und für den Zugang zu Diensten und Mitteln hierfür.', economicValueId: null, economicValueTitle: null, economicValueDescription: null},
  // {socialValueId: '5', socialValueTitle: 'Privatheit', socialValueDescription: 'Umfasst das Recht auf Transparenz, Zweckbindung, Integrität und Vergessen bei der Verarbeitung der persönlichen Daten, geht aber noch weiter: Jede Person verfügt über eine unverletzbare, schützenswerte "private Zone", die dem Zugriff anderer entzogen ist.', economicValueId: null, economicValueTitle: null, economicValueDescription: null},
  // {socialValueId: '6', socialValueTitle: 'Gerechtigkeit', socialValueDescription: 'Bedeutet, dass dieselben Standards für alle angewendet werden, und dass Ressourcen entsprechend der Bedürftigkeit zugeteilt werden.', economicValueId: null, economicValueTitle: null, economicValueDescription: null},
  // {socialValueId: '7', socialValueTitle: 'Selbstverständnis', socialValueDescription: 'Schließlich steht für die Freiheit über das eigene mentale Modell und die Art, wie man sich sieht und bewertet. Gerade alte und kranke Menschen werden oft sehr massiv "fremdbewertet" durch betreuende Institutionen (die es durchaus gut mit ihnen meinen).', economicValueId: null, economicValueTitle: null, economicValueDescription: null}];

  economicValue: Value[] = [];

  // economicValueId: '1', economicValueTitle: 'Verantwortung', economicValueDescription: 'Beschreibt, in welcher Weise das System Aufwand (Zeit, Geld, Verpflichtungen) erzeugt oder vermindert.', socialValueId: null, socialValueTitle: null, socialValueDescription: null},
  // {economicValueId: '2', economicValueTitle: 'Profitabilität', economicValueDescription: 'Bezieht sich auf die Fähigkeit einer Organisation, seine operativen Prozesse und strategische Entwicklung aus den eigenen Einnahmen zu bestreiten.', socialValueId: null, socialValueTitle: null, socialValueDescription: null},
  // {economicValueId: '3', economicValueTitle: 'Strategische Gelegenheit', economicValueDescription: 'Umfasst alle nicht-monetären Aspekte einer Organisation (Innovationen vorantreiben, strategische Position oder Marktanteil ausbauen, etc.).', socialValueId: null, socialValueTitle: null, socialValueDescription: null}];

  constructor(public valueDataService: ValueDataService, @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {}

  ngOnInit(): void {

    /*this.valueDataService.onCreateSocialValue.subscribe(value => {
      this.socialValue.push(value);
      this.matDataSourceSocial = new MatTableDataSource<Value>(this.socialValue);
    });

    this.valueDataService.onCreateEconomicValue.subscribe(value => {
      this.economicValue.push(value);
      this.matDataSourceEconomic = new MatTableDataSource<Value>(this.economicValue);
    });*/
  }

  ngAfterViewInit(): void {
    this.valueDataService.onInit();
  }

  addSocialValue(): void {
    this.valueDataService.createSocialValue();
  }

  addEconomicValue(): void {
    this.valueDataService.createEconomicValue();
  }

  saveSocialValue(value: Value): void {
    value.editable = false;
    this.valueDataService.save(value, this.data.id);
  }

  saveEconomicValue(value: Value): void {
    value.editable = false;
    this.valueDataService.save(value, this.data.id);
  }

  deleteValue(value: Value): void {
    this.valueDataService.deleteValue(value);
  }
}
