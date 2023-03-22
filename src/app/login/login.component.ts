import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import Swal from'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userdata: any 
  token:any;
  isLoggedIn: boolean = false; // agregado
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router:Router){
    this.token = localStorage.getItem('token')
  }
loginform=this.builder.group({
  username:this.builder.control('',Validators.required),
  password:this.builder.control('',Validators.required)
})

proceedlogin() {
  if (this.loginform.valid) {
    this.service.login(this.loginform.value).subscribe(res => {
      
      this.userdata = res;

      if (this.userdata && this.userdata.token && this.userdata.identity.isactive) {
        this.token = this.userdata.token;
        localStorage.setItem('token', this.token);
        sessionStorage.setItem('username', this.userdata.identity.username);
        sessionStorage.setItem('name', this.userdata.identity.name);
        sessionStorage.setItem('userrole', this.userdata.identity.userrole);
        this.isLoggedIn = this.service.isLoggedIn(); // agregado
        this.router.navigate(['Dashboard']);
        this.toastr.success('Bienvenido '+ sessionStorage.getItem('name'),'Te haz Logueado correctamente')
    } else if (this.userdata && !this.userdata.isactive) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tu Usuario esta Deshabilitado',
            footer: '<a href="mailto:andrescobar0@outlook.com">Tienes un problema?</a>'
        })
    } else {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: 'Los datos ingresados son incorrectos',
        showConfirmButton: false,
        timer: 1500
    })
    }
    });
  
  
  
  
  } else {
    for (const field in this.loginform.controls) {
      
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Rellena todos los datos"
    })
    
}
  }
}


}
