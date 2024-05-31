import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackFormModalComponent } from './rack-form-modal.component';

describe('RackFormModalComponent', () => {
  let component: RackFormModalComponent;
  let fixture: ComponentFixture<RackFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RackFormModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RackFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
