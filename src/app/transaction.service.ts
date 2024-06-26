import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { transactions } from './nav/transactions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TransactionService {

  public apiURL = environment.firebase.databaseURL;


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  getAll(): Observable<transactions[]> {
    return this.http.get<transactions[]>(this.apiURL + '/transactions.json', this.httpOptions)
  }

  create(transaction: any): Observable<transactions> {
    return this.http.post<transactions>(this.apiURL + '/transactions.json', JSON.stringify(transaction), this.httpOptions)
  }

  find(id: number): Observable<transactions> {
    return this.http.get<transactions>(this.apiURL + '/transactions.json' + id)
  }

  update(id: number, transactions: any): Observable<transactions> {
    return this.http.put<transactions>(this.apiURL + '/transactions.json' + id, JSON.stringify(transactions), this.httpOptions)
  }

  delete(id: number) {
    return this.http.delete<transactions>(this.apiURL + '/transactions.json' + id, this.httpOptions)
  }

  // category
  getAll1(){
    return this.http.get(this.apiURL + '/category.json', this.httpOptions)
  }

  create1(transaction: any){
    return this.http.post(this.apiURL + '/category.json', JSON.stringify(transaction), this.httpOptions)
  }

  find1(id: number){
    return this.http.get(this.apiURL + '/category.json' + id)
  }

  update1(id: number, transactions: any) {
    return this.http.put(this.apiURL + '/category.json' + id, JSON.stringify(transactions), this.httpOptions)
  }

  delete1(id: number) {
    return this.http.delete(this.apiURL + '/category.json' + id, this.httpOptions)
  }
}
