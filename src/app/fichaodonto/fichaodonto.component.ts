import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import Swal from'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fichaodonto',
  templateUrl: './fichaodonto.component.html',
  styleUrls: ['./fichaodonto.component.css']
})
export class FichaodontoComponent implements OnInit {
  dataSource:any
  pacienteinfo:any
  botonHabilitado = false;
  pacienteform:any
  botonVisible = true;
  id:any

  habilitarCampos() {
    const role = localStorage.getItem('role')
    if(role == 'Paciente'){
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
  constructor(public dialogRef: MatDialogRef<FichaodontoComponent>,private toastr:ToastrService,private router:Router,private service:AuthService, private builder:FormBuilder, @Inject(MAT_DIALOG_DATA) public data:any) {
    
    this.pacienteform = this.builder.group({
      Motivo:this.builder.control({value: '', disabled:true},Validators.required),
      HistoriaClinica:this.builder.control('',Validators.required),
      HistoriaMedica:this.builder.control('',Validators.required),
      Medicamentos:this.builder.control('',Validators.required),
      Habitos:this.builder.control('',Validators.required),
      Diagnostico:this.builder.control('',Validators.required),
      Comentario:this.builder.control('',Validators.required)
    

   }
    )
  }
  ngOnInit(): void {
    this.pacienteinfo = this.data.userid[0]
    this.id = this.pacienteinfo.num
    console.log(this.id)
    console.log(this.pacienteinfo)
    this.pacienteform=this.builder.group({
      Motivo:this.builder.control({value: this.pacienteinfo.Motivo, disabled:true},Validators.required),
      HistoriaClinica:this.builder.control({value: this.pacienteinfo.HistoriaC, disabled:true},Validators.required),
      HistoriaMedica:this.builder.control({value: this.pacienteinfo.HistoriaM, disabled:true},Validators.required),
      Medicamentos:this.builder.control({value: this.pacienteinfo.Medicamentos, disabled:true},Validators.required),
      Habitos:this.builder.control({value: this.pacienteinfo.Habitos, disabled:true},Validators.required),
      Diagnostico:this.builder.control({value: this.pacienteinfo.Diagnostico, disabled:true},Validators.required),
      Comentario:this.builder.control({value: this.pacienteinfo.Comentario, disabled:true},Validators.required)
    })
  

  }
  
  
  

  
  onSubmit() {
    const updateObject = this.pacienteform.value;
    
    if (this.pacienteform.valid) {
      this.service.updatePaciente(updateObject, this.id).subscribe(
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
          this.toastr.warning(`Campo ${field} inválido: `, control.errors);
        }
      }
      this.toastr.warning('Ingresa los datos correctamente', '');
    }
  }


  

   
  
 

}
  

