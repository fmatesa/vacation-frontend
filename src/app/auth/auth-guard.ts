import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../data-storage.service";

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private dataStorageService:DataStorageService, private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree{
        if(this.dataStorageService.token.length>5)return true;
        else return this.router.createUrlTree(['/login']);   
      }
    
}