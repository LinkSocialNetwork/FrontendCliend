import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsergeneralinfoComponent } from './usergeneralinfo.component';

describe('UsergeneralinfoComponent', () => {
  let component: UsergeneralinfoComponent;
  let fixture: ComponentFixture<UsergeneralinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsergeneralinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergeneralinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
