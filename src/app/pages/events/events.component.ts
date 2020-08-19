import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../_service/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogeventComponent } from '../dialogevent/dialogevent.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {

  cards = [
  ];
  
  button_text='Partecipa';
  id_user= -1;
  isLoggedIn$: boolean;
  sport=['Calcio','Tennis','Basket','Jogging'];
  backend="http://93.55.184.20:5000"

  constructor(private Auth: AuthService, private http: HttpClient, private snackBar: MatSnackBar, public datePipe: DatePipe, public dialog: MatDialog) {
    this.Auth.onLoggedInStatus.subscribe({
      next: (event:boolean) => {
          console.log('Received message',event);
          this.isLoggedIn$=event;
      }
    })
    this.isLoggedIn$= this.Auth.getisLoggedIn();
    if (this.isLoggedIn$) {
      this.id_user= this.Auth.getId();
    }   
  }

  possoPremere: boolean =true;
  join(id: String) : void {
      if(this.isLoggedIn$) {
        if(this.possoPremere){
          this.possoPremere= false;
          this.cards.forEach(card => {
            if (card.id == id) {
              if (card.button_text==='Lascia')
              {
                var url=this.backend+"/dispartecipa/";
                card.button_text= 'Partecipa';
                let index=card.id_partecipanti.indexOf(this.id_user);
                if (index !== -1) {
                  card.id_partecipanti.splice(index, 1);
                }
              }
              else
              {
                var url=this.backend+"/partecipa/";
                card.button_text= 'Lascia';
                card.id_partecipanti.push(this.id_user);
              }
              let headers = {
                'Cache-Control': 'no-cache',
                'Cache-Content-Type': 'application/json',
                'authentication_token': this.Auth.getAuthenticationToken()
              }
              this.http.get(url+id,{headers:headers}).toPromise().then((data: any) => {
                console.log(this.cards);
                this.possoPremere=true;
              });
            }
          });
        }
      }
      else
      {
        this.snackBar.open('Non sei loggato, non puoi partecipare agli eventi!','',{duration:3000});
      }
  }

  openDialog(id: String) {

    function findId(card) { 
      return card.id === id;
    }
    let card= this.cards.find(findId);
    let url=this.backend+"/profile/"
    let partecipanti=[];

    card.id_partecipanti.forEach(
        element => {
                      this.http.get(url+element,{}).toPromise()
                        .then(
                                (data: any) => {
                                                  console.log('Ho chiesto i dati per l utente',element)
                                                  partecipanti.push(data);
                                                }
                              );
                    }
      );

    console.log(partecipanti);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      partecipanti: partecipanti,
      event: card
    };

    const dialogRef = this.dialog.open(DialogeventComponent,dialogConfig);
/*
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
*/
  }

  ngOnInit(): void {
    let url = this.backend+"/events"
    this.http.get(url,{}).toPromise()
    .then((data: any) => {
      this.cards=data;
      this.cards.forEach(card => {
        var fullDate = new Date(card.date);
        var fullDateConvert = this.datePipe.transform(fullDate,'yyyy-MM-dd HH:mm');
        card.dateDisplay = fullDateConvert;
        //if(this.isLoggedIn$) {
        if (card.id_partecipanti.some(e => e === this.id_user)){
            card.button_text= 'Lascia';
        }
        else
        {
            card.button_text= 'Partecipa';
        }
        //}
        //else
        //{
        //  card.button_text= 'Partecipa';
        //}
        card.visible=true;
      });
      this.cards.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      this.check(null)
    });
  }

  check(sport:string){
    if(this.sport.includes(sport))
    {
      const index = this.sport.indexOf(sport, 0);
      if (index > -1) {
        this.sport.splice(index, 1);
      }
    }
    else
    {
      this.sport.push(sport);
    }

    console.log(this.sport)

    this.cards.forEach(card => {
      if(this.sport.includes(card.sport))
      {
          card.visible=true;
      }
      else
      {
          card.visible=false;
      }
    });
  }

}



