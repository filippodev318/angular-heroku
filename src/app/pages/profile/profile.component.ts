import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../_service/auth-service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { UploadService } from 'src/app/_service/upload/upload-service';
import { Upload } from 'src/app/_service/upload/upload';

export interface UserProfile{
  url_image : string;
  nome : string;
  cognome : string;
  email : string;
  username : string;
  citta : string;
  telefono : string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {

  profileForm = new FormGroup({
    telefono:new FormControl("",[
      Validators.pattern("[0-9 ]{10}")
    ]),
    citta:new FormControl("",)
  }) 

  editable : boolean;
  user : UserProfile;
  pathPhoto: string;
  selectedFiles: FileList;
  currentUpload: Upload;
  percentuale;
  caricamento;
  backend="http://93.55.184.20:5000"
  constructor(private Auth: AuthService, private http:HttpClient, private uploadService: UploadService) { 
    console.log('id:'+this.Auth.getId().toString())
    this.uploadService.percentuale.subscribe({
      next: (event:string) => {
          console.log('Received message jhygvfcdxsza',event);
          this.percentuale=+event;
      }
    })
  }

  phoneErrorMessage(){
    if (this.profileForm.get('telefono').hasError('pattern')) 
      return 'Numero di telefono non valido';  
  }


  ngOnInit(): void {
    this.editable=false
    console.log('init',this.editable)
    
    let url = this.backend+"/profile"

    let headers = {
        'Cache-Control': 'no-cache',
        'Cache-Content-Type': 'application/json',
        'authentication_token': this.Auth.getAuthenticationToken()
      }
      
    console.log(headers)
    this.http.get(url,{headers:headers}).toPromise()
    .then((data: any) => {
      this.user=data;
      console.log(data);
      console.log(this.user);
      console.log(JSON.stringify(this.user));
      this.editable = false;
    })

  }

  detectFiles(event){
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    this.caricamento=true;
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file, this.Auth.getId().toString());
    this.uploadService.pushUpload(this.currentUpload);
  }

  buttonEdit(){
    this.editable = true
    console.log('button EDIT',this.editable)
  }

  updateField(){
    if(this.profileForm.valid){
        let url = this.backend+"/profile"

        let headers = {
            'Cache-Control': 'no-cache',
            'Cache-Content-Type': 'application/json',
            'authentication_token': this.Auth.getAuthenticationToken()
          }
        
        //console.log("Aggiorno info")
        //console.log(this.profileForm)

        this.http.put(url,{citta:this.profileForm.get("citta").value,telefono:this.profileForm.get("telefono").value},{headers:headers}).toPromise().then((data: any) => {
            console.log(data)
            this.editable = false;
            this.user.citta = this.profileForm.get("citta").value;
            this.user.telefono = this.profileForm.get("telefono").value;
          })
      }
    }

}
