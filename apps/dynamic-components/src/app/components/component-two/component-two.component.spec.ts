import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTwoComponent } from './component-two.component';

describe('ComponentTwoComponent', () => {
  let component: ComponentTwoComponent;
  let fixture: ComponentFixture<ComponentTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentTwoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
