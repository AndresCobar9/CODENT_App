import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule} from '@angular/router';

import { AppRoutingModule,  } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.model';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import {ToastrModule} from 'ngx-toastr';
import { UserslistiningComponent } from './userslistining/userslistining.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { FormsModule } from '@angular/forms';
import { UserEditingComponent } from './user-editing/user-editing.component';
import { PasswordUpdateComponent } from './password-update/password-update.component';
import { RegistrarpacienteComponent } from './registrarpaciente/registrarpaciente.component';
import { FichaodontoComponent } from './fichaodonto/fichaodonto.component';
import { CitasComponent } from './citas/citas.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatTableModule } from '@angular/material/table';
import { ListadopacientesComponent } from './listadopacientes/listadopacientes.component';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CitapacienteComponent } from './citapaciente/citapaciente.component';
import { TratamientosComponent } from './tratamientos/tratamientos.component';
import { ContabilidadComponent } from './contabilidad/contabilidad.component';
import { PacienteInfoComponent } from './paciente-info/paciente-info.component';
import { EditpagoComponent } from './editpago/editpago.component';




const routes: Routes=[
  {path: '', component:LoginComponent},
  {path: '/register', component:RegisterComponent},
  {path: '/Dashboard', component:HomeComponent},
  {path: '/users', component:UserslistiningComponent}
  
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserslistiningComponent,
    NavbarComponent,
    BannerComponent,
    UserEditingComponent,
    PasswordUpdateComponent,
    RegistrarpacienteComponent,
    FichaodontoComponent,
    CitasComponent,
    ListadopacientesComponent,
    CitapacienteComponent,
    TratamientosComponent,
    ContabilidadComponent,
    PacienteInfoComponent,
    EditpagoComponent
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FullCalendarModule,
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
