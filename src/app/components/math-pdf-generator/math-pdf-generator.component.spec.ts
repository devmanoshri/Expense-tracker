import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathPdfGeneratorComponent } from './math-pdf-generator.component';

describe('MathPdfGeneratorComponent', () => {
  let component: MathPdfGeneratorComponent;
  let fixture: ComponentFixture<MathPdfGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathPdfGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathPdfGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
