import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EntrenosComponent } from './pages/entrenos/entrenos.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { MovementsComponent } from './pages/movements/movements.component';
import { AddMovementFormComponent } from './pages/movements/add-movement-form/add-movement-form.component';
import { MyDataComponent } from './pages/users/my-data/my-data.component';
import { authRotersGuard } from './guards/auth-roters.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent},
    {path: 'mis-entrenos', component: EntrenosComponent, canActivate: [authRotersGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'crear-cuenta', component: RegisterComponent},
    {path: 'usuarios', component: UsersComponent, canActivate: [authRotersGuard, adminAuthGuard]},
    {path: 'movimientos', component: MovementsComponent, canActivate: [authRotersGuard, adminAuthGuard]},
    {path: 'movimiento-nuevo', component: AddMovementFormComponent, canActivate: [authRotersGuard, adminAuthGuard]},
    {path: 'mis-datos', component: MyDataComponent, canActivate: [authRotersGuard]}
];
