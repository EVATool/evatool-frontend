import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-highlight-textarea',
  templateUrl: './highlight-textarea.component.html',
  styleUrls: ['./highlight-textarea.component.scss']
})
export class HighlightTextareaComponent implements AfterViewInit {
  @ViewChild('textareadiv') textarea!: ElementRef;
  @Input() highlightFilter = '';
  @Input() text!: string;
  @Input() placeholder!: string;
  @Output() textChange = new EventEmitter<string>();

  ngAfterViewInit(): void {
    this.showPlaceholderIfEmpty();
  }

  focusEnter(): void {
    if (this.textIsEmpty()) {
      this.textarea.nativeElement.innerText = '';
      this.textarea.nativeElement.style.color = '#000000';
    }
  }

  focusLeave(event: any): void {
    // using the innerText property instead of cleaning the HTML manually should also work, but it does not.
    this.text = this.removeHtml(event.target.innerHTML);
    this.textChange.emit(this.text);
    setTimeout(() => {
      this.showPlaceholderIfEmpty();
    }, 1); // The method that changes the text to the placeholder again must not be executed synchronously.
  }

  removeHtml(html: string): string {
    return html.replace(/(<([^>]+)>)/ig, '');
  }

  textIsEmpty(): boolean {
    return this.text == null || this.text === '';
  }

  showPlaceholderIfEmpty(): void {
    if (this.textIsEmpty()) {
      this.textarea.nativeElement.style.color = '#7f7f7f';
      this.textarea.nativeElement.innerText = this.placeholder;
    }
  }
}
