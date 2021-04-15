import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ValueTemplateTableComponent} from './value-template-table.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';


describe('ValueTemplateTableComponent', () => {
  let component: ValueTemplateTableComponent;
  let fixture: ComponentFixture<ValueTemplateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ValueTemplateTableComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueTemplateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
