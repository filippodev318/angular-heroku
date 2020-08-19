import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-heroku';

  constructor(private router:Router){}

  ngOnInit(): void {
    console.log("vfhnjdcsxmkz")
    this.router.navigate(['home'])
  }

}

