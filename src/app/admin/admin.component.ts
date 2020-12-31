import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private dataStorageService:DataStorageService, private router:Router, private authService:AuthService) { }

  ngOnInit(){
    if(this.authService.autologin())this.dataStorageService.fetchUsers().subscribe();
    else this.router.navigate(['login']);
  }

}
