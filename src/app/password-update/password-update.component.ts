import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from '../service/auth.service';
import { UserEditingComponent } from '../user-editing/user-editing.component';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from'sweetalert2';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit{
  constructor(private router:Router, private route:ActivatedRoute, private builder: FormBuilder, private service:AuthService, @Inject(MAT_DIALOG_DATA) public data:any){
    
  }
  public id:any
  ngOnInit(): void {
    console.log(UserEditingComponent.id)
    
  }

  updateform=this.builder.group({
    id:this.data.userid,
    password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z0-9]*')]))
  })
  
 

  Update(){
    console.log(this.updateform.value)
    if(this.updateform.valid){
      this.service.updatePassword(this.updateform.value).subscribe(res => {

        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'La Contraseña ha sido actualizada',
          showConfirmButton: false,
          timer: 1500
      })
      
        
      });
    }else{
      
        console.log('Error');
      
        }
    }

  }

