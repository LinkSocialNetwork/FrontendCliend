import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpasswordinfoComponent } from './userpasswordinfo.component';

describe('UserpasswordinfoComponent', () => {
  let component: UserpasswordinfoComponent;
  let fixture: ComponentFixture<UserpasswordinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpasswordinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpasswordinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
