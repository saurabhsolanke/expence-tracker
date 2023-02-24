import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { transactions } from './nav/transactions';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  public apiURL = "http://localhost:4000";

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getAll(): Observable<transactions[]> {
    return this.http.get<transactions[]>(this.apiURL + '/transactions')
  }

  create(transaction: any): Observable<transactions> {
    return this.http.post<transactions>(this.apiURL + '/transactions/', JSON.stringify(transaction), this.httpOptions)
  }

  find(id: number): Observable<transactions> {
    return this.http.get<transactions>(this.apiURL + '/transactions/' + id)
  }

  update(id: number, transactions: any): Observable<transactions> {
    return this.http.put<transactions>(this.apiURL + '/transactions/' + id, JSON.stringify(transactions), this.httpOptions)
  }

  delete(id: number) {
    return this.http.delete<transactions>(this.apiURL + '/transactions/' + id, this.httpOptions)
  }

  // category
  getAll1(){
    return this.http.get(this.apiURL + '/category/')
  }

  create1(transaction: any){
    return this.http.post(this.apiURL + '/category/', JSON.stringify(transaction), this.httpOptions)
  }

  find1(id: number){
    return this.http.get(this.apiURL + '/category/' + id)
  }

  update1(id: number, transactions: any) {
    return this.http.put(this.apiURL + '/category/' + id, JSON.stringify(transactions), this.httpOptions)
  }

  delete1(id: number) {
    return this.http.delete(this.apiURL + '/category/' + id, this.httpOptions)
  }
}


