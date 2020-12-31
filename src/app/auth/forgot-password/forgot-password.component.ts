import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  
  constructor(private router: Router, private route: ActivatedRoute, private authService:AuthService) { }

  ngOnInit(){
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }

  onSubmit(){
    console.log(this.forgotPasswordForm.value.email);
    this.authService.getPassword(this.forgotPasswordForm.value.email);
  }


}
