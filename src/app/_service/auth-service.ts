import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject, Observable } from 'rxjs';

@Injectable()
export class AuthService {

  private loggedInStatus = false;
  private authenticationToken = '';
  private id = -1;
  public onLoggedInStatus: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private http: HttpClient) { 
    console.log('ciaooo',this.authenticationToken)
    if (!this.authenticationToken || !this.id) {
      this.authenticationToken = localStorage.getItem('usertoken');
      this.id = +localStorage.getItem('userid'); // il piu lo converte in numero.
      if (this.authenticationToken && this.id){
        this.setAuthenticationToken(this.authenticationToken);
        this.setId(this.id);
        this.setLoggedIn(true);
      }
    }
  }

  setLoggedIn(value: boolean) {
    this.onLoggedInStatus.emit(value);
    console.log('evento emesso'+value)
    this.loggedInStatus = value;
  }

  getisLoggedIn() {
    return this.loggedInStatus;
  }

  setAuthenticationToken(value:string):void{
    this.authenticationToken=value;
    localStorage.setItem('usertoken', value)
  }

  destroyAuthenticationToken():void{
    localStorage.removeItem('usertoken');
  }

  destroyId():void{
    localStorage.removeItem('userid');
  }

  getAuthenticationToken():string{
    if (!this.authenticationToken) {
      this.authenticationToken = localStorage.getItem('usertoken')
      this.setAuthenticationToken(this.authenticationToken)
    }
    return this.authenticationToken;
  }

  setId(value:number):void{
    this.id=value;
    localStorage.setItem('userid', value.toString())
  }

  getId():number{
    if (!this.id) {
      this.id = +localStorage.getItem('userid')
      this.setId(this.id)
    }
    return this.id;
  }

}