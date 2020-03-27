import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OverzichtManagerModule } from './overzicht-manager/overzicht-manager.module';
import { FileService } from './service/file.service';

import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ViewportScroller } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { OverzichtManagerComponent } from './overzicht-manager/overzicht-manager.component';
import { MainlearningscreenComponent } from './mainlearningscreen/mainlearningscreen.component';
import { LearningCardComponent } from './learning-card/learning-card.component';
import { CreateCardsetComponent } from './create-cardset/create-cardset.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { RegisterComponent } from "./user/register/register.component";
import { httpInterceptorProviders } from './http-interceptors';
import { LoginComponent } from "./user/login/login.component"
import { AuthGuard } from './user/auth.guard';

const appRoutes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard]

  },
  { 
    path: 'learning',
   component: MainlearningscreenComponent,
   canActivate: [AuthGuard]
  }, {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MainlearningscreenComponent,
    LearningCardComponent,
    CreateCardsetComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    OverzichtManagerModule,
    FlexLayoutModule,
    MatCardModule,
    AppRoutingModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
