import { Component, OnInit } from '@angular/core';
import { MatTable, _MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { User, Users } from './userlistining';
import {  ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userslistining',
  templateUrl: './userslistining.component.html',
  styleUrls: ['./userslistining.component.css']
})
export class UserslistiningComponent implements OnInit {
  constructor(private service: AuthService, private router:Router) {}

  userlist: User[] = [];
  dataSource: any;

  ngOnInit(): void {


    this.service.GetAll().subscribe(
      (res: any) => {
        this.userlist = res.users;
        console.log(this.userlist);
      },
      (err) => {
        console.error(err);
      }
    );

    
  }

  goToPage( ID:any){  
    this.router.navigate(['EditarUsuario',{id:ID}])
    console.log(ID)

  }


}