import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../data-storage.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, private router: Router, private authService:AuthService){}

  ngOnInit(){
    if(this.authService.autologin())
    {
      this.dataStorageService.fetchUser().subscribe();
      this.router.navigate(['calendar']);
    }
    else this.router.navigate(['login']);
  }


}
