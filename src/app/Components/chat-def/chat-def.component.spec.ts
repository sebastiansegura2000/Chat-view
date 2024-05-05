import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDefComponent } from './chat-def.component';

describe('ChatDefComponent', () => {
  let component: ChatDefComponent;
  let fixture: ComponentFixture<ChatDefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatDefComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
