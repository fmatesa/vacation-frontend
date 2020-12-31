import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../data-storage.service";
import { User } from "../shared/user.model";
import { UserListService } from "./user-list.service";

@Injectable({providedIn:'root'})
export class UserListResolverService implements Resolve<User[]>{
    constructor(private dataStorageService:DataStorageService, private userListService:UserListService, private authService:AuthService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        this.authService.autologin();
        const userList=this.userListService.userList;
        if(userList.length==0){
            return this.dataStorageService.fetchUsers();
        }
        else return userList;
    }
}