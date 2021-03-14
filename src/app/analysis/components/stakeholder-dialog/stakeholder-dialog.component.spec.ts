import { ComponentFixture, TestBed } from '@angular/core/testing';
import {StakeholderDialogComponent} from './stakeholder-dialog.component';


describe('StakeholderDialogComponent', () => {
  let component: StakeholderDialogComponent;
  let fixture: ComponentFixture<StakeholderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StakeholderDialogComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
