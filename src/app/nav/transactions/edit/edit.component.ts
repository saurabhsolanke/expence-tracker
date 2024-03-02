import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from 'src/app/transaction.service';
import { transactions } from '../../transactions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  transactions!: transactions;
  form: any;

  constructor(public service: TransactionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.service.find(this.id).subscribe((data: transactions)=>{
      this.transactions = data;
    }); 
       
    this.form = new UntypedFormGroup({
      product_name: new UntypedFormControl('', [Validators.required]),
      product_desc: new UntypedFormControl('', Validators.required),
      product_price: new UntypedFormControl('', Validators.required),
      product_quantity: new UntypedFormControl('', Validators.required),
      product_mode: new UntypedFormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }
     
  submit(){
    console.log(this.form.value);
    this.service.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Transaction updated successfully!');
         this.router.navigateByUrl('transactions');
    })
  }
}
