import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBookingsComponent } from './student-bookings.component';

describe('StudentBookingsComponent', () => {
  let component: StudentBookingsComponent;
  let fixture: ComponentFixture<StudentBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
