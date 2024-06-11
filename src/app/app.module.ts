import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './nav/home/home.component';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './nav/transactions/transactions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './nav/about/about.component';
import { FooterComponent } from './nav/footer/footer.component';
import { EditComponent } from './nav/transactions/edit/edit.component';
import { ViewComponent } from './nav/transactions/view/view.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchFilterPipe } from './search-filter.pipe';
// import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryComponent } from './nav/category/category.component';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { NightModeService } from './night-mode.service';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';
import { ContainerComponent } from './container/container.component';
import { AccountsComponent } from './nav/accounts/accounts.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TransactionsComponent,
    NavComponent,
    AboutComponent,
    FooterComponent,
    EditComponent,
    ViewComponent,
    LoginComponent,
    LogoutComponent,
    SearchFilterPipe,
    CategoryComponent,
    SidenavbarComponent,
    ContainerComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // Ng2SearchPipeModule,
    // Ng2OrderModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            'clientId'
          )
        },
        // {
        //   id: FacebookLoginProvider.PROVIDER_ID,
        //   provider: new FacebookLoginProvider('clientId')
        // }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  },
  NightModeService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
