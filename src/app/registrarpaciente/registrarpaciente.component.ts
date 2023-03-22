import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registrarpaciente',
  templateUrl: './registrarpaciente.component.html',
  styleUrls: ['./registrarpaciente.component.css']
})
export class RegistrarpacienteComponent {

constructor(private builder:FormBuilder, private toastr:ToastrService, private service:AuthService, private router:Router ){}

pacienteform=this.builder.group({
  Nombre:this.builder.control('',Validators.required),
  Apellido:this.builder.control('',Validators.required),
  FechaDeNacimiento:this.builder.control('',Validators.required),
  TelefonoPrincipal:this.builder.control(''),
  TelefonoSecundario:this.builder.control(''),
  Direccion:this.builder.control(''),
  Motivo:this.builder.control(''),
  HistoriaClinica:this.builder.control(''),
  HistoriaMedica:this.builder.control(''),
  Medicamentos:this.builder.control(''),
  Habitos:this.builder.control(''),
  Diagnostico:this.builder.control(''),
  Comentario:this.builder.control('')
})


  


proceedregistration(){
    
  if(this.pacienteform.valid ){
    this.service.pacienteregister(this.pacienteform.value).subscribe(res => {

      this.toastr.success('Registro Realizado correctamente')
      this.router.navigate(['/Dashboard'])
    });
  }else{
    for (const field in this.pacienteform.controls) {
      const control = this.pacienteform.get(field);
      if (control && control.errors) {
        console.log(`Campo ${field} inválido: `, control.errors);
      }
    }
    this.toastr.warning('Ingresa los datos correctamente',)
  }
}

}
