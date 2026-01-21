import { RouterService } from '../../services/router.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { InformationDialogComponent } from '../../dialogs/customs-dialogs/information-dialog/information-dialog.component';
import { ErrorDialogComponent } from '../../dialogs/customs-dialogs/error-dialog/error-dialog.component';
import { CustomDialogService } from '../../../core/services/custom-dialog/custom-dialog.service';
import { CustomDialogRef } from '../../dialogs/base/custom-dialog-base/custom-dialog.ref';
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'rs-init',
  templateUrl: './init.component.html',
  imports: [CommonModule],
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {
  private routerService = inject(RouterService);
  private httpClient = inject(HttpClient);
  private dialogService = inject(CustomDialogService);

  error = signal(false);

  ngOnInit(): void {
    setTimeout(() => {
      const ref = this.dialogService.open(InformationDialogComponent, {
        data: { title: 'Information', message: 'Checking Backend ...'},
        hasHeader: true,
        hasFooter: false,
        closeOnBackdropClick: false,
        disableClose: true,
        isLoading: true
      });


        ref.afterOpened().subscribe(() => {
          this.checkBackend(ref);
        });
      });

  }

  async checkBackend(ref: CustomDialogRef<void>) {
    try {
      await firstValueFrom(this.httpClient.get('/api/ishealthy' , {responseType: 'text'}).pipe(timeout(60000)));
      this.setState();

      this.openSuccessDialog();
    }catch (e) {
      this.setState(e);

      this.openErrorDialog(e);
    }
    finally {
      ref.close();
    }
  }

  async setState(T?: unknown) {
    this.error.set(!!T);
  }

  openErrorDialog(T?: unknown)
  {
    let errorMessage: string = '';
    let errorCode: string = '';
    if(T instanceof HttpErrorResponse)
    {
      errorMessage = T.message;
      errorCode = T.status.toString();
    }
    this.dialogService.open(ErrorDialogComponent, {
      data: { title: 'Error', message: errorMessage + '\nError Code : ' + errorCode },
      variant: 'error',
      hasHeader: true,
      hasFooter: false,
      closeOnBackdropClick: false,
      disableClose: true
    });
  }

  openSuccessDialog() {
    const successRef = this.dialogService.open(InformationDialogComponent, {
      data: { title: 'Success', message: 'Backend Online!'},
      variant: 'success',
      hasHeader: true,
      hasFooter: false,
      closeOnBackdropClick: false,
      disableClose: true,
      isSuccess: true
    });

    successRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        successRef.close();
        this.goRedirect();
      }, 1000);

    });
  }

  goRedirect() {
    const redirectRef = this.dialogService.open(InformationDialogComponent, {
      data: {title: 'Redirect', message: 'redirect to login page ...'},
      variant: 'success',
      hasHeader: true,
      hasFooter: false,
      closeOnBackdropClick: false,
      disableClose: true,
      isLoading: true
    });

    redirectRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        redirectRef.close();
        this.routerService.gotoLogin();
      }, 5000);
    });
  }
}
