import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { BookService } from './shared/services/books-data/books-data.service';
import { UserService } from './shared/services/user-data/user-data.service';
import { LoginService } from './shared/services/login/login.service';
import { LoginComponent } from './pages/login/login.component';
import { ErrorDialogComponent } from './shared/components/error-dialog/error-dialog.component';
import { ErrorService } from './shared/services/error/error.service';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorDialogComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
  ],
  providers: [
    CookieService ,
    BookService,
    UserService,
    LoginService,
    ErrorService,
  ],
  entryComponents: [ErrorDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
