import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasslogFromComponent } from './classlog-from.component';

describe('ClasslogFromComponent', () => {
  let component: ClasslogFromComponent;
  let fixture: ComponentFixture<ClasslogFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasslogFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasslogFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
