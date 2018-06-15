import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login/login.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../shared/services/user-data/user-data.service';
import { Role, User, UserLogin } from '../../shared/models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public displayLogin = false;
  public displayRegsiter = false;
  public isAdmin = false;
  public isRegisterClicked = false;

  public userDetails: User;

  constructor(
    private cookieService: CookieService,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
  ) {

    this.userDetails = {
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password: null,
      role: Role.user,
      _id: null,
    };
  }

  ngOnInit() {
    this.validateLogin();
  }

  public validateLogin(): void {
    const authTokenEncoded = this.cookieService.get('auth-token');
    const userLogin: UserLogin = {
      authtoken: authTokenEncoded,
    };

    if (authTokenEncoded) {
      this.loginService.validateUser(userLogin)
        .subscribe(userLoginResponse => {

          if (userLoginResponse && userLoginResponse.authtoken === authTokenEncoded) {
            const userId = atob(authTokenEncoded);

            this.userService.getUser(userId)
              .subscribe(user => {

                this.displayLogin = false;

                if (user.role === Role.admin) {
                  this.router.navigate(['/admin-dashboard']);
                } else {
                  this.router.navigate(['/user-dashboard']);
                }

              });
          } else {
            this.displayLogin = true;
          }
        });
    } else {
      this.displayLogin = true;
    }
  }

  public login(): void {
    const userCredentials = {
      email: this.userDetails.email,
      password: this.userDetails.password
    };

    this.userService.checkIfUserExists(userCredentials)
      .subscribe(user => {
        const encodedAuthToken = btoa(user._id);

        this.loginService.addLoginData(encodedAuthToken)
              .subscribe(userLogin => {
                if (userLogin) {
                  this.cookieService.set('auth-token', encodedAuthToken);
                }

                if (user.role === Role.admin) {
                  this.router.navigate(['/admin-dashboard']);
                } else {
                  this.router.navigate(['/user-dashboard']);
                }
            });
      });
  }

  public registerUser(): void {
    this.displayLogin = false;
    this.displayRegsiter = true;
  }

  public backToLogin(): void {
    this.displayLogin = true;
    this.displayRegsiter = false;
  }

  public register(): void {

    this.isRegisterClicked = true;

    this.userService.registerUser(this.userDetails)
      .subscribe(user => {
        this.isRegisterClicked = false;

        this.login();
      });
  }

}
