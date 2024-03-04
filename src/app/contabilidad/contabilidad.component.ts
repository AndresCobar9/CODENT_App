import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import Swal from'sweetalert2';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.css']
})
export class ContabilidadComponent {
  tratamientoform:any
  conta:any
  fecha:any
  pagos: any[]= []
  constructor(private toastr: ToastrService,public dialogRef: MatDialogRef<ContabilidadComponent>,@Inject(MAT_DIALOG_DATA) public data:any, private service:AuthService, private builder:FormBuilder) 
  {
    this.fecha= new Date().toISOString().split('T')[0];
    console.log(this.fecha)
    this.tratamientoform = this.builder.group({
      Fecha:this.builder.control(this.fecha, Validators.required),
      Descripcion: this.builder.control('', Validators.required),
      Credito: this.builder.control(''),
      Debito: this.builder.control('')
      
    });
    this.conta = this.data.userid
    this.pagos = this.conta.pagos 
    this.dataSource = new MatTableDataSource(this.pagos)
    
    
  }
  dataSource:any
  displayedColumns: string[] = ['Id','Fecha','Descripcion','Credito', 'Debito', 'Borrar']
  
  deletePago(id:any){
    const role = this.service.GetUserrole()
    if(role == "Admin"){
    this.service.deletePago(id).subscribe(res=>{
      window.location.reload()
    } 
    )
    }else{
      this.toastr.warning('No tienes permisos para realizar esta acción', 'Acción no permitida');
    }
  }
  registrarPago(){
    
    this.service.addPago(this.conta.id,this.tratamientoform.value).subscribe(res=>{
      if(this.tratamientoform.valid){
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Pago agregado correctamente',
          showConfirmButton: false,
          timer: 1000
      })
      const data = this.dataSource.data;
      data.push(this.tratamientoform.value);
      this.dataSource.data = data;
      }
      else{
        console.log("error")
      }
    }
    )
  }

    
}
