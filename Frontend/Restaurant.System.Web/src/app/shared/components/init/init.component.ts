import { RouterService } from '../../services/router.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { InformationDialogComponent } from '../../dialogs/customs-dialogs/information-dialog/information-dialog.component';
import { ErrorDialogComponent } from '../../dialogs/customs-dialogs/error-dialog/error-dialog.component';
import { CustomDialogService } from '../../../core/services/custom-dialog/custom-dialog.service';
import { CustomDialogRef } from '../../dialogs/base/custom-dialog-base/custom-dialog.ref';

@Component({
  selector: 'rs-init',
  templateUrl: './init.component.html',
  imports: [CommonModule],
  styleUrls: ['./init.component.css']
})
export class InitComponent {
  private routerService = inject(RouterService);
  private httpClient = inject(HttpClient);
  private dialogService = inject(CustomDialogService);

  loading = signal(true);
  error = signal(false);

  ngOnInit(): void {
    let ref: CustomDialogRef<void>;
    setTimeout(() => {
      ref = this.dialogService.open(InformationDialogComponent, {
        data: { title: 'Information', message: 'Checking Backend ...'},
        hasHeader: true,
        hasFooter: false,
        closeOnBackdropClick: false,
        disableClose: true
      });
      // this.infoDialogLoading = new InformationDialog('Information',{});
      // this.infoDialogSuccess = new InformationDialog('Success',{});
      // this.errorDialog = new ErrorDialog('Error', {});

      // this.infoDialogLoading.open();
      // console.log(this.infoDialogLoading.visible());

      ref.afterOpened().subscribe(() => {
        console.log('dialog opened. Now checking backend ...');
        this.checkBackend(ref);
      });
    }, 0);


  }

  async checkBackend(ref: CustomDialogRef<void>) {
    try {
      await firstValueFrom(this.httpClient.get('/api/ishealthy' , {responseType: 'text'}).pipe(timeout(60000)));
      console.log('success');
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
    this.loading.set(false);
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
      disableClose: true
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
      disableClose: true
    });

    redirectRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        redirectRef.close();
        this.routerService.gotoLogin();
      }, 5000);
    });
  }
}
