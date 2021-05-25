import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-button',
  templateUrl: './scroll-to-top-button.component.html',
  styleUrls: ['./scroll-to-top-button.component.scss']
})
export class ScrollToTopButtonComponent implements OnInit {
  @Input() windowScrolled!: boolean;
  @Output() clicked = new EventEmitter<void>();

  constructor() {

  }

  ngOnInit(): void {

  }

  onClick(): void {
    this.clicked.emit();
  }
}
