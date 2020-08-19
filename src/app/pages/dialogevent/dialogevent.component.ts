import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AgmCoreModule, MouseEvent} from '@agm/core';

@Component({
  selector: 'app-dialogevent',
  templateUrl: './dialogevent.component.html',
  styleUrls: ['./dialogevent.component.css']
})
export class DialogeventComponent implements OnInit {

  card;
  partecipanti = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  

  ngOnInit(): void {
    this.card = this.data.event;
    this.partecipanti = this.data.partecipanti;
    console.log('card');
    console.log(this.card);
    console.log('partecipanti');
    console.log(this.partecipanti);
  }

}
