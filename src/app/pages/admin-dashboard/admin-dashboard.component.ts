import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared/services/books-data/books-data.service';
import { Book } from '../../shared/models/books';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public isbn: string;
  public searchedBook: Book;
  public books: Book[];
  public displayedColumns = ['title', 'author', 'isbn', 'genre'];

  constructor(
    private bookService: BookService,
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  public loadBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  public searchBook(): void {
    this.bookService.searchBookFromGoogleApi(this.isbn).subscribe(googleBook => {

      console.log(googleBook);

      this.searchedBook = {
        author: this.getStringFromArray(googleBook.items[0].volumeInfo.authors),
        title: googleBook.items[0].volumeInfo.title,
        genre: this.getStringFromArray(googleBook.items[0].volumeInfo.categories),
        thumbnail: googleBook.items[0].volumeInfo.imageLinks.thumbnail,
        isbn: this.isbn,
        description: googleBook.items[0].volumeInfo.description
      };
    })
  }

  public addBook(): void {

    if (!this.ifBookExists()) {
      this.bookService.addBook(this.searchedBook).subscribe(addedBook => {
        this.loadBooks();
        alert('Book added successfully');
      });
    } else {
      alert('Book already exists');
    }
  }

  private getStringFromArray(arrayOfStrings: string[]): string {
    if (arrayOfStrings) {
      let concatString = '';

      arrayOfStrings.forEach(eachString => {
        concatString += eachString;
      });

      return concatString;
    }
  }

  public ifBookExists(): boolean {
    let isValid = false;
    this.books.forEach(book => {
      if (book.isbn === this.searchedBook.isbn) {
        isValid = true;
      }
    });

    return isValid;
  }

}
