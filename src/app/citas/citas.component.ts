import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { EventInput, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import esLocale from '@fullcalendar/core/locales/es'
import Swal from'sweetalert2';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

Events: any=[dayGridPlugin,interactionPlugin] ;



onDateClick(res: { dateStr: string }) {
  const fecha = res.dateStr;
  console.log(`Se hizo clic en la fecha: ${fecha}`);
  const eventos = this.filterEventsByDate(fecha);
  console.log(`Eventos para el ${fecha}:`, eventos);
  function formatEvent(event: any): string {
    return `<div style=" border: 1px solid black; border-radius:20px; margin-bottom:20px"> Paciente: ${event.title}<br>Hora: ${event.time}<br></div>`;
  }
  
  const eventosFormateados = eventos.map(formatEvent);
  Swal.fire({
    position: 'top',
    icon: 'success',
    html: '<div style="display: flex; justify-content: center; text-align: center; flex-direction: column;">Estas son las citas del día:<br><br></div>' + '' + eventosFormateados.join('\n\n')

  })

}



calendarOptions: any = {
  plugins: [dayGridPlugin, interactionPlugin],
  weekends: true,
  dateClick:this.onDateClick.bind(this),
  events: []
};
  
  constructor(private service: AuthService) { }
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
