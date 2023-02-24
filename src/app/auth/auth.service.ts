import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  serverUrl = 'http://localhost:3000/users/';

  isUserLoggedIn: boolean = false;
  isAuthenticated: boolean = false;
  loggedinUser: string | null | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  login(userName: string, password: string) {
    console.log(userName, password);
    this.isUserLoggedIn = userName == 'admin' && password == 'admin';
    console.log(this.loggedinUser = localStorage.getItem('token'));
    localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })

    );
  }

  

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
  }

  // getAuthorizationToken() {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   return currentUser.token;
  // }

}
