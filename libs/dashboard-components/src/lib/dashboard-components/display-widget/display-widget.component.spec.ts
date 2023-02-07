import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWidgetComponent } from './display-widget.component';

describe('DisplayWidgetComponent', () => {
  let component: DisplayWidgetComponent;
  let fixture: ComponentFixture<DisplayWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
