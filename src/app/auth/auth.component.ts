import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from '../data-storage.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(){
    let isLoggedIn:boolean = this.authService.autologin();
    console.log(isLoggedIn);
    if(isLoggedIn==true)this.router.navigate(['calendar']);
  }

}
