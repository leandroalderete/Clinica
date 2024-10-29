import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoCalificacionesComponent } from './graficos-calificaciones.component';

describe('GraficosCalificacionesComponent', () => {
  let component: GraficoCalificacionesComponent;
  let fixture: ComponentFixture<GraficoCalificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoCalificacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraficoCalificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
