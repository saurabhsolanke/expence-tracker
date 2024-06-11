import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NightModeService } from 'src/app/night-mode.service';
import { TransactionService } from 'src/app/transaction.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit  {
  isNightMode: any;
  accountid!: string;
  accounts: any;
  id: any;

  constructor(
    private route: ActivatedRoute,
    public transaction: TransactionService,
    public nightModeService: NightModeService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.isNightMode = this.nightModeService.isNightMode;
    console.log(this.isNightMode);
    this.id = this.route.snapshot.params['id'];
    alert("hello ghe tujhi id"+ this.id); 
    this.transaction.find2(this.id).subscribe((data: any)=>{
      this.accounts = data;
      console.log(data, this.accounts);
    });
  }
}
