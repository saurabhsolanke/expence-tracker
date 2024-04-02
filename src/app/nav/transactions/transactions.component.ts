import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { TransactionService } from 'src/app/transaction.service';
import { transactions } from '../transactions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transaction: any;
  product_name: any;
  amount: any;
  payment_mode: any;
  total = 0;
  loggedin_userid!: string | null;

  constructor(private transactionauth: TransactionService) {}
  transactions!: transactions[];

  ngOnInit() {
    this.loggedin_userid = localStorage.getItem('uid');

    this.transactionauth.getAll().subscribe((data: transactions[]) => {
      const txs = Object.values(data)
      this.transactions = txs;
       // Filter transactions for the logged-in user
    const userTransactions = txs.filter(tx => tx.userid === this.loggedin_userid);
    this.transactions = userTransactions;
    console.log(userTransactions);
      console.log(txs);
      for (var i = 0; i < txs.length; i++) {
        this.total += parseInt(txs[i].product_price);
      }
    });
  }

  Search() {
    if (this.product_name == '') {
      this.ngOnInit();
    } else {
      this.transactions = this.transactions.filter(
        (res: { product_name: string }) => {
          return res.product_name
            .toLocaleLowerCase()
            .match(this.product_name.toLocaleLowerCase());
        }
      );
    }
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  deletePost(id: number) {
    this.transactionauth.delete(id).subscribe((res) => {
      this.transactions = this.transactions.filter((item) => item.id !== id);
      console.log('Transaction deleted successfully!');
      this.transactionauth.getAll();
    });
  }
}
