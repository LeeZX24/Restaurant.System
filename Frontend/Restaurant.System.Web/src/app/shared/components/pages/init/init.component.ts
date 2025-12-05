import { RouterService } from './../../../services/router.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, PLATFORM_ID, signal, viewChild } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { InformationDialogComponent } from '../../dialogs/customs-dialogs/information-dialog/information-dialog.component';
import { ErrorDialogComponent } from '../../dialogs/customs-dialogs/error-dialog/error-dialog.component';
import { CustomDialogBaseComponent } from '../../dialogs/base/custom-dialog-base/custom-dialog-base.component';

@Component({
  selector: 'rs-init',
  templateUrl: './init.component.html',
  imports: [CommonModule, InformationDialogComponent, ErrorDialogComponent],
  styleUrls: ['./init.component.css']
})
export class InitComponent {
  private routerService = inject(RouterService);
  private httpClient = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  infoDialogLoading = viewChild<InformationDialogComponent>('infoDialogLoading');
  infoDialogSuccess = viewChild<InformationDialogComponent>('infoDialogSuccess');
  errorDialog = viewChild<ErrorDialogComponent>('errorDialog');

  loading = signal(true);
  error = signal(false);

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const dlg = this.infoDialogLoading();
        if(dlg) {
          dlg.onOpenDialog = () => {
            setTimeout(() => this.checkBackend(), 0);
          }
          dlg.open();
        }
      }
    })
  }

  async checkBackend() {
    const dlgLoad = this.infoDialogLoading();

    if(dlgLoad)
    {
      try {
        const dlgSuccess = this.infoDialogSuccess();

        await firstValueFrom(this.httpClient.get('/api/ishealthy' , {responseType: 'text'}).pipe(timeout(60000)));
        this.loading.set(false);
        dlgLoad?.close();

        if(dlgSuccess)
        {
          dlgSuccess.open();
          effect(() => {
            dlgSuccess.onOkButtonClick = () => {
              dlgSuccess.close();
              this.routerService.go('/redirect');
            }
          });
        }
      }catch (e) {
        const dlgError = this.errorDialog();

        this.loading.set(false);
        dlgLoad.close();

        if(dlgError) {
          dlgError.open();
        }
        this.error.set(true);
      }
    }

  }
}
