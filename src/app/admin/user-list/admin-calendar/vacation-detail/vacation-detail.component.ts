import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserListService } from 'src/app/admin/user-list.service';
import { User } from 'src/app/shared/user.model';
import { Vacation } from 'src/app/shared/vacation.model';

@Component({
  selector: 'app-vacation-detail',
  templateUrl: './vacation-detail.component.html',
  styleUrls: ['./vacation-detail.component.css']
})
export class VacationDetailComponent implements OnInit {
  selectedVacation:Vacation;
  id:number;
  
  constructor(private route:ActivatedRoute, private router:Router, private userListService:UserListService) { }

  ngOnInit(){
      this.route.paramMap.subscribe(params => {
        this.id = +params.get('index');
          this.selectedVacation=this.userListService.userList[this.userListService.selectedUserId].vacations[this.id];
      });
  }

  onApprove(){
    this.userListService.approveVacation(this.id);
  }

  onDeny(){
    this.userListService.denyVacation(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});  }
}
