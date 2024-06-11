import { Component, Input, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NightModeService } from '../night-mode.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  email: any;
  loggedin_username!: string | null;
  constructor(private authenticationService: AuthService, private router: Router, public nightModeService : NightModeService ) { }

  ngOnInit(): void {
    this.loggedin_username = localStorage.getItem('email');
  }

  toggleNightMode() {
    this.nightModeService.toggleNightMode();
  }
  logout() {
    this.authenticationService.logout();
  }
}
