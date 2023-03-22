import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrls: ['./tratamientos.component.css']
})
export class TratamientosComponent {
  tratamientoform:any
  fecha:any
  proce:any
  constructor(public dialogRef: MatDialogRef<TratamientosComponent>,@Inject(MAT_DIALOG_DATA) public data:any, private service:AuthService, private builder:FormBuilder, private toastr:ToastrService) {
    this.fecha= new Date().toISOString().split('T')[0];

    this.tratamientoform = this.builder.group({
      fecha:this.builder.control(this.fecha, Validators.required),
      procedimiento: this.builder.control('', Validators.required),
      diente: this.builder.control('', Validators.required),
    });
    this.proce = this.data.userid
    console.log(this.proce)
    this.dataSource = new MatTableDataSource(this.proce.tratamientos)
  }  

dataSource:any
displayedColumns: string[] = ['Id','Fecha','Procedimiento', 'Diente', 'Borrar']

borrarTratamiento(id:any){
  this.service.deleteTratamiento(id).subscribe(res=>{
    window.location.reload()
  })
}
registrarTratamiento(){
  this.service.addTratamiento(this.proce.id,this.tratamientoform.value).subscribe(res=>{
    if(this.tratamientoform.valid){
      this.toastr.success('Tratamiento agregado correctamente', 'Tratamiento agregado');
      const data = this.dataSource.data;
      console.log(data)
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
