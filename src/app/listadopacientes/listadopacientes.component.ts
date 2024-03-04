import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CitapacienteComponent } from '../citapaciente/citapaciente.component';
import { FichaodontoComponent } from '../fichaodonto/fichaodonto.component';
import { TratamientosComponent } from '../tratamientos/tratamientos.component';
import { ContabilidadComponent } from '../contabilidad/contabilidad.component';
import { PacienteInfoComponent } from '../paciente-info/paciente-info.component';
import Swal from'sweetalert2';
@Component({
  selector: 'app-listadopacientes',
  templateUrl: './listadopacientes.component.html',
  styleUrls: ['./listadopacientes.component.css']
})
export class ListadopacientesComponent{

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private service:AuthService, private dialog:MatDialog){

    this.loaduser()
    
  }
  
  paciente:any={}

  dataSource: any

  deleteP(id:any){
    this.service.deletePaciente(String(id)).subscribe(
      (res) => {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Paciente eliminado',
          showConfirmButton: false,
          timer: 1500
        })
        this.loaduser()
      },
      (err) => {
        Swal.fire({
          position: 'top',
          icon: 'error',
          title: 'Error al eliminar',
          showConfirmButton: false,
          timer: 1500
        })
        console.error(err);
      }
    );
  }
  Citas(id:any){
  
    this.dialog.open(CitapacienteComponent ,{
      data:{userid:id}
    })
    }

  FichaMedica(id:any){
    
    this.dialog.open(FichaodontoComponent ,{
      data:{userid:id}
    })
    }

  Tratamiento(id:any){
    
    this.dialog.open(TratamientosComponent ,{
      data:{userid:id}
    })
    }

  Contabilidad(id:any){
   
    this.dialog.open(ContabilidadComponent ,{
      data:{userid:id}
    })
    }  

  Informacion(id:any){
    this.loaduser()

    this.dialog.open(PacienteInfoComponent ,{
      data:{userid:id}
    })
    }  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator = this.paginator;
  }

  loaduser(){


    this.service.getPacientes().subscribe(
      (res: any) => {
        
        this.paciente = res;
        this.dataSource =new MatTableDataSource(this.paciente)
        this.dataSource.paginator = this.paginator;
        
      },
      (err) => {
        console.error(err);
      }
    );
  }

  displayedColumns: string[] = ['ID','Nombre','Apellido','Edad','Citas','Ficha medica', 'Tratamientos', 'Plan de Tratamiento', 'Informacion', 'delete']
  
}
