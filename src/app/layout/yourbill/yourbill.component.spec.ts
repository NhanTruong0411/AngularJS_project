import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourbillComponent } from './yourbill.component';

describe('YourbillComponent', () => {
  let component: YourbillComponent;
  let fixture: ComponentFixture<YourbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourbillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
