import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http'
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../_service/auth-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string;

  resetForm = new FormGroup({
    nuovaPassword:new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ]),
    confermaPassword:new FormControl("", [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,private auth: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params)
      this.token = params.get('token');
    });
  }

  changePassword(){
    console.log('token: '+this.token)
    let formPost = {
      'password' : this.resetForm.get('nuovaPassword').value,
      'password_confirm' : this.resetForm.get('nuovaPassword').value
    };

    this.http.post("https://ciromanfredi96.pythonanywhere.com"+this.token, formPost).toPromise().then((data: any) => {
      console.log(data);
      console.log("Password cambiata con successo");
      this.router.navigate(['/login-reg']);
    })
  }

  pwdErrorMessage(){
    if (this.resetForm.get('nuovaPassword').hasError('required')) 
      return 'Il campo va compilato';
    if (this.resetForm.get('nuovaPassword').hasError('minlength')) 
    return " La password deve essere almeno di 6 caratteri";
  }

  confPwdErrorMessage(){
    if (this.resetForm.get('confermaPassword').hasError('required')) 
      return 'Il campo va compilato';
    if (this.resetForm.get('confermaPassword').hasError('minlength')) 
    return " La password deve essere almeno di 6 caratteri";
  }
  

}
