import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/user.model';
import { Vacation } from 'src/app/shared/vacation.model';
import { UserListService } from '../../user-list.service';

@Component({
  selector: 'app-admin-calendar',
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css']
})
export class AdminCalendarComponent implements OnInit {
  id:number;
  selectedUserVacations:Vacation[]=[];
  currentDate:Date;
  firstName: string='';
  constructor(private route:ActivatedRoute, private router:Router, private userListService:UserListService) { }

  ngOnInit(){
    this.currentDate=new Date();
    this.route.paramMap
      .pipe(map(params => params.get('id')), tap(id => (this.id = +id)))
      .subscribe(id => {
        this.selectedUserVacations=this.userListService.userList[+id].vacations.sort((a, b)=>{
          let date1= new Date(a.startDate);
          let date2= new Date(b.startDate);
          return date1.getTime()-date2.getTime()
        });
        this.firstName=this.userListService.userList[+id].firstName;
        this.userListService.selectedUserId=+id;
      });  
  }

  onVacationSelect(i:number){
    this.userListService.selectedUserId=this.id;
    this.router.navigate([i],{relativeTo:this.route});
  }

}