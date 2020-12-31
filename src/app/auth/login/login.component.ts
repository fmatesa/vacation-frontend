import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/data-storage.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showError: boolean = false;
  
  constructor(private router: Router, private route: ActivatedRoute, private authService:AuthService, private dataStorageService:DataStorageService) { }

  ngOnInit(){
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onLogin(){
    let form:{email:string, password:string}= this.loginForm.value;
    this.authService.login(form.email, form.password)
  }

  onSwitchToSignup(){
    this.router.navigate(['signup'],{relativeTo:this.route});
  }

}
