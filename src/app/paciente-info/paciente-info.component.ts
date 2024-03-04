import { Component, Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import Swal from'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paciente-info',
  templateUrl: './paciente-info.component.html',
  styleUrls: ['./paciente-info.component.css']
})
export class PacienteInfoComponent {
  pacienteform:any
  dataSource:any
  pacienteinfo:any
  botonHabilitado = false;
  botonVisible = true;
  id:any

  habilitarCampos() {
    const role = localStorage.getItem('role')
    if(role == 'Admin'){
    this.pacienteform.enable();
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Habilitado para Editar',
      showConfirmButton: false,
      timer: 1300
    })
    this.botonVisible = false;
    this.botonHabilitado = true;
  }else{
    this.toastr.warning('No tienes permisos para editar')
  }
  }
constructor(public dialogRef: MatDialogRef<PacienteInfoComponent>,@Inject(MAT_DIALOG_DATA) public data:any, private service:AuthService, private builder:FormBuilder, private toastr:ToastrService) {
  
  this.pacienteinfo = this.data.userid
  this.id = this.pacienteinfo.id
  console.log(this.pacienteinfo)
  this.pacienteform=this.builder.group({
    Nombre:this.builder.control({value: this.pacienteinfo.nombre, disabled:true},Validators.required),
    Apellido:this.builder.control({value: this.pacienteinfo.apellido, disabled:true},Validators.required),
    FechaDeNacimiento:this.builder.control({value: this.pacienteinfo.fecha_nacimiento, disabled:true},Validators.required),
    Edad:this.builder.control({value: this.pacienteinfo.edad, disabled:true}),
    TelefonoPrincipal:this.builder.control({value: this.pacienteinfo.telefono, disabled:true},Validators.required),
    TelefonoSecundario:this.builder.control({value: this.pacienteinfo.telefono_2, disabled:true},Validators.required),
    Direccion:this.builder.control({value: this.pacienteinfo.direccion, disabled:true},Validators.required),
  })
}
onSubmit() {
  const updateObject = this.pacienteform.value;
  
  if (this.pacienteform.valid) {
    this.service.updatePacienteinfo(updateObject, this.id).subscribe(
      (res) => {
        // Manejar la respuesta del servidor
        Swal.fire({
          icon: 'success',
          title: 'Usuario Actualizado',
          text: 'Los datos han sido actualizados correctametne',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          this.dialogRef.close();
          window.location.reload()

        });
      },
      (error) => {
        // Manejar errores
        console.error(error);
      }
    );
  } else {
    for (const field in this.pacienteinfo.controls) {
      const control = this.pacienteinfo.get(field);
      if (control && control.errors) {
        
    }
    
  }
}


}
}
