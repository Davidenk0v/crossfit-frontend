import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRotersComponent } from './auth-roters.component';

describe('AuthRotersComponent', () => {
  let component: AuthRotersComponent;
  let fixture: ComponentFixture<AuthRotersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRotersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthRotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
