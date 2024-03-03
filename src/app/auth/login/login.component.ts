import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UntypedFormGroup, UntypedFormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   email = "";
   password = "";
   form!: FormGroup;
   isLoggingIn = false;

   constructor(private authService: AuthService,private formBuilder: FormBuilder, private router: Router) { }

   ngOnInit(): void {
      this.form = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }

   // onClickSubmit(data: any) {
   //    this.email = data.email;
   //    this.password = data.password;

   //    // console.log("Login page: " + this.email);
   //    // console.log("Login page: " + this.password);

   //    this.authService.login(this.email, this.password)
   //       .subscribe(data => {
   //          console.log("Is Login Success: " + data);
   //          if (data) this.router.navigate(['home']);
   //       });
   // }

   login() {
      this.isLoggingIn = true;
  
      this.authService.signIn({
        email: this.form.value.email,
        password: this.form.value.password
      }).subscribe({
        next: () => this.router.navigate(['home']),
        error: error => {
          this.isLoggingIn = false;
         //  this.open(error.message, "OK", {
         //    duration: 5000
         //  })
        }
      });
    }
}