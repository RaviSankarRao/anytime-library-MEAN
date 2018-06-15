import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/users';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ErrorService } from '../error/error.service';


const usersApiUrl = 'http://localhost:3000/api/users';

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        public errorService: ErrorService,
      ) { }


    public registerUser(user: User): Observable<User> {
        const resgiterUserApi = `${usersApiUrl}`;

        const observable =  this.http.post<User>(
            resgiterUserApi,
            user,
        ).pipe(
            catchError(this.errorService.handleError<User>('Cannot register user'))
          );

        return observable;
    }

    public getUser(userId: string): Observable<User> {

        const getUserApi = `${usersApiUrl}/${userId}`;

        const observable = this.http.get<User>(
            getUserApi,
        ).pipe(
            catchError(this.errorService.handleError<User>('Cannot get user details'))
          );

        return observable;
    }

    public checkIfUserExists(user: User): Observable<User> {

        const getUserApi = `${usersApiUrl}/${user.email}/${user.password}`;

        const observable = this.http.get<User>(
            getUserApi,
        ).pipe(
            catchError(this.errorService.handleError<User>('Cannot login'))
          );

        return observable;
    }
}
