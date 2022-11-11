import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicHostComponent } from './dynamic-host.component';

describe('DynamicHostComponent', () => {
  let component: DynamicHostComponent;
  let fixture: ComponentFixture<DynamicHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
