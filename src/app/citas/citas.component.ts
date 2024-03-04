import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Swal from'sweetalert2';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

Events: any=[dayGridPlugin,interactionPlugin] ;

constructor(private service: AuthService, private dialog: MatDialog) { }


onDateClick(res: { dateStr: string }) {
  const fecha = res.dateStr;
  const eventos = this.filterEventsByDate(fecha);


  function formatEvent(event: any): string {
    return `<div style=" border: 1px solid black; border-radius:20px; margin-bottom:20px"> Paciente: ${event.title}<br>Hora: ${event.time}<br></div>`;
  }
  
  const eventosFormateados = eventos.map(formatEvent);
  Swal.fire({
    position: 'top',
    icon: 'success',
    html: '<div style="display: flex; justify-content: center; text-align: center; flex-direction: column;">Estas son las citas del día:<br><br></div>' + '' + eventosFormateados.join('\n\n'),
    showConfirmButton: true,
    confirmButtonText: 'Agregar una cita',
    showDenyButton: true,
    denyButtonText: 'Cerrar',
  }).then((result) => {
    if (result.isConfirmed) {
      // Crear un Swal el cual pida el Nombre, Apellido y Numero de Telefon mediante 3 inputs y luego poner un input tipo date y otro tipo hora y crear un json con esos datos y enviarlo a la base de datos
      Swal.fire({
        title: 'Agregar Cita',
        html: '<input id="swal-input1" class="swal2-input" placeholder="Nombre del paciente">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Apellido del paciente">' +
          '<input id="swal-input3" class="swal2-input" placeholder="Numero de telefono">' +
          '<input id="swal-input4" class="swal2-input" type="date" placeholder="Fecha" value="' + fecha  + '">' +
          '<input id="swal-input5" class="swal2-input" type="time" placeholder="Hora">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            (document.getElementById('swal-input1') as HTMLInputElement).value,
            (document.getElementById('swal-input2') as HTMLInputElement).value,
            (document.getElementById('swal-input3') as HTMLInputElement).value,
            (document.getElementById('swal-input4') as HTMLInputElement).value,
            (document.getElementById('swal-input5') as HTMLInputElement).value,
          ];
        }
      }).then((result) => {
        const data = {
          Nombre: result.value[0],
          Apellido: result.value[1],
          Numero: result.value[2],
          Fecha: result.value[3],
          Hora: result.value[4],
        };
        this.service.createDefaultUser(data).subscribe((res:any) => {
          if(res.value){
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Cita Agregada',
              showConfirmButton: false,
              timer: 1500
            });
            this.Events.push({ title: data.Nombre, start: data.Fecha, time: data.Hora });
            this.calendarOptions.events = [...this.Events];
            console.log(res);

          }else{
            Swal.fire({
              position: 'top',
              icon: 'error',
              title: 'Error al Agregar la Cita',
              showConfirmButton: false,
              timer: 1500
            });
            console.log(res);
          }
       
        });
      });
    }
  }
  );


}



calendarOptions: any = {
  plugins: [dayGridPlugin, interactionPlugin],
  weekends: true,
  dateClick:this.onDateClick.bind(this),
  events: []
};
  
  ngOnInit(): void {
    
    this.service.getcitas().subscribe((res: any) => {
      res.forEach((cita: any) => {
        this.Events.push( {title: cita.paciente.nombre, start: cita.Fecha, time: cita.Hora });
        console.log(this.Events)
        this.calendarOptions.events = [...this.Events]
      });
    });

    

  }

  filterEventsByDate(fecha: string) {
    const eventos = this.Events.filter((evento: any) => {
      return evento.start === fecha;
    });
    return eventos;
  }
}
