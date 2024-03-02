import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Observable, of } from 'rxjs';
import { tap, delay, map, mergeMap } from 'rxjs/operators';
import { TransactionService } from 'src/app/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form!: FormGroup;
  form1!: FormGroup;

  product_name: string | undefined;
  public categories: any = [];
  product_desc: any;
  product_price: any;
  d = new Date();
  time: string = this.d.getHours() + ':' + this.d.getMinutes();
  product_quantity: any;
  payment_mode: any;

  constructor(public transaction: TransactionService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      product_name: new FormControl('', [Validators.required]),
      product_desc: new FormControl('', Validators.required),
      product_price: new FormControl('', [Validators.required]),
      product_quantity: new FormControl('', Validators.required),
      payment_mode: new FormControl('', [Validators.required]),
      createdAt: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
    this.form1 = new FormGroup({
      category: new FormControl('', Validators.required)
    });
    this.getcategory();
  }

  getClock(): Observable<Date> {
    return interval(1000).pipe(
      mergeMap(() => of(new Date()))
    )
  }

  get f() {
    return this.form.controls;
  }

  getcategory() {
    this.http.get<any[]>(this.transaction.apiURL + '/category/')
      .subscribe(data => {
        this.categories = [];
        this.categories = data;
        console.log(data)
      });
  }

  submit(transactions: any) {
    console.log(this.form.value);
    this.transaction.create(this.form.value).subscribe((res: any) => {
      console.log(' created successfully!');
      this.toastr.success('Added!', 'Transaction!');
      this.router.navigateByUrl('transactions');
    })
  }

  submit1() {
    console.log(this.form1.value);
    this.transaction.create1(this.form1.value).subscribe((res: any) => {
      this.router.navigateByUrl('home');
      this.toastr.success('Added!', 'Category!');
      console.log(' created successfully!', 'Added Category!');
      this.getcategory();

    })
  }
}
