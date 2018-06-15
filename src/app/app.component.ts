import { Component } from '@angular/core';
import { Book } from './shared/models/books';
import { BookService } from './shared/services/books-data/books-data.service';
import { UserService } from './shared/services/user-data/user-data.service';
import { Role } from './shared/models/users';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './shared/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.router.navigate(['/login']);
  }

  public logOut(): void {
    this.cookieService.delete('user-id');
    this.cookieService.delete('auth-token');

    this.router.navigate(['/login']);
  }

}
