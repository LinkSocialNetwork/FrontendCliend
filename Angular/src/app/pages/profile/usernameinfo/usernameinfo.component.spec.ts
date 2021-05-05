import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameinfoComponent } from './usernameinfo.component';

describe('UsernameinfoComponent', () => {
  let component: UsernameinfoComponent;
  let fixture: ComponentFixture<UsernameinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernameinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernameinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
