import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userdata: any;
  constructor (private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router:Router){
    
        this.userdata = sessionStorage
      
  }
  CerrarSesion(){
    sessionStorage.clear()
    localStorage.clear()
  }
}
