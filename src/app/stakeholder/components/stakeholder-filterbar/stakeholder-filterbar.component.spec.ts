import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderFilterbarComponent } from './stakeholder-filterbar.component';
import { RouterTestingModule} from '@angular/router/testing';

describe('StakeholderFilterbarComponent', () => {
  let component: StakeholderFilterbarComponent;
  let fixture: ComponentFixture<StakeholderFilterbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
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
