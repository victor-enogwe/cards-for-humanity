import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public snackBar: MatSnackBar) {}

  async notify(message: string, action: string, config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, { duration: 3000, ...config });
  }
}
