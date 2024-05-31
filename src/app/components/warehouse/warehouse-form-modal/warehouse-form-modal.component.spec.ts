import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppWarehouseFormModalComponent } from './warehouse-form-modal.component';

describe('AppWarehouseFormModalComponent', () => {
  let component: AppWarehouseFormModalComponent;
  let fixture: ComponentFixture<AppWarehouseFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppWarehouseFormModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppWarehouseFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
