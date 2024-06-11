import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Observable, of } from 'rxjs';
import { tap, delay, map, mergeMap } from 'rxjs/operators';
import { NightModeService } from 'src/app/night-mode.service';
import { TransactionService } from 'src/app/transaction.service';
import { accounts } from '../accounts';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form!: UntypedFormGroup;
  form1!: UntypedFormGroup;
  form2!: UntypedFormGroup;

  product_name: string | undefined;
  public categories: any = [];
  product_desc: any;
  product_price: any;
  d = new Date();
  time: string = this.d.getHours() + ':' + this.d.getMinutes() + new Date();
  product_quantity: any;
  payment_mode: any;
  userid!: string | null;
  loggedin_userid!: string | null;
  loggedin_username!: string | null;
  isNightMode: any;
  public accounts: any = [];
  myaccount:any = [];


  constructor(
    public transaction: TransactionService,
    public nightModeService: NightModeService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.time);
    this.loggedin_username = localStorage.getItem('email');
    this.loggedin_userid = localStorage.getItem('uid');
    console.log(this.loggedin_userid);
    const accountid = uuidv4(); // Generate a unique ID
    this.form = new UntypedFormGroup({
      transactionid: new UntypedFormControl(''),
      product_name: new UntypedFormControl('', [Validators.required]),
      product_desc: new UntypedFormControl('', Validators.required),
      product_price: new UntypedFormControl('', [Validators.required]),
      product_quantity: new UntypedFormControl('', Validators.required),
      payment_mode: new UntypedFormControl('', [Validators.required]),
      createdAt: new UntypedFormControl(this.d),
      updatedAt: new UntypedFormControl(this.d),
      uid: new UntypedFormControl(this.loggedin_userid),
      category: new UntypedFormControl('', Validators.required),
      accountid: new UntypedFormControl(''),
    });
    this.form1 = new UntypedFormGroup({
      category: new UntypedFormControl('', Validators.required),
    });
    this.form2 = new UntypedFormGroup({
      accountid: new UntypedFormControl(accountid),
      account_name: new UntypedFormControl('', Validators.required),
      account_type: new UntypedFormControl('', Validators.required),
      balance: new UntypedFormControl('', Validators.required),
      previousBalance: new UntypedFormControl('', Validators.required),
      createdAt: new UntypedFormControl(this.d),
      updatedAt: new UntypedFormControl(this.d),
      uid: new UntypedFormControl(this.loggedin_userid),
    });
    this.getcategory();
    this.getAllaccounts();
  }

  getClock(): Observable<Date> {
    return interval(1000).pipe(mergeMap(() => of(new Date())));
  }

  get f() {
    return this.form.controls;
  }

  getcategory() {
    this.transaction.getAll1().subscribe((data) => {
      this.categories = [];
      // this.categories = data['data'];
      // console.log(data);
    });
  }

  getAllaccounts() {
    this.transaction.getAll2().subscribe((data: accounts[]) => {
      if (data) {
        console.log("Data received:", data); // Log the received data
        const txs = Object.values(data);
        this.accounts = txs;
        console.log("All accounts:", this.accounts);
        console.log(this.accounts[0].id);
        
        const userAccounts = txs.filter(tx => tx.uid === this.loggedin_userid);
        console.log("User accounts:", userAccounts);
        this.myaccount = userAccounts;
      } else {
        console.error('No data received from the server.');
      }
    });
  }

  submit(transactions: any) {
    const userid = localStorage.getItem('uid');
    const transactionData = {
      ...this.form.value,
      userid: userid,
    };
    console.log(this.form.value);
    this.transaction.create(transactionData).subscribe((res: any) => {
      console.log(' created successfully!');
      this.toastr.success('Added!', 'Transaction!');
      this.router.navigateByUrl('transactions');
    });
  }

  submit1() {
    console.log(this.form1.value);
    this.transaction.create1(this.form1.value).subscribe((res: any) => {
      this.router.navigateByUrl('home');
      this.toastr.success('Added!', 'Category!');
      console.log(' created successfully!', 'Added Category!');
      this.getcategory();
    });
  }

  accountcreate() {
    console.log(this.form2.value);
    this.transaction.create2(this.form2.value).subscribe((res: any) => {
      this.router.navigateByUrl('home');
      this.toastr.success('Added!', 'Account!');
      console.log(' created successfully!', 'Added Account!');
      this.getAllaccounts();
    });
  }

  deleteAccount(id: number){
    this.transaction.delete2(id).subscribe((res) => {
      this.accounts = this.accounts.filter((item) => item.id !== id);
      console.log('Transaction deleted successfully!');
      this.getAllaccounts();
  })
  }
}
