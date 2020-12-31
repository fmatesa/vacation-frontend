import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/data-storage.service';
import { User } from 'src/app/shared/user.model';
import { UserListService } from '../user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList:User[];
  isApproved:boolean[];
  unapprovedAmount:number[];
  changesMade:boolean;

  constructor(private userListService:UserListService, private router:Router, private route:ActivatedRoute, private dataStorageService:DataStorageService) { }

  ngOnInit(){
    this.router.navigate(["admin"]);
    this.userListService.userListChanged.subscribe(userList=>{
      this.changesMade=this.changesMade==null ? false : true;
      this.isApproved=[];
      this.unapprovedAmount=[];
      this.userList=userList;
      this.userList.forEach((user:User)=>{
        let approved:boolean=true;
        let amount:number=0
        user.vacations.forEach((vacation)=>{
          if(vacation.approved==false){
            approved=false;
            amount++;
          }
        });
        this.isApproved.push(approved);
        this.unapprovedAmount.push(amount);
      });
    });
  }

  onOpenView(id: number){
      this.router.navigate([id],{relativeTo:this.route});
  }

  onSaveChanges(){
    this.userListService.userList.forEach(user=>{
      this.dataStorageService.storeVacations(new User(user.accountId, user.firstName, user.lastName, user.email, user.vacations));
    })
    this.changesMade=false;
  }
}
