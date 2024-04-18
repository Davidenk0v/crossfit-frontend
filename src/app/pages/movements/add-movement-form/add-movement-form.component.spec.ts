import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovementFormComponent } from './add-movement-form.component';

describe('AddMovementFormComponent', () => {
  let component: AddMovementFormComponent;
  let fixture: ComponentFixture<AddMovementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMovementFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMovementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
