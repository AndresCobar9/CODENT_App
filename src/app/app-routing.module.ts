import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { CitasComponent } from './citas/citas.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { ListadopacientesComponent } from './listadopacientes/listadopacientes.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegistrarpacienteComponent } from './registrarpaciente/registrarpaciente.component';
import { UserEditingComponent } from './user-editing/user-editing.component';
import { UserslistiningComponent } from './userslistining/userslistining.component';

const routes: Routes = [  
  {path: '', component:BannerComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent, canActivate:[AuthGuard]},
  {path: 'Dashboard', component:HomeComponent, canActivate:[AuthGuard]},
  {path: 'users', component:UserslistiningComponent, canActivate:[AuthGuard]},
  {path: 'EditarUsuario', component:UserEditingComponent, canActivate:[AuthGuard]},
  {path: 'RegistrarPaciente', component:RegistrarpacienteComponent, canActivate:[AuthGuard]},
  {path: 'citas',component:CitasComponent, canActivate:[AuthGuard]},
  {path: 'pacientes',component:ListadopacientesComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


