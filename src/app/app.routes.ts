import { PRIMARY_OUTLET, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { error } from 'console';
import { ErrorComponent } from './componentes/error/error.component';
import { AfiliadoComponent } from './componentes/afiliado/afiliado.component';
import { MedicoComponent } from './componentes/medico/medico.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { administradorGuard, afliadoGuard, medicoGuard } from './guard/administrador.guard';
import { GraficoCalificacionesComponent } from './componentes/graficos-calificaciones/graficos-calificaciones.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'afiliado',component:AfiliadoComponent,canActivate:[afliadoGuard]},
    {path:'medico',component:MedicoComponent,canActivate:[medicoGuard]},
    {path:'administrador',component:AdministradorComponent,canActivate:[administradorGuard]},
    {path:'registro', component:RegistroComponent},
    {path:'calificaciones', component: GraficoCalificacionesComponent },
    {path:'',component:PrincipalComponent},

    {path:'**',component:ErrorComponent}
];  
