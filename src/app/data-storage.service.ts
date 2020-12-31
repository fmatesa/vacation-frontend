import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActiveUserService } from './users/active-user.service';
import { map, tap } from 'rxjs/operators'
import { Vacation } from './shared/vacation.model';
import { User } from './shared/user.model';
import { Sender } from './shared/sender.model';
import { UserListService } from './admin/user-list.service';

@Injectable({providedIn:'root'})
export class DataStorageService{
    token:string;
    
    constructor(private http: HttpClient, private activeUserService: ActiveUserService, private userListService:UserListService){

    }

    storeVacations(user:User){
        console.log(user);
        let senders:Sender[]=[]
        user.vacations.forEach((vacation:Vacation)=>{
            console.log(vacation);
            senders.push(new Sender(vacation.startDate.toISOString().slice(0,10), vacation.endDate.toISOString().slice(0,10), vacation.note, vacation.approved, vacation.id));
        });
        this.http.put('http://localhost:8080/api/accounts/'+this.token, {...user, vacations:senders})
            .subscribe(response=>{
                console.log(response);
            })
    }

    fetchUser(){
        return this.http.get<User>('http://localhost:8080/api/accounts/'+this.token)
            .pipe(tap(user=>{
                if(user.vacations==null)user.vacations=[];
                else{
                    let newVacations:Vacation[]=[];
                    user.vacations.forEach(vacation=>{
                        newVacations.push(new Vacation(new Date(vacation.startDate), new Date(vacation.endDate), vacation.note, vacation.approved, vacation.id));                  
                    });
                    user.vacations=newVacations;
                }
                console.log(user)
                this.activeUserService.setActiveUser(user);
               console.log(this.activeUserService.activeUser);
            }));
    }

    fetchUsers(){
        return this.http.get<User[]>('http://localhost:8080/api/admin/'+this.token)
            .pipe(map(users=>{
                return users.map(user=>{
                    if(user.vacations==null)user.vacations=[];
                    else{
                        let newVacations:Vacation[]=[];
                        user.vacations.forEach(vacation=>{
                            newVacations.push(new Vacation(new Date(vacation.startDate), new Date(vacation.endDate), vacation.note, vacation.approved, vacation.id));                  
                        });
                        user.vacations=newVacations;
                    }
                    return user;
                });
            }),
                 tap((users:User[])=>{
                    this.userListService.setUserList(users);
                })
            );
    }

}