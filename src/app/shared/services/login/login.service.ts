import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, UserLogin } from '../../models/users';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../error/error.service';


const loginApiUrl = 'http://localhost:3000/api/login';

@Injectable()
export class LoginService {

    constructor(
        private http: HttpClient,
        public errorService: ErrorService,
      ) { }

    public validateUser(userLogin: UserLogin): Observable<UserLogin> {
        const getUserApi = `${loginApiUrl}/${userLogin.authtoken}`;

        const observable = this.http.get<UserLogin>(
            getUserApi,
        ).pipe(
            catchError(this.errorService.handleError<UserLogin>('Cannot validate user'))
          );

        return observable;
    }

    public addLoginData(authToken: string): Observable<UserLogin> {
        const getUserApi = `${loginApiUrl}`;
        const userLogin: UserLogin = {
            authtoken: authToken,
        };

        const observable = this.http.post<UserLogin>(
            getUserApi,
            userLogin,
        ).pipe(
            catchError(this.errorService.handleError<UserLogin>('Cannot login user'))
          );

        return observable;
    }
}
