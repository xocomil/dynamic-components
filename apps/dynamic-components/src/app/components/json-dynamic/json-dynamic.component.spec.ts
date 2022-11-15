import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDynamicComponent } from './json-dynamic.component';

describe('JsonDynamicComponent', () => {
  let component: JsonDynamicComponent;
  let fixture: ComponentFixture<JsonDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsonDynamicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JsonDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
