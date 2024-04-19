import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HauteurQuaiComponent } from './hauteur-quai.component';

describe('HauteurQuaiComponent', () => {
  let component: HauteurQuaiComponent;
  let fixture: ComponentFixture<HauteurQuaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HauteurQuaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HauteurQuaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
