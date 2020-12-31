import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserListService } from '../admin/user-list.service';
import { UserListComponent } from '../admin/user-list/user-list.component';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../data-storage.service';
import { User } from '../shared/user.model';
import { ActiveUserService } from '../users/active-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin:boolean=false;

  constructor(private authService:AuthService, private userListService:UserListService, private activeUserService:ActiveUserService, private router:Router) { }

  ngOnInit(){
    this.authService.isAdmin.subscribe((isAdmin:boolean)=>{
      this.isAdmin=isAdmin;
    });
  }

  onLogout(){
    this.authService.logout();
    this.userListService.setUserList([]);
    this.activeUserService.setActiveUser(new User(0,'','', '',[]));
    localStorage.setItem("token", null);
    this.router.navigate(['/login']);
  }
}
