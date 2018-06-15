import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { Observable, of } from 'rxjs';

export interface ErrorModel {
  applicationMessage: string;
  httpErrorMessage: string;
  serviceErrorMessage: string;
}

@Injectable()
export class ErrorService {

  constructor(
    public dialog: MatDialog,
  ) { }

  public displayErrorDialog(error: ErrorModel): void {

    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '450px',
      data: error,
    });

  }

  public handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      this.displayErrorDialog({
        applicationMessage: operation,
        serviceErrorMessage: error.error.message,
        httpErrorMessage: error.message,
      });

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
