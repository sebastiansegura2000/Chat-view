import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDefComponent } from './group-def.component';

describe('GroupDefComponent', () => {
  let component: GroupDefComponent;
  let fixture: ComponentFixture<GroupDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
