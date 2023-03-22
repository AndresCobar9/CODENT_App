import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import Swal from'sweetalert2';
import { PasswordUpdateComponent } from '../password-update/password-update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-editing',
  templateUrl: './user-editing.component.html',
  styleUrls: ['./user-editing.component.css']
})
export class UserEditingComponent implements OnInit {
  @ViewChild('switchInput') switchInput!: ElementRef<HTMLInputElement>;

  public id: any;
  user:any={}
  
  useri: any={};
  updateform: any;
  static id: any;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    
    this.service.UserID(this.id).subscribe(
      (res: any) => {
        this.useri = res.user;
        console.log(this.useri);
        console.log(this.useri.value)
        this.updateform = this.builder.group({
          username: this.builder.control({ value: this.useri.username, disabled: true }, Validators.compose([Validators.required, Validators.minLength(3)])),
          name: this.builder.control({ value: this.useri.name, disabled: true }, Validators.required),
          email: this.builder.control({ value: this.useri.email, disabled: true }, Validators.compose([Validators.required, Validators.email])),
          gender: this.builder.control(this.useri.gender),
          role: this.builder.control({ value: this.useri.role, disabled: true }),
          isactive: this.builder.control(this.useri.autorizado)
        });
      },
      (err) => {
        console.error(err);
      }
    )
  }
  constructor(private toastr:ToastrService,private service:AuthService, private router:Router, private route:ActivatedRoute, private builder: FormBuilder, private dialog:MatDialog){
    this.updateform = this.builder.group({
      username:this.builder.control({value: '', disabled:true},Validators.compose([Validators.required,Validators.minLength(3)]) ),
      name:this.builder.control({value: '', disabled:true},Validators.required),
      email:this.builder.control({value: '', disabled:true},Validators.compose([Validators.required,Validators.email])),
      gender:this.builder.control(this.useri.gender),
      role:this.builder.control({value: '', disabled:true}),
      isactive:this.builder.control(this.useri.isactive)
    })
  }  
  



  buildUpdateObject(): Record<string, any> {
    const updateObject: Record<string, any> = {};
  
    if (this.updateform.get('username')?.enabled) {
      updateObject['username'] = this.updateform.value.username;
    }
  
    if (this.updateform.get('name')?.enabled) {
      updateObject['name'] = this.updateform.value.name;
    }
  
    if (this.updateform.get('email')?.enabled) {
      updateObject['email'] = this.updateform.value.email;
    }
  
    if (this.updateform.get('gender')?.enabled) {
      updateObject['gender'] = this.updateform.value.gender;
    }
  
    if (this.updateform.get('role')?.enabled) {
      updateObject['role'] = this.updateform.value.role;
    }
  
    if (this.updateform.get('isactive')?.enabled) {
      updateObject['isactive'] = this.updateform.value.isactive;
    }
  
    return updateObject;
  }

  
  onSubmit() {
    
    if(this.updateform.valid){
      this.service.updateUser(this.updateform.value, this.id).subscribe(res => {
        
        Swal.fire({
          icon: 'success',
          title: 'Usuario Actualizado',
          text: 'Los datos han sido actualizados correctametne',
          confirmButtonText: 'Aceptar'

        }).then((result) => {
          this.router.navigateByUrl('/Dashboard')
        })
        
      });
    }else{
      for (const field in this.updateform.controls) {
        const control = this.updateform.get(field);
        if (control && control.errors) {
          this.toastr.warning(`Campo ${field} inválido: `, control.errors);
        }
      }
      this.toastr.warning('Ingresa los datos correctamente',)
    }
  }
  

  inputs = [
    { id: 'name', enabled: false },
    { id: 'role', enabled: false },
    { id: 'genero', enabled: false },
    { id: 'username', enabled: false },
    { id: 'email', enabled: false },
    
  ];

  toggleInput(input: { id: string, enabled: boolean }) {
    const index = this.inputs.findIndex(i => i.id === input.id);
    const control = this.updateform.get(input.id);
    control?.enable({ emitEvent: false });
    this.inputs[index].enabled = !this.inputs[index].enabled;
    if (!this.inputs[index].enabled) {
      control?.disable({ emitEvent: false });
    }
  }
 
  ChangePassowrd(){
    this.dialog.open(PasswordUpdateComponent ,{
      data:{userid:this.id}
    })
    }
  }




