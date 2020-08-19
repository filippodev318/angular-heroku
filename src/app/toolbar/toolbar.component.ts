import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isLoggedIn$: boolean;

  constructor(private Auth:AuthService, private router: Router) { 
    this.Auth.onLoggedInStatus.subscribe({
      next: (event:boolean) => {
          console.log('Received message',event);
          this.isLoggedIn$=event;
      }
    })
    this.isLoggedIn$=this.Auth.getisLoggedIn();
  }

  logout():void{
    this.Auth.setLoggedIn(false);
    this.Auth.destroyAuthenticationToken();
    this.Auth.destroyId();
    this.router.navigate(['/home']);
  }

  ngOnInit() { }

  /*onLogout() {
    this.Auth.logout();
  }*/

}
