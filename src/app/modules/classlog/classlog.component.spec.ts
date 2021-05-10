import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasslogComponent } from './classlog.component';

describe('ClasslogComponent', () => {
  let component: ClasslogComponent;
  let fixture: ComponentFixture<ClasslogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasslogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasslogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
