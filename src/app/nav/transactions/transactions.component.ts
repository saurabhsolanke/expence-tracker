import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { TransactionService } from 'src/app/transaction.service';
import { transactions } from '../transactions';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transaction: any;
  product_name: any;

  constructor(private transactionauth: TransactionService) {}
  transactions!: transactions[];

  ngOnInit() {
    this.transactionauth.getAll().subscribe((data: transactions[]) => {
      this.transactions = data;
      console.log(this.transactions);
    })
    
    // const myChart = new Chart("myChart", {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: '# of Votes',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     }]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });

   
  }

  Search() {
    if (this.product_name == "") {
      this.ngOnInit();
    }
    else {
      this.transactions = this.transactions.filter((res: { product_name: string; }) => {
        return res.product_name.toLocaleLowerCase().match(this.product_name.toLocaleLowerCase());
      })
    }
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  deletePost(id: number) {
    this.transactionauth.delete(id).subscribe(res => {
      this.transactions = this.transactions.filter(item => item.id !== id);
      console.log('Transaction deleted successfully!');
      this.transactionauth.getAll();
    })
  }

}
