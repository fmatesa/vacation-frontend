import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Vacation } from '../shared/vacation.model';
import { User } from '../shared/user.model';

@Injectable({providedIn:'root'})
export class ActiveUserService{
    userChanged = new Subject<User>();
    activeUser: User = new User(0,'','', '',[]);

    deleteVacation(index:number){
        this.activeUser.vacations.splice(index, 1);
        this.userChanged.next(this.activeUser);
    }
    
    addVacation(vacation: Vacation){
        let newVacation = new Vacation(vacation.startDate, vacation.endDate, vacation.note, false);
        this.activeUser.vacations.push(newVacation);
        this.userChanged.next(this.activeUser);
    }

    updateVacation(index: number, vacation: Vacation){
        let newVacation = new Vacation(vacation.startDate, vacation.endDate, vacation.note, false);
        newVacation.id=vacation.id;
        this.activeUser.vacations[index]=newVacation;
        this.userChanged.next(this.activeUser);
    }
    setVacations(vacations: Vacation[]){
        this.activeUser.vacations = vacations;
        console.log(this.activeUser.vacations);
        this.userChanged.next(this.activeUser);
    }

    updateUser(userInfo:{firstName: string, lastName: string, email:string}){
        this.activeUser.email=userInfo.email;
        this.userChanged.next(this.activeUser);
    }

    setActiveUser(user: User){
        this.activeUser=user;
        this.userChanged.next(this.activeUser);
    }



}