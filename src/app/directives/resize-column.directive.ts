import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

// https://stackblitz.com/edit/angular-table-resize?file=src%2Fapp%2Fresizable-table.component.scss
@Directive({
  selector: '[resizeColumn]'
})
export class ResizeColumnDirective implements OnInit {
  @Input('resizeColumn') resizable!: boolean;
  @Input('resizeColumnOffset') offset!: number;

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
      let width = this.startWidth + (event.pageX - this.startX - offset);

      // Calculate index of column.
      const index = this.getColumnIndex();
      if (index === -1) {
        console.log('Unknown column (index is -1).');
        return;
      }

      // Abort when cs property min-width is undershot.
      const minWidth = 150;//this.getColumnMinWidth(index);
      console.log(minWidth);
      if (width + offset < minWidth) {
        width = minWidth - offset;
      }

      // Get all cells that need to be resized.
      const tableCells = Array.from(this.table.querySelectorAll('.mat-row')).map(
        (row: any) => row.querySelectorAll('.mat-cell').item(index)
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

  getColumnIndex(): number {
    let index = -1;
    let i = -1;
    const columns = this.table.querySelectorAll('.mat-header-cell');
    columns.forEach(column => {
      i++;
      if (column === this.column) {
        index = i;
      }
    });
    return index;
  }

  getColumnMinWidth(columnIndex: number): number {
    const columns = this.table.querySelectorAll('.mat-header-cell');
    const minWidthCss = columns.item(columnIndex).getAttribute('min-width'); // TODO this does not work.
    if (minWidthCss) {
      return +minWidthCss;
    } else {
      return 999999;
    }
  }
}
