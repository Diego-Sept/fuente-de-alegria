import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaydesksComponent } from './paydesks.component';

describe('PaydesksComponent', () => {
  let component: PaydesksComponent;
  let fixture: ComponentFixture<PaydesksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaydesksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaydesksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
