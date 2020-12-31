import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { passIsEqualValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  showError: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(){
      this.signupForm = new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'repeatPassword': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required)
      }, {validators:passIsEqualValidator});
  }

  onSignup(){
    let form:{email:string, password:string, repeatPassword:string, firstName:string, lastName:string}=this.signupForm.value;
    this.authService.signUp(form.email,form.password,form.firstName,form.lastName).subscribe(response=>{
      console.log(response);
    });

  }

  onSwitchToLogin(){
    this.router.navigate(['../'],{relativeTo:this.route});

  }

}
