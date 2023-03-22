import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service:AuthService,private router:Router,private toastr:ToastrService){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.service.isLoggedIn()){
      if(route.url.length > 0){
        let menu = route.url[0].path
        
        if(menu == 'users' || menu == 'EditarUsuario'){
          
          if(this.service.GetUserrole() == 'Admin' ){
            return true
          }else{
  
            this.router.navigate(['Dashboard'])
            this.toastr.warning('No tienes permisos para acceder a esta sección');
            return false
          }
      }
      return true
      
    }else{
      return false
    }
  }else{
      this.router.navigate([''])
      return false
    }
      
  }
}
  

