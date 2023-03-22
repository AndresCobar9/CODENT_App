import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:3000'

  GetAll(){
    return this.http.get(this.apiurl + '/user/userslist')
  }
  
  login(user:any){
    return this.http.post(this.apiurl+'/user/login',user)
  }
  Proceedregister(inputdata:any){
    return this.http.post(this.apiurl + '/user/register', inputdata)
  }

  pacienteregister(pacienteinfo:any){
    return this.http.post(this.apiurl + '/pacientes/register', pacienteinfo)
  }

  updateUser(user: any, id:any): Observable<any> {
    console.log(user)
    return this.http.put(this.apiurl+'/user/update/'+ id, user);
  }

  updatePaciente(user: any, id:any): Observable<any> {
    console.log(user)
    return this.http.put(this.apiurl+'/pacientes/update/'+ id, user);
  }
  updatePacienteinfo(user: any, id:any): Observable<any> {
    console.log(user)
    return this.http.put(this.apiurl+'/pacientes/updateinfo/'+ id, user);
  }

  addPago(id:any, inputdata:any){
    return this.http.post(this.apiurl + '/pacientes/' + id + '/pagos' ,inputdata)
  }

  deletePago(id:any){
    return this.http.delete(this.apiurl + '/pacientes/pagodelete/' + id)
  }
  deleteTratamiento(id:any){
    return this.http.delete(this.apiurl + '/pacientes/tratamientodelete/' + id)
  }
  deleteCita(id:any){
    return this.http.delete(this.apiurl + '/pacientes/citadelete/' + id)
  }
  getPacientes(){
    return this.http.get(this.apiurl + '/pacientes/all')
  }
  updatePassword(password:any): Observable<any>{
    return this.http.put(this.apiurl +'/user/updatepassword/' + password.id, password);
  }
  addCita(id:any, inputdata:any){
    return this.http.post(this.apiurl + '/pacientes/' + id + '/citas' ,inputdata)
  }
  addTratamiento(id:any, inputdata:any){
    return this.http.post(this.apiurl + '/pacientes/' + id + '/tratamientos' ,inputdata)
  }
  getcitas(){
    return this.http.get(this.apiurl + '/pacientes/all_citas')
  }
  getpacientecita(id:any){
    return this.http.get(this.apiurl + '/pacientes/' + id + '/info')
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const req = this.parseJwt(token);
      return req != null;
    }
    return false;
  }

  parseJwt(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (e) {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.clear();
  }

  UserID(userid:string){
    return this.http.get(this.apiurl +'/user/'+ String(userid))

  }

  GetUserrole(){
  return sessionStorage.getItem('userrole')!=null?sessionStorage.getItem('userrole')?.toString():''  }
}
