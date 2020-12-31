import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/data-storage.service';
import { higherThanValidator } from 'src/app/shared/validators';
import { ActiveUserService } from '../active-user.service';

@Component({
  selector: 'app-vacation-edit',
  templateUrl: './vacation-edit.component.html',
  styleUrls: ['./vacation-edit.component.css']
})
export class VacationEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  vacationForm: FormGroup;
  constructor(private route: ActivatedRoute, private activeUserService: ActiveUserService, private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params)=>{
      this.id=+params['id'];
      this.editMode=params['id']!=null;
      this.initForm();
    })
  }

  private initForm(){
    let startDate = new Date();
    let endDate = new Date();
    let note = '';
    if(this.editMode){
      const vacation = this.activeUserService.activeUser.vacations[this.id];
      startDate = vacation.startDate;
      endDate = vacation.endDate;
      note = vacation.note; 
    }
    this.vacationForm = new FormGroup({
      'startDate': new FormControl(startDate, Validators.required),
      'endDate': new FormControl(endDate, Validators.required),
      'note': new FormControl(note),
      'id':new FormControl(this.editMode?this.activeUserService.activeUser.vacations[this.id].id:0)
    }, {validators: higherThanValidator})

  }

  onSubmit(){
    if(this.editMode){
      this.activeUserService.activeUser.vacations[this.id]=this.vacationForm.value;
      this.activeUserService.updateVacation(this.id, this.vacationForm.value);
    }
    else{
      this.activeUserService.addVacation(this.vacationForm.value);
    }
    console.log(this.activeUserService.activeUser.vacations);
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
