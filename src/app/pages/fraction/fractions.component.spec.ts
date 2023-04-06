import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FractionsComponent } from './fractions.component';


describe('FractionsComponent', () => {
  let component: FractionsComponent;
  let fixture: ComponentFixture<FractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FractionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
