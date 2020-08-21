import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SportAPPenz';

  constructor(private router:Router,private titleService: Title){}

  ngOnInit(): void {
    this.titleService.setTitle( this.title );
    this.router.navigate(['home'])
  }

}


