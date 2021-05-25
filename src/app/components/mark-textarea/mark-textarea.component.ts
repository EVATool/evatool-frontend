import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-mark-textarea',
  templateUrl: './mark-textarea.component.html',
  styleUrls: ['./mark-textarea.component.scss']
})
export class MarkTextareaComponent implements OnInit, AfterViewInit {
  @ViewChild('textareadiv') textarea!: ElementRef;
  @Input() highlightFilter!: string;
  @Input() text!: string;
  @Input() placeholder!: string;
  @Output() textChange = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.showPlaceholderIfEmpty();
  }

  focusEnter() {
    if (this.textIsEmpty()) {
      this.textarea.nativeElement.innerText = '';
      this.textarea.nativeElement.style.color = '#000000';
    }
  }

  focusLeave(event: any): void {
    this.text = this.removeHtml(event.target.innerHTML); // using the innerText property instead of cleaning the HTML manually should also work, but it does not.
    this.textChange.emit(this.text);
    const interval = setTimeout(() => {
      this.showPlaceholderIfEmpty();
    }, 1); // The method that changes the text to the placeholder again must not be executed synchronously.
  }

  removeHtml(html: string): string {
    return html.replace(/(<([^>]+)>)/ig, '');
  }

  textIsEmpty(): boolean {
    return this.text == null || this.text == '';
  }

  showPlaceholderIfEmpty() {
    if (this.textIsEmpty()) {
      this.textarea.nativeElement.style.color = '#7f7f7f';
      this.textarea.nativeElement.innerText = this.placeholder;
    }
  }
}
