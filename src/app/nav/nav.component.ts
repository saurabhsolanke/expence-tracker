import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  email: any;
  loggedin_username!: string | null;
  constructor(private authenticationService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loggedin_username = localStorage.getItem('email');
  }
  logout() {
    this.authenticationService.logout()
      .subscribe();
    this.router.navigate(['logout']);
  }
}
