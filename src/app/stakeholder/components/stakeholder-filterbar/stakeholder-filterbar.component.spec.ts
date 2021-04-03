import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderFilterbarComponent } from './stakeholder-filterbar.component';

describe('StakeholderFilterbarComponent', () => {
  let component: StakeholderFilterbarComponent;
  let fixture: ComponentFixture<StakeholderFilterbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ StakeholderFilterbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderFilterbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
