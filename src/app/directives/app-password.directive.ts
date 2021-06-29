import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class AppPasswordDirective {
  private shown = false;

  constructor(private el: ElementRef) {
    this.setup();
  }

  toggle(span: HTMLElement): void {
    this.shown = !this.shown;
    if (this.shown) {
      this.el.nativeElement.setAttribute('type', 'text');
      span.innerHTML = 'Hide password';
    } else {
      this.el.nativeElement.setAttribute('type', 'password');
      span.innerHTML = 'Show password';
    }
  }

  setup(): void {
    const parent = this.el.nativeElement.parentNode;
    const span = document.createElement('span');
    span.innerHTML = `Show password`;
    span.addEventListener('click', (event) => {
      this.toggle(span);
    });
    parent.appendChild(span);
  }
}
