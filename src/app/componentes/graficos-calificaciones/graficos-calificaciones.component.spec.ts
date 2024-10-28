import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficosCalificacionesComponent } from './graficos-calificaciones.component';

describe('GraficosCalificacionesComponent', () => {
  let component: GraficosCalificacionesComponent;
  let fixture: ComponentFixture<GraficosCalificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficosCalificacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficosCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
