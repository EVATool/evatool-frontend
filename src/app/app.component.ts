import {Component} from '@angular/core';
import {MasterService} from './services/master.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'evatool-frontend';

  constructor(private master: MasterService) {
    this.master.init();
  }
}
