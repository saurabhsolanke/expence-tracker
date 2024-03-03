import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  email: any;
  constructor(private authenticationService: AuthService) { }

  ngOnInit(): void {
    console.log(this.email);
    localStorage.getItem('email');
  }
  logout() {
    this.authenticationService.logout()
      .subscribe();
  }
}
