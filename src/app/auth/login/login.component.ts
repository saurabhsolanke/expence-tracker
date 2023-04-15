import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   email = "";
   password = "";
   formData!: FormGroup;

   constructor(private authService: AuthService, private router: Router) { }

   ngOnInit() {
      this.formData = new FormGroup({
         email: new FormControl(""),
         password: new FormControl(""),
      });
   }

   onClickSubmit(data: any) {
      this.email = data.email;
      this.password = data.password;

      // console.log("Login page: " + this.email);
      // console.log("Login page: " + this.password);

      this.authService.login(this.email, this.password)
         .subscribe(data => {
            console.log("Is Login Success: " + data);
            if (data) this.router.navigate(['home']);
         });
   }
}