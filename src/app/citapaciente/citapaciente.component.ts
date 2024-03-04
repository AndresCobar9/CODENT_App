import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ListadopacientesComponent } from '../listadopacientes/listadopacientes.component';
import { AuthService } from '../service/auth.service';
import Swal from'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-citapaciente',
  templateUrl: './citapaciente.component.html',
  styleUrls: ['./citapaciente.component.css']
})
export class CitapacienteComponent {
  dataSource:any
  updateform: any;

  constructor( public dialogRef: MatDialogRef<CitapacienteComponent>,@Inject(MAT_DIALOG_DATA) public data:any, private service:AuthService, private builder:FormBuilder, private toastr:ToastrService, private router:Router){
    this.getInfo()
    this.updateform = this.builder.group({
      Fecha: this.builder.control('', Validators.required),
      Hora: this.builder.control('', Validators.required),
      
    });
  }
  pacienteCitas:any
  getInfo(){
    this.service.getpacientecita(this.data.userid).subscribe((res: any) => {
      this.pacienteCitas=res.Citas;
      
      this.dataSource =new MatTableDataSource(this.pacienteCitas)
    }
    )
  }
  deleteCita(id:any){
    const role = localStorage.getItem('role')
    if(role == 'Admin'){
    this.service.deleteCita(id).subscribe(res=>{
      window.location.reload()
    })
  }else{
    this.toastr.warning('No tienes permisos para eliminar citas')
  }

  }
  addCita(){
    console.log(this.updateform.value)
    this.service.addCita(this.data.userid,this.updateform.value).subscribe(res=>{
      if(this.updateform.valid){
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Cita agregada correctamente',
          showConfirmButton: false,
          timer: 1000
      })
      this.dialogRef.close();
      window.location.reload()
      }
    })
  }
  displayedColumns: string[] = ['num','Fecha','Hora', 'borrar']

}
