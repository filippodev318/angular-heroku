import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http'
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../_service/auth-service';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {
  backend="http://93.55.184.20:5000"

  logForm = new FormGroup({
    email:new FormControl("", [
      Validators.required
    ]),
    password:new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  regForm = new FormGroup({
    username:new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    email:new FormControl("", [
      Validators.required
    ]),
    password:new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]),
    nome:new FormControl("", [
      Validators.required
    ]),
    cognome:new FormControl("", [
      Validators.required
    ]),
    citta:new FormControl("", [
      Validators.required
    ]),
    telefono:new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9 ]{10}")
    ])
  })

  email:String;
  password:String; 

  constructor(
    private router: Router,
    private Auth: AuthService, 
    private snackBar:MatSnackBar, 
    private http:HttpClient){
  }
  

  ngOnInit(): void {
  }

  nameErrorMessage() {
    if (this.regForm.get('nome').hasError('required')) 
      return 'Il campo nome va compilato';
  }

  cognomeErrorMessage(){
    if (this.regForm.get('cognome').hasError('required')) 
      return 'Il campo cognome va compilato';
  }

  usernameErrorMessage(){
    if (this.regForm.get('username').hasError('required')) 
      return 'Il campo username va compilato';
    if (this.regForm.get('username').hasError('minlength')) 
      return " L'username deve essere almeno di 5 caratteri";
  }
  
  pwdErrorMessage(){
    if (this.logForm.get('password').hasError('required'))
      return 'Inserisci la password' 
    if (this.regForm.get('password').hasError('required')) 
      return " Il campo password va compilato ";    
    if (this.regForm.get('password').hasError('minlength')) 
      return " La password deve essere almeno di 6 caratteri";
  }
   
  emailErrorMessage(){
    if (this.logForm.get('email').hasError('required'))
      return " Inserisci l'email " 
    if (this.regForm.get('email').hasError('required')) 
      return 'Il campo email va compilato';
  }

  phoneErrorMessage(){
    if (this.regForm.get('telefono').hasError('pattern')) 
      return 'Numero di telefono non valido';  
  }


  register(regForm) {
    let url = this.backend+"/register"
    if(regForm.valid){
    this.snackBar.open('Registrazione in corso.... !!','',{duration:3000})
    this.http.post(url,regForm.value).toPromise().then(
      (data: any) => {
                        console.log("hcndxjsmdnjs")
                        console.log(data);
                        console.log(data["response"]);
                        console.log(data["response"]["user"]["authentication_token"]);
                        console.log(data["response"]["user"]["id"]);
                        this.snackBar.open('Registrazione avvenuta con successo !!','',{duration:2000});
                        this.Auth.setAuthenticationToken(data["response"]["user"]["authentication_token"]);
                        this.Auth.setId(data["response"]["user"]["id"]);
                        this.Auth.setLoggedIn(true);
                        this.router.navigate(['home'])
                        regForm.reset();
                      },
      (error: any) => {
                        console.log(error)
                        this.snackBar.open(JSON.stringify(error["error"]["response"]["errors"]),'',{duration:7000});  
                      }              
    );
  }
   
  }
  
  login(logForm) {
    let url = this.backend+"/login"

    if(logForm.valid){
      console.log('email',logForm.get('email').value)
      let email = logForm.get('email').value;
      let password = logForm.get('password').value;
      this.http.post(url,{email,password}).toPromise().then(
        (data: any) => {
                          console.log('login_reg data: ', data);
                          this.Auth.setAuthenticationToken(data["response"]["user"]["authentication_token"]);
                          this.Auth.setId(data["response"]["user"]["id"]);
                          this.Auth.setLoggedIn(true);
                          this.router.navigate(['home'])
                          console.log(this.Auth.getAuthenticationToken());
                          console.log(this.Auth.getId());
                        },

        (error: any) => {
                        console.log(error)
                        this.snackBar.open(JSON.stringify(error["error"]["response"]["errors"]),'',{duration:7000});  
                      }
        
      );
    }
  }

  resetPassword(logForm) {
    let url = this.backend+"/reset"

    if(logForm.get('email').valid){
      //console.log('resetPassword',this.logForm.get('email').value);
      let email=this.logForm.get('email').value;
      this.http.post(url,{email}).toPromise().then(
        (data: any) => {
                          console.log(data);
                          this.snackBar.open('Sono state inviate all\'indirizzo email le istruzione per reimpostare la password!','',{duration:3000});
                        },
        (error: any) => {
                          console.log(error)
                          this.snackBar.open(JSON.stringify(error["error"]["response"]["errors"]),'',{duration:7000});
                        }
      );
    }
  }

}
