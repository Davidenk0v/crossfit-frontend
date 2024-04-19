import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrenosComponent } from './entrenos.component';

describe('EntrenosComponent', () => {
  let component: EntrenosComponent;
  let fixture: ComponentFixture<EntrenosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrenosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntrenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
