import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

// https://stackblitz.com/edit/angular-table-resize?file=src%2Fapp%2Fresizable-table.component.scss
@Directive({
  selector: '[resizeColumn]'
})
export class ResizeColumnDirective implements OnInit {
  @Input('resizeColumn') resizable!: boolean;
  @Input('resizeColumnOffset') offset!: number;
  @Input('resizeColumnIndex') index!: number;

  private startX!: number;
  private startWidth!: number;
  private readonly column: HTMLElement;
  private table!: HTMLElement;
  private pressed!: boolean;

  constructor(private renderer: Renderer2,
              private el: ElementRef) {
    this.column = this.el.nativeElement;
  }

  ngOnInit(): void {
    if (this.resizable) {
      const row = this.renderer.parentNode(this.column);
      const thead = this.renderer.parentNode(row);
      this.table = this.renderer.parentNode(thead);

      const resizer = this.renderer.createElement('span');
      this.renderer.addClass(resizer, 'resize-holder');
      this.renderer.appendChild(this.column, resizer);
      this.renderer.listen(resizer, 'mousedown', this.onMouseDown);
      this.renderer.listen(this.table, 'mousemove', this.onMouseMove);
      this.renderer.listen('document', 'mouseup', this.onMouseUp);
    }
  }

  onMouseDown = (event: MouseEvent) => {
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = this.column.offsetWidth;
  };

  onMouseMove = (event: MouseEvent) => {
    // TODO This offset is column specific and needs to be adjusted when the min-width of any column is changed
    //  it should be calculated automatically. But how?
    const offset = this.offset;
    if (this.pressed && event.buttons) {
      this.renderer.addClass(this.table, 'resizing');

      // Calculate width of column.
      const width = this.startWidth + (event.pageX - this.startX - offset);

      // Calculate index of column.
      let index = -1;
      const columns = this.table.querySelectorAll('.mat-header-cell');
      columns.forEach(column => {
        index++;
        if (column === this.column) {
          this.index = index;
        }
      });

      if (this.index === -1) {
        console.log('Unknown column (index is -1).');
        return;
      }

      // Get all cells that need to be resized.
      const tableCells = Array.from(this.table.querySelectorAll('.mat-row')).map(
        (row: any) => row.querySelectorAll('.mat-cell').item(this.index)
      );

      // Set table header width.
      this.renderer.setStyle(this.column, 'width', `${width}px`);

      // Set table cells width.
      for (const cell of tableCells) {
        this.renderer.setStyle(cell, 'width', `${width}px`);
      }
    }
  };

  onMouseUp = (event: MouseEvent) => {
    if (this.pressed) {
      this.pressed = false;
      this.renderer.removeClass(this.table, 'resizing');
    }
  };
}
