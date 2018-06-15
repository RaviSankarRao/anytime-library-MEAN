import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book, GoogleBooksApiResult } from '../../models/books';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpResponse } from '@angular/common/http';

const booksApiUrl = 'http://localhost:3000/api/books';


@Injectable()
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

    public searchBookFromGoogleApi(isbn: string): Observable<GoogleBooksApiResult> {
        const googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=${isbn}+isbn:${isbn}`;

        const observable = this.http.get<GoogleBooksApiResult>(
            googleApiUrl
        );

        observable.pipe(
            catchError(this.handleError('searchBookFromGoogleApi', []))
        );

        return observable;
    }

    public getBooks(): Observable<Book[]> {
        const observable = this.http.get<Book[]>(
                booksApiUrl
        );

        observable.pipe(
            catchError(this.handleError('getBooks', []))
        );

        return observable;
    }

    public addBook(book: Book): Observable<Book> {

        const observable = this.http.post<Book>(
            booksApiUrl,
            book
        );

        observable.pipe(
            catchError(this.handleError('addBook', []))
        );

        return observable;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
}
