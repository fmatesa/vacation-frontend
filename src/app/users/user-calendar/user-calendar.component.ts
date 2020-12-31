import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/data-storage.service';
import { User } from 'src/app/shared/user.model';
import { Vacation } from 'src/app/shared/vacation.model';
import { ActiveUserService } from '../active-user.service';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.css']
})

export class UserCalendarComponent implements OnInit, OnDestroy {
  vacationsList: Vacation[];
  currentDate: Date;
  subscription: Subscription;
  changesMade: boolean;

  constructor(private activeUserService:ActiveUserService, private router: Router, private route: ActivatedRoute, private dataStorageService: DataStorageService, private authService:AuthService){}

  ngOnInit(){
    this.changesMade = null;
    this.subscription = this.activeUserService.userChanged.subscribe((activeUser: User)=>{
      if(this.changesMade==null)this.changesMade = false;
      else this.changesMade = true;
      this.vacationsList=activeUser.vacations.sort((a, b)=>{
        let date1= new Date(a.startDate);
        let date2= new Date(b.startDate);
        return date1.getTime()-date2.getTime()
      });
    })
    this.currentDate=new Date();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onRemove(index:number){
    if(confirm("Are you sure you want to remove this vacation?")){
      this.activeUserService.deleteVacation(index);
    }
  }

  onNewVacation(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  onEdit(id: number){
    this.router.navigate([id],{relativeTo:this.route});
  }

  onSaveChanges(){
    this.dataStorageService.storeVacations(this.activeUserService.activeUser);
    this.changesMade = false;
  }
}

