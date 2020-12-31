import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../shared/user.model";
import { Vacation } from "../shared/vacation.model";

@Injectable({providedIn:'root'})
export class UserListService{
    userList: User[]=[];
    userListChanged = new Subject<User[]>();
    selectedUserId: number;


    setUserList(userList:User[]){
        this.userList=userList;
        this.userListChanged.next(this.userList.sort((a,b)=>{
            return a.lastName.localeCompare(b.lastName)
        }));
    }

    approveVacation(index:number){
        this.userList[this.selectedUserId].vacations[index].approved=true;
        this.userListChanged.next(this.userList);
    }

    denyVacation(index:number){
        this.userList[this.selectedUserId].vacations.splice(index,1);
        this.userListChanged.next(this.userList);
    }

    init(){
        this.userListChanged.next(this.userList);
    }

}

