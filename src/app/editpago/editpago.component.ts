import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-editpago',
  templateUrl: './editpago.component.html',
  styleUrls: ['./editpago.component.css']
})
export class EditpagoComponent {
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<EditpagoComponent>,@Inject(MAT_DIALOG_DATA) public data:any, private service:AuthService,){
    console.log('abrio', data)
 

    this.pagoForm = this.fb.group({
      id: [this.data.element.Id],
      Descripcion: [this.data.element.Descripcion],
      Credito: [this.data.element.Credito],
      Debito: [this.data.element.Debito]
    });
  }
  pagoForm = this.fb.group({
    id: [this.data.id],
    Descripcion: [this.data.Descripcion],
    Credito: [this.data.Credito],
    Debito: [this.data.Debito]
  });

  onSubmit() {
    this.service.editPago(this.pagoForm.value).subscribe(res=>{
      window.location.reload()
    }
    )
  } 

}
