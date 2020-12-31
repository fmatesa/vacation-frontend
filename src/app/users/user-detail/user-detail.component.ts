import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/user.model';
import { ActiveUserService } from '../active-user.service';
import { DataStorageService } from 'src/app/data-storage.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  editIsOn:boolean = false;
  firstName:String;
  lastName:String;
  email:String;
  userForm: FormGroup;

  constructor(private activeUserService: ActiveUserService, private dataStorageService: DataStorageService) { }

  ngOnInit(){
    this.activeUserService.userChanged.subscribe(user=>{
      this.firstName=user.firstName;
      this.lastName=user.lastName;
      this.email=user.email;
      this.initForm();
    })
      
    
  }

  private initForm(){
    this.userForm = new FormGroup({
      'email':new FormControl(this.email, [Validators.required, Validators.email]),
    })
  }

  onEdit(){
    this.editIsOn=true;
  }

  onSubmit(){
    this.activeUserService.updateUser(this.userForm.value);
    this.onCancel();
  }

  onCancel(){
    this.editIsOn=false;
  }

}
