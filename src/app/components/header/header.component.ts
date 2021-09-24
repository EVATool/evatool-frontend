import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {LogService} from '../../services/log.service';
import {CrossUiEventService} from '../../services/event/cross-ui-event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
              private logger: LogService,
              public crossUI: CrossUiEventService) {

  }

  ngOnInit(): void {

  }

  highlightTextChange(event: string): void {
    this.logger.debug(this, 'Highlight Text Changed');
    this.crossUI.highlightTextChanged.emit(event);
  }
}
