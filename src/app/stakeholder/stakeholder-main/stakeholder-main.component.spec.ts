import {MatDialogModule} from '@angular/material/dialog';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StakeholderMainComponent} from './stakeholder-main.component';


describe('StakeholderMainComponent', () => {
  let component: StakeholderMainComponent;
  let fixture: ComponentFixture<StakeholderMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [StakeholderMainComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
