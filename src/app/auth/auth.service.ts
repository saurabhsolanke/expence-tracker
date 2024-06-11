import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, from, of, throwError } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
  email:string='';
  password:string='';

  constructor(private http: HttpClient, private router: Router, private auth: AngularFireAuth) {
  }
  //   this.isUserLoggedIn = email == 'admin' && password == 'admin';
  //   this.isUserLoggedIn = email == 'saurabh' && password == 'saurabh';
  //   console.log(this.loggedinUser = localStorage.getItem('token'));
  //   localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");

  //   return of(this.isUserLoggedIn).pipe(
  //     delay(1000),
  //     tap(val => {
  //       console.log("Is User Authentication is successful: " + val);
  //     })

  //   );
  // }

  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }
  translateFirebaseErrorMessage(error: FirebaseError): string | undefined {
    throw new Error('Method not implemented.');
  }

  googleSignOn(){

  }

  // logout(): void {
  //   this.isUserLoggedIn = false;
  //   localStorage.removeItem('isUserLoggedIn');
  // }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      localStorage.removeItem('isUserLoggedIn');
    });
  }

  // logout(): Observable<void> {
  //   return from(this.auth.signOut());
  // }

  // getAuthorizationToken() {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   return currentUser.token;
  // }

}
function userName(userName: any, password: string) {
  throw new Error('Function not implemented.');
}
type SignIn = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string
};

