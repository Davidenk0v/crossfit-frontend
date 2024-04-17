import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EntrenosComponent } from './pages/entrenos/entrenos.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent},
    {path: 'mis-entrenos', component: EntrenosComponent},
    {path: 'login', component: LoginComponent},
    {path: 'crear-cuenta', component: RegisterComponent},
    {path: 'usuarios', component: UsersComponent}
];
