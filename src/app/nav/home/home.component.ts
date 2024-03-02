import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

  form!: UntypedFormGroup;
  form1!: UntypedFormGroup;

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
    this.form = new UntypedFormGroup({
      product_name: new UntypedFormControl('', [Validators.required]),
      product_desc: new UntypedFormControl('', Validators.required),
      product_price: new UntypedFormControl('', [Validators.required]),
      product_quantity: new UntypedFormControl('', Validators.required),
      payment_mode: new UntypedFormControl('', [Validators.required]),
      createdAt: new UntypedFormControl('', Validators.required),
      category: new UntypedFormControl('', Validators.required)
    });
    this.form1 = new UntypedFormGroup({
      category: new UntypedFormControl('', Validators.required)
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
