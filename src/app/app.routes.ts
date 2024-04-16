import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EntrenosComponent } from './pages/entrenos/entrenos.component';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent},
    {path: 'mis-entrenos', component: EntrenosComponent},
];
