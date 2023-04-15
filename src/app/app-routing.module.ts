import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AboutComponent } from './nav/about/about.component';
import { EditComponent } from './nav/transactions/edit/edit.component';
import { HomeComponent } from './nav/home/home.component';
import { TransactionsComponent } from './nav/transactions/transactions.component';
import { ViewComponent } from './nav/transactions/view/view.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { CategoryComponent } from './nav/category/category.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'transactions', component: TransactionsComponent  },
  { path: 'home', component: HomeComponent},
  { path: 'category', component: CategoryComponent},
  { path: 'about', component: AboutComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'transactions/:id/edit', component: EditComponent},
  { path: 'transactions/:id/view', component: ViewComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
