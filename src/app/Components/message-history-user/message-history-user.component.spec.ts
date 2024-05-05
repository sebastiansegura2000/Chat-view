import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHistoryUserComponent } from './message-history-user.component';

describe('MessageHistoryUserComponent', () => {
  let component: MessageHistoryUserComponent;
  let fixture: ComponentFixture<MessageHistoryUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageHistoryUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHistoryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
