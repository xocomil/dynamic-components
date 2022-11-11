import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentThreeComponent } from './component-three.component';

describe('ComponentThreeComponent', () => {
  let component: ComponentThreeComponent;
  let fixture: ComponentFixture<ComponentThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentThreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
