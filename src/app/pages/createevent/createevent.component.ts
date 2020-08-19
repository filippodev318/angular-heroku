import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../_service/auth-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createevent',
  templateUrl: './createevent.component.html',
  styleUrls: ['./createevent.component.css'],
})

export class CreateeventComponent implements OnInit {

  lat: number = 40.514680;
  lng: number = 14.163612;

  time = {hour: 13, minute: 30};

  evento: any = {};
  backend="https://ciromanfredi96.pythonanywhere.com"


  eventForm = new FormGroup({
    nome:new FormControl("", [
      Validators.required
    ]),
    sport:new FormControl("", [
      Validators.required
    ]),
    prezzo:new FormControl("", [
      Validators.required
    ]),
    numerodipartecipanti:new FormControl("", [
      Validators.required
    ]),
    data:new FormControl("", [
      Validators.required
    ]),
    time:new FormControl(this.time,[Validators.required]) 
  })

  minDate: Date;

  constructor(public datePipe : DatePipe, private http : HttpClient, private Auth: AuthService, private router: Router) {
    this.minDate = new Date()
    console.log('costruttore createevent')
   }

  ngOnInit(): void {
    this.evento.visible = false;
    console.log('oninit createevent')

  }

  eventNameErrorMessage() {
    if (this.eventForm.get('nome').hasError('required')) 
      return "Immetti un nome per l'evento";
  }

  numPartecipantiErrorMessage(){
    if (this.eventForm.get('numerodipartecipanti').hasError('required')) 
      return 'Seleziona il numero di partecipanti';
  }

  prezzoErrorMessage(){
    if (this.eventForm.get('prezzo').hasError('required')) 
      return "Inserisci un prezzo per l'evento";
  }
   
  sportErrorMessage(){
    if (this.eventForm.get('sport').hasError('required'))
      return " Seleziona il tipo di sport "
  }

  dataErrorMessage(){
    if (this.eventForm.get('data').hasError('pattern')) 
      return "Indica la data dell'evento";  
  }

  mapClicked($event: MouseEvent) {
    console.log('mapClicked', $event);
    this.evento.latitudine = $event.coords.lat;
    this.evento.longitudine = $event.coords.lng;
    this.evento.draggable = true;
    this.evento.visible = true;
    console.log(this.evento);
  }

  markerDragEnd( $event: MouseEvent) {
    console.log('dragEnd', $event);
    this.evento.latitudine = $event.coords.lat;
    this.evento.longitudine = $event.coords.lng;
    this.evento.draggable = true;
    this.evento.visible = true;
    console.log(this.evento);
  }

  creaEvento():void{
    let url = this.backend+"/events"
    
    if(this.eventForm.valid){
        let headers = {
          'Cache-Control': 'no-cache',
          'Cache-Content-Type': 'application/json',
          'Authentication-Token': this.Auth.getAuthenticationToken()
        }
        
        let timeFromPicker = this.eventForm.get('time').value
        var time_conv = timeFromPicker.hour + ':' + timeFromPicker.minute + ':00';
        let dateFromPicker = this.eventForm.get('data').value;
        let date_conv = this.datePipe.transform(dateFromPicker,'yyyy-MM-dd')
        var fullDate = new Date(date_conv+' '+time_conv)
        var fullDateConvert = this.datePipe.transform(fullDate,'yyyy-MM-dd HH:mm:ss')
        let formPost = {
          name : this.eventForm.get('nome').value,
          date : fullDateConvert,
          numbersplayer : this.eventForm.get('numerodipartecipanti').value,
          price : this.eventForm.get('prezzo').value,
          sport : this.eventForm.get('sport').value,
          latitudine : this.evento.latitudine,
          longitudine : this.evento.longitudine
        }
        console.log(formPost)
        this.http.post(url,formPost,{headers:headers}).toPromise().then((data: any) => {
          console.log(data)
          this.router.navigate(['/events']);
        })
      }
  }

  nolocation():void{
    this.evento.visible = false;
    this.evento.latitudine = null;
    this.evento.longitudine = null;
  }

}