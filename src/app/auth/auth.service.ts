import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { DataStorageService } from "../data-storage.service";

@Injectable({providedIn:'root'})
export class AuthService{
    isAdmin = new Subject<boolean>();
    
    constructor(private http: HttpClient, private dataStorageService:DataStorageService, private router:Router){}

    signUp(email: string, password: string, firstName: string, lastName: string){
        return this.http.post('http://localhost:8080/auth/signup', {email: email, password: password, firstName: firstName, lastName: lastName}, {responseType:'text'});
    }

    login(email: string, password: string){
        return this.http.post('http://localhost:8080/auth/login', {id: 0, email: email, password:password, token:null}, {responseType:'text'}).subscribe((response:string)=>{
            if(response.length>0){
              this.dataStorageService.token=response;
              localStorage.setItem("token", response);
              this.adminCheck();
              this.router.navigate(['/calendar']);
            }
          });;
    }

    logout(){
        this.http.post('http://localhost:8080/auth/logout', this.dataStorageService.token, {responseType:'text'})
            .subscribe(response=>{
                console.log(response);
                this.dataStorageService.token=null;
                this.isAdmin.next(false);
            })
    }

    autologin():boolean{
        let token:string = localStorage.getItem("token");
        console.log(token);
        if(token.length>4){
          this.dataStorageService.token=token;
          this.adminCheck();
          return true;
        }
        else return false;
    }

    adminCheck(){
        this.http.post('http://localhost:8080/auth/admin', this.dataStorageService.token, {responseType:'text'})
            .subscribe(response=>{
                console.log(response);
                if(response.length>0){
                    this.isAdmin.next(true);
                }
                else this.isAdmin.next(false);
            })
    }

    getPassword(email:string){
        this.http.post('http://localhost:8080/auth/mail', email, {responseType:'text'}).subscribe(response=>{
            console.log(response);
        })
    }
}